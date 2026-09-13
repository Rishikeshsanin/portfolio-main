import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "../data/portfolio";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected software engineering projects by Rishikesh Munnaluri.",
};

export default function WorkPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="max-w-4xl">
        <p className="section-label">Selected work</p>
        <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] text-white md:text-7xl">Seven projects. Different engineering problems.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#9da9b8]">
          This is intentionally not a dump of every repository I own. These projects were selected because they demonstrate different parts of how I build: backend architecture, applied AI, realtime state, media, ML pipelines, product design and production reliability.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <article key={project.slug} className={`project-card p-6 md:p-8 ${index === 0 ? "md:col-span-2" : ""}`}>
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#9cf6d9]">{project.eyebrow}</p>
                <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 font-mono text-[0.68rem] text-[#8995a5]">{project.status}</span>
              </div>
              <h2 className="mt-7 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">{project.name}</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#9da9b8] md:text-base">{project.summary}</p>

              <ul className="mt-6 space-y-3 text-sm leading-6 text-[#aab4c1]">
                {project.proof.slice(0, 3).map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9cf6d9]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.stack.map((item) => <span key={item} className="chip">{item}</span>)}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/work/${project.slug}`} className="button-primary !py-2.5 text-sm">Case study →</Link>
                {project.live ? <a href={project.live} target="_blank" rel="noreferrer" className="button-secondary !py-2.5 text-sm">Live ↗</a> : null}
                <a href={project.repo} target="_blank" rel="noreferrer" className="button-secondary !py-2.5 text-sm">GitHub ↗</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
