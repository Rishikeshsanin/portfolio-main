import Image, { type StaticImageData } from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import aetherShot from '../../assets/imgs/aether.jpeg';
import calgpaShot from '../../assets/imgs/calgpa.jpeg';
import zephraShot from '../../assets/imgs/zephra.jpeg';

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

type ProjectData = {
  name: string;
  category: string;
  summary: string;
  hero: StaticImageData;
  tags: string[];
  highlights: string[];
  stack: string[];
  accent: string;
};

const projects: Record<string, ProjectData> = {
  calgpa: {
    name: 'CalGPA',
    category: 'Academic Tool • PWA',
    summary:
      'CalGPA helps university students evaluate semester outcomes, project final GPA scenarios, and stay consistent with personalized performance analytics.',
    hero: calgpaShot,
    tags: ['Semester Planning', 'Performance Analytics', 'Progress Tracking'],
    highlights: [
      'Fast grade simulator with dynamic GPA projections.',
      'Course-wise breakdown cards with clear visual weighting.',
      'Designed to feel light, mobile-first, and distraction free.',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PWA'],
    accent: 'from-emerald-300/55 via-teal-200/45 to-cyan-200/40',
  },
  zephra: {
    name: 'Zephra',
    category: 'Climate Tracking • PWA',
    summary:
      'Zephra merges satellite and ground data into readable air-quality insights so users can make better daily decisions with confidence.',
    hero: zephraShot,
    tags: ['Air Quality Forecasting', 'Data Fusion', 'Geo Insights'],
    highlights: [
      'Live map overlays blending forecast and station signals.',
      'Readable AQ metrics with confidence ranges and trends.',
      'Built to communicate science through calm UI patterns.',
    ],
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'Visualization APIs'],
    accent: 'from-emerald-200/60 via-lime-200/45 to-sky-200/40',
  },
  aether: {
    name: 'Aether',
    category: 'AI Companion • Habit System',
    summary:
      'Aether combines journaling, habits, and emotional analytics with an adaptive AI companion that evolves based on user behavior.',
    hero: aetherShot,
    tags: ['Behavior Loop', 'AI Companion', 'Emotional Signals'],
    highlights: [
      'Daily mood and habit loops with adaptive nudges.',
      'Companion character state reacts to engagement quality.',
      'Unified interface for reflection, planning, and tracking.',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AI Workflows'],
    accent: 'from-emerald-400/55 via-green-300/45 to-teal-300/40',
  },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    return { title: 'Project' };
  }

  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectDetailsPage({ params }: Params) {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto w-full max-w-6xl rounded-[2.6rem] border border-white/70 bg-white/32 backdrop-blur-xl shadow-[0_30px_70px_rgba(6,95,70,0.18)] overflow-hidden">
        <section className="relative p-6 md:p-10 lg:p-12">
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent}`} />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <article className="rounded-[2rem] border border-white/70 bg-white/65 backdrop-blur-md p-6 md:p-8 shadow-[0_15px_40px_rgba(15,23,42,0.12)]">
              <p className="inline-flex px-4 py-1.5 rounded-full text-xs tracking-[0.16em] uppercase bg-emerald-700/10 text-emerald-900 font-semibold">
                {project.category}
              </p>
              <h1 className="mt-5 text-4xl md:text-5xl font-black text-emerald-950 leading-tight">{project.name}</h1>
              <p className="mt-5 text-emerald-900/90 text-lg leading-relaxed">{project.summary}</p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/75 border border-emerald-700/15 text-emerald-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            <div className="rounded-[2rem] border border-white/70 bg-white/40 backdrop-blur-md p-4 md:p-5 shadow-[0_15px_40px_rgba(15,23,42,0.12)] flex items-center justify-center">
              <div className="relative w-full max-w-[360px] aspect-[9/19] rounded-[2.2rem] border-[10px] border-white shadow-[0_24px_40px_rgba(6,95,70,0.2)] overflow-hidden">
                <Image src={project.hero} alt={`${project.name} app preview`} fill className="object-cover" sizes="(max-width: 768px) 88vw, 360px" />
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 pt-0 md:pt-0">
          <article className="rounded-[1.8rem] border border-white/65 bg-white/55 backdrop-blur-md p-6 shadow-[0_15px_35px_rgba(15,23,42,0.1)]">
            <h2 className="text-2xl font-bold text-emerald-950">Highlights</h2>
            <ul className="mt-4 space-y-3 text-emerald-900/90">
              {project.highlights.map((item) => (
                <li key={item} className="rounded-xl bg-white/70 border border-emerald-700/10 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[1.8rem] border border-white/65 bg-white/55 backdrop-blur-md p-6 shadow-[0_15px_35px_rgba(15,23,42,0.1)]">
            <h2 className="text-2xl font-bold text-emerald-950">Stack</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {project.stack.map((tech) => (
                <div key={tech} className="rounded-xl bg-white/75 border border-emerald-700/10 px-4 py-3 text-emerald-900 font-medium text-sm">
                  {tech}
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
