import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

type ProjectKey = "calgpa" | "zephra" | "aether" | "miniminds" | "carsio" | "roledoc" | "textotest";

type RatingEntry = {
  count: number;
  sum: number;
  starCounts: [number, number, number, number];
};

type RatingsFile = Record<ProjectKey, RatingEntry>;

const ratingsPath = path.join(process.cwd(), "data", "project-ratings.json");
const keys: ProjectKey[] = ["calgpa", "zephra", "aether", "miniminds", "carsio", "roledoc", "textotest"];
let writeChain = Promise.resolve();

declare global {
  var __projectRatingsMemoryStore: RatingsFile | undefined;
}

function defaultRatings(): RatingsFile {
  return {
    calgpa: { count: 0, sum: 0, starCounts: [0, 0, 0, 0] },
    zephra: { count: 0, sum: 0, starCounts: [0, 0, 0, 0] },
    aether: { count: 0, sum: 0, starCounts: [0, 0, 0, 0] },
    miniminds: { count: 0, sum: 0, starCounts: [0, 0, 0, 0] },
    carsio: { count: 0, sum: 0, starCounts: [0, 0, 0, 0] },
    roledoc: { count: 0, sum: 0, starCounts: [0, 0, 0, 0] },
    textotest: { count: 0, sum: 0, starCounts: [0, 0, 0, 0] },
  };
}

function cloneRatings(data: RatingsFile): RatingsFile {
  return {
    calgpa: { count: data.calgpa.count, sum: data.calgpa.sum, starCounts: [...data.calgpa.starCounts] as [number, number, number, number] },
    zephra: { count: data.zephra.count, sum: data.zephra.sum, starCounts: [...data.zephra.starCounts] as [number, number, number, number] },
    aether: { count: data.aether.count, sum: data.aether.sum, starCounts: [...data.aether.starCounts] as [number, number, number, number] },
    miniminds: { count: data.miniminds.count, sum: data.miniminds.sum, starCounts: [...data.miniminds.starCounts] as [number, number, number, number] },
    carsio: { count: data.carsio.count, sum: data.carsio.sum, starCounts: [...data.carsio.starCounts] as [number, number, number, number] },
    roledoc: { count: data.roledoc.count, sum: data.roledoc.sum, starCounts: [...data.roledoc.starCounts] as [number, number, number, number] },
    textotest: { count: data.textotest.count, sum: data.textotest.sum, starCounts: [...data.textotest.starCounts] as [number, number, number, number] },
  };
}

function getMemoryStore(): RatingsFile {
  if (!globalThis.__projectRatingsMemoryStore) {
    globalThis.__projectRatingsMemoryStore = defaultRatings();
  }
  return globalThis.__projectRatingsMemoryStore;
}

function normalizeEntry(entry: unknown): RatingEntry {
  const row = entry as Partial<RatingEntry> & { starCounts?: number[] };
  const legacyFifthBucket = Math.max(0, Number(row.starCounts?.[4]) || 0);
  const starCounts: [number, number, number, number] = [0, 1, 2, 3].map((index) => {
    const base = Math.max(0, Number(row.starCounts?.[index]) || 0);
    return index === 3 ? base + legacyFifthBucket : base;
  }) as [number, number, number, number];

  const count = starCounts[0] + starCounts[1] + starCounts[2] + starCounts[3];
  const sum = starCounts[0] + starCounts[1] * 2 + starCounts[2] * 3 + starCounts[3] * 4;

  return { count, sum, starCounts };
}

async function readFromFile(): Promise<RatingsFile | null> {
  try {
    const raw = await fs.readFile(ratingsPath, "utf8");
    const parsed = JSON.parse(raw) as Partial<Record<ProjectKey, unknown>>;
    const base = defaultRatings();

    for (const key of keys) {
      const entry = parsed[key];
      if (!entry) {
        continue;
      }
      base[key] = normalizeEntry(entry);
    }

    return base;
  } catch {
    return null;
  }
}

async function writeToFile(data: RatingsFile): Promise<boolean> {
  try {
    await fs.mkdir(path.dirname(ratingsPath), { recursive: true });
    await fs.writeFile(ratingsPath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch {
    return false;
  }
}

async function readRatings(): Promise<RatingsFile> {
  const fromFile = await readFromFile();
  if (fromFile) {
    globalThis.__projectRatingsMemoryStore = cloneRatings(fromFile);
    return fromFile;
  }

  return cloneRatings(getMemoryStore());
}

async function writeRatings(data: RatingsFile): Promise<void> {
  const clone = cloneRatings(data);
  const fileWritten = await writeToFile(clone);

  if (!fileWritten) {
    globalThis.__projectRatingsMemoryStore = clone;
    return;
  }

  globalThis.__projectRatingsMemoryStore = clone;
}

function withWriteLock<T>(task: () => Promise<T>): Promise<T> {
  const next = writeChain.then(task, task);
  writeChain = next.then(
    () => undefined,
    () => undefined
  );
  return next;
}

function toViewModel(data: RatingsFile) {
  return Object.fromEntries(
    keys.map((key) => {
      const row = data[key];
      const average = row.count > 0 ? Number((row.sum / row.count).toFixed(2)) : 0;
      return [key, { count: row.count, average, starCounts: row.starCounts }];
    })
  );
}

export async function GET() {
  const ratings = await readRatings();
  return NextResponse.json({ ratings: toViewModel(ratings) });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { projectKey?: string; stars?: number };
  const projectKey = body.projectKey as ProjectKey;
  const stars = Number(body.stars);

  if (!keys.includes(projectKey)) {
    return NextResponse.json({ error: "Invalid project key." }, { status: 400 });
  }

  if (!Number.isInteger(stars) || stars < 1 || stars > 4) {
    return NextResponse.json({ error: "Stars must be an integer from 1 to 4." }, { status: 400 });
  }

  const ratings = await withWriteLock(async () => {
    const current = await readRatings();
    const row = current[projectKey];
    row.count += 1;
    row.sum += stars;
    row.starCounts[stars - 1] += 1;

    await writeRatings(current);
    return current;
  });

  return NextResponse.json({ ratings: toViewModel(ratings) });
}
