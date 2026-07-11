"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import bush2 from "../assets/forest assets/pixelated_bush_v2.png";
import pixelatedArrow from "../assets/imgs/pixelated_arrow.png";

type SearchEntry = {
  label: string;
  context: string;
  href: string;
  keywords: string[];
};

const MAX_DYNAMIC_ENTRIES = 320;

const searchIndex: SearchEntry[] = [
  {
    label: "Home Hero",
    context: "Hi I am Karthikeya DevOps and SNow Developer",
    href: "/#hero",
    keywords: ["home", "karthikeya", "devops", "snow", "servicenow", "hero", "intro", "developer"],
  },
  {
    label: "About Profile",
    context: "Not just building apps building personalities",
    href: "/about#about",
    keywords: ["about", "profile", "who", "me", "background", "design", "intelligence", "focus radar", "ui ux", "full stack", "servicenow workflows", "engineering depth", "product clarity"],
  },
  {
    label: "Experience",
    context: "Lead web developer and AI intern journey",
    href: "/about#experience",
    keywords: ["experience", "journey", "intern", "lead web developer", "career", "credentials", "dsu muns", "akeshya", "huggingface", "faiss"],
  },
  {
    label: "About Skills",
    context: "Python TypeScript React DevOps CI CD FastAPI RAG ServiceNow",
    href: "/about#about",
    keywords: ["python", "typescript", "react", "devops", "cicd", "fastapi", "rag", "servicenow", "figma", "prompt engineering", "javascript"],
  },
  {
    label: "Work Projects",
    context: "Projects made clean interfaces powerful logical backends",
    href: "/work#projects",
    keywords: ["projects", "work", "portfolio", "apps", "case studies", "project list"],
  },
  {
    label: "CalGPA",
    context: "Academic tool GPA semester performance",
    href: "/work#calgpa",
    keywords: ["calgpa", "gpa", "academic", "semester", "grades", "pwa"],
  },
  {
    label: "Zephra",
    context: "Climate tracking air quality forecast",
    href: "/work#zephra",
    keywords: ["zephra", "climate", "air quality", "forecast", "nasa", "tempo", "data"],
  },
  {
    label: "Aether",
    context: "AI companion habit tracking journaling",
    href: "/work#aether",
    keywords: ["aether", "ai companion", "habits", "mood", "journaling", "emotion"],
  },
  {
    label: "Mini-Minds",
    context: "E-learning with mini exercises and levels",
    href: "/work#miniminds",
    keywords: ["mini minds", "elearning", "kids", "education"],
  },
  {
    label: "Cars.IO",
    context: "SQL retail database for car sales",
    href: "/work#carsio",
    keywords: ["cars io", "cars", "sql", "dbms", "database"],
  },
  {
    label: "RoleDoc",
    context: "RAG chatbot document assistant",
    href: "/work#roledoc",
    keywords: ["roledoc", "rag", "chatbot", "documents", "llm"],
  },
  {
    label: "FasType",
    context: "Typing practice app and WPM checks",
    href: "/work#fastype",
    keywords: ["fastype", "typing", "wpm", "practice"],
  },
  {
    label: "Contact",
    context: "Lets build something meaningful",
    href: "/contact#contact",
    keywords: ["contact", "email", "mail", "hire", "collab", "reach", "message", "open for work", "conversation", "usually replies within 24h"],
  },
  {
    label: "Social Links",
    context: "LinkedIn GitHub X LeetCode YouTube",
    href: "/contact#contact",
    keywords: ["linkedin", "github", "x", "youtube", "leetcode", "social"],
  },
  {
    label: "Contact Email",
    context: "alurubalakarthikeya gmail com",
    href: "/contact#contact",
    keywords: ["alurubalakarthikeya", "gmail", "alurubalakarthikeya@gmail.com", "primary channel"],
  },
];

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .trim()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function scoreEntry(entry: SearchEntry, rawQuery: string): number {
  const query = rawQuery.toLowerCase().trim();
  if (!query) {
    return 0;
  }

  const queryTokens = tokenize(query);
  const entryText = `${entry.label} ${entry.context} ${entry.keywords.join(" ")}`.toLowerCase();
  let score = 0;

  if (entryText.includes(query)) {
    score += 24;
  }

  for (const keyword of entry.keywords) {
    const normalizedKeyword = keyword.toLowerCase();
    if (normalizedKeyword === query) {
      score += 40;
    } else if (normalizedKeyword.startsWith(query)) {
      score += 18;
    } else if (normalizedKeyword.includes(query)) {
      score += 12;
    }
  }

  for (const token of queryTokens) {
    if (entryText.includes(` ${token} `) || entryText.startsWith(`${token} `) || entryText.endsWith(` ${token}`)) {
      score += 10;
    } else if (entryText.includes(token)) {
      score += 6;
    }
  }

  return score;
}

function getNearestAnchor(element: Element, pathname: string): string {
  const anchorHost = element.closest("[id]") as HTMLElement | null;
  if (anchorHost?.id) {
    return `${pathname}#${anchorHost.id}`;
  }

  return pathname;
}

function collectPageEntries(pathname: string): SearchEntry[] {
  const root = document.querySelector("main");
  if (!root) {
    return [];
  }

  const seen = new Set<string>();
  const entries: SearchEntry[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    if (entries.length >= MAX_DYNAMIC_ENTRIES) {
      break;
    }

    const current = walker.currentNode;
    const parent = current.parentElement;
    if (!parent) {
      continue;
    }

    const tag = parent.tagName;
    if (["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "CANVAS"].includes(tag)) {
      continue;
    }

    const text = (current.nodeValue ?? "").replace(/\s+/g, " ").trim();
    if (text.length < 2) {
      continue;
    }

    const context = text.slice(0, 140);
    const href = getNearestAnchor(parent, pathname);
    const key = `${context.toLowerCase()}::${href}`;
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    entries.push({
      label: context.slice(0, 44),
      context,
      href,
      keywords: tokenize(context),
    });
  }

  return entries;
}

export default function HomeQuickSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState<SearchEntry[]>([]);

  useEffect(() => {
    const updateIndex = () => {
      setPageIndex(collectPageEntries(pathname));
    };

    const timeoutId = window.setTimeout(updateIndex, 60);
    window.addEventListener("resize", updateIndex, { passive: true });

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      window.removeEventListener("resize", updateIndex);
    };
  }, [pathname]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current) {
        return;
      }

      if (containerRef.current.contains(event.target as Node)) {
        return;
      }

      setIsOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const matches = useMemo(() => {
    const q = query.trim();
    if (!q) {
      return [] as SearchEntry[];
    }

    const merged = [...searchIndex, ...pageIndex];
    const deduped = new Map<string, SearchEntry>();
    for (const entry of merged) {
      const key = `${entry.href}::${entry.context.toLowerCase()}`;
      if (!deduped.has(key)) {
        deduped.set(key, entry);
      }
    }

    return [...deduped.values()]
      .map((entry) => ({ entry, score: scoreEntry(entry, q) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
        .slice(0, 8)
      .map((item) => item.entry);
  }, [query, pageIndex]);

  const buildSearchHref = (baseHref: string, term: string): string => {
    const cleanTerm = term.trim();
    if (!cleanTerm) {
      return baseHref;
    }

    const [pathWithQuery, hash = ""] = baseHref.split("#");
    const separator = pathWithQuery.includes("?") ? "&" : "?";
    const nextPath = `${pathWithQuery}${separator}q=${encodeURIComponent(cleanTerm)}`;
    return hash ? `${nextPath}#${hash}` : nextPath;
  };

  const navigateToMatch = (value: string, explicitHref?: string) => {
    const href = explicitHref ?? matches[0]?.href;

    if (href) {
      setIsOpen(false);
      router.push(buildSearchHref(href, value));
    }
  };

  return (
    <div ref={containerRef} className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-[min(78vw,22rem)]">
        <Image
          src={bush2}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-9 -top-2 w-20 rotate-[90deg] opacity-75 -z-100000"
        />
      <div className="relative rounded-full border border-[#86efac]/45 bg-[#d1fae5]/35 backdrop-blur-2xl shadow-[0_7px_18px_rgba(5,150,105,0.11)]">
        <label htmlFor="home-search" className="sr-only">
          Search profile keywords
        </label>
        <input
          id="home-search"
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              navigateToMatch(query);
            }
          }}
          placeholder="Search profile"
          className="w-full bg-transparent py-2.5 pl-11 pr-[3.55rem] rounded-full text-sm font-semibold text-[#064e3b] placeholder:text-[#065f46]/52 focus:outline-none"
        />
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[1.02rem] text-[#047857]/82" aria-hidden="true">
          search
        </span>
        <button
          type="button"
          aria-label="Submit search"
          onClick={() => navigateToMatch(query)}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[#10b981] text-white border border-[#10b981] shadow-[0_6px_14px_rgba(5,150,105,0.24)] hover:bg-[#059669] transition-colors flex items-center justify-center"
        >
          <Image
            src={pixelatedArrow}
            alt=""
            aria-hidden="true"
            className="block absolute -right-0.65 h-[20px] w-[20px] object-contain mx-auto my-auto"
          />
        </button>
      </div>
      {query && isOpen ? (
        matches.length ? (
          <div className="mt-2 rounded-2xl border border-[#86efac]/45 bg-[#d1fae5]/45 backdrop-blur-2xl shadow-[0_7px_18px_rgba(5,150,105,0.1)] overflow-hidden">
            {matches.map((item) => (
              <button
                key={`${item.href}-${item.label}`}
                type="button"
                onClick={() => navigateToMatch(query, item.href)}
                className="w-full text-left px-3 py-2.5 text-xs md:text-sm font-semibold text-[#064e3b] hover:bg-white/35 transition-colors"
              >
                <span className="block">{item.label}</span>
                <span className="block text-[11px] font-medium text-[#065f46]/75 mt-0.5">{item.context}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-1.5 text-center text-[11px] font-semibold text-[#065f46]/70">No match in visible content yet. Try a different keyword.</p>
        )
      ) : null}
    </div>
  );
}
