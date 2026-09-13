import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../data/portfolio";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <Link href="/work" className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#8793a3] transition hover:text-white">
        ← Selected work
      </Link>

      <section className="mt-10 border-b border-white/8 pb-12 md:pb-16">
        <div className="flex flex-wrap items-center gap-3">
          <span className="section-label">{project.eyebrow}</span>
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 font-mono text-[0.68rem] text-[#8995a5]">{project.status}</span>
        </div>
        <h1 className="mt-8 text-5xl font-black tracking-[-0.055em] text-white sm:text-6xl md:text-7xl">{project.name}</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-[#a5b0bd] md:text-xl">{project.summary}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.live ? <a href={project.live} target="_blank" rel="noreferrer" className="button-primary">Open live product ↗</a> : null}
          <a href={project.repo} target="_blank" rel="noreferrer" className="button-secondary">View source ↗</a>
        </div>
      </section>

      <section className="grid gap-10 border-b border-white/8 py-12 md:py-16 lg:grid-cols-[0.45fr_1.55fr]">
        <div>
          <p className="section-label">Engineering proof</p>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-white">Why this project is here.</h2>
        </div>
        <div className="space-y-4">
          {project.proof.map((point) => (
            <div key={point} className="metric-card flex gap-4 p-5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#9cf6d9]" />
              <p className="leading-7 text-[#a4afbc]">{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-10 border-b border-white/8 py-12 md:py-16 lg:grid-cols-[0.45fr_1.55fr]">
        <div>
          <p className="section-label">Stack</p>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-white">Technology with a job to do.</h2>
        </div>
        <div className="flex flex-wrap content-start gap-2">
          {project.stack.map((item) => <span key={item} className="chip">{item}</span>)}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="rounded-2xl border border-[#9cf6d9]/15 bg-[#9cf6d9]/[0.035] p-6 md:p-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#9cf6d9]">Interview note</p>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[#a9b4c1]">
            The portfolio intentionally keeps this page concise. The repository contains the implementation and project-specific documentation; during an interview I can walk through architecture, failure modes, tradeoffs, testing and what I would change next.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={project.repo} target="_blank" rel="noreferrer" className="button-secondary">Read the repository ↗</a>
            <Link href="/#experience" className="button-secondary">See experience →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
