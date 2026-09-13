import Link from "next/link";
import { capabilityGroups, experience, projects } from "./data/portfolio";

const featuredProjects = projects.filter((project) => project.featured);
const additionalProjects = projects.filter((project) => !project.featured);

export default function Home() {
  return (
    <main>
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center px-5 py-20 md:px-8 md:py-28">
        <div className="grid w-full gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="section-label">Software Engineer · Bengaluru</p>
            <h1 className="mt-7 max-w-5xl text-5xl font-black tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-[5.7rem] lg:leading-[0.95]">
              I build software products that have to <span className="text-gradient">actually work.</span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#aab5c3] md:text-xl">
              I&apos;m Rishikesh Munnaluri, a software engineer focused on full-stack systems, backend engineering and applied AI. I like taking ambitious ideas from architecture to production — especially when realtime state, data, ML or product reliability make the problem interesting.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#work" className="button-primary">View selected work ↓</a>
              <a href="/rishi-resume.pdf" target="_blank" rel="noreferrer" className="button-secondary">Resume ↗</a>
              <a href="https://github.com/Rishikeshsanin" target="_blank" rel="noreferrer" className="button-secondary">GitHub ↗</a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#8491a3]">
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#9cf6d9]" /> Open to software engineering opportunities</span>
              <a className="transition hover:text-white" href="mailto:rishikeshjonin@gmail.com">rishikeshjonin@gmail.com</a>
            </div>
          </div>

          <aside className="metric-card p-5 md:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#7f8b9b]">Professional snapshot</p>
            <dl className="mt-5 divide-y divide-white/8">
              <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-4 first:pt-0">
                <dt className="text-sm text-[#7f8b9b]">Education</dt>
                <dd className="text-sm font-semibold text-white">B.Tech (Hons) CSE — AI & ML</dd>
              </div>
              <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
                <dt className="text-sm text-[#7f8b9b]">University</dt>
                <dd className="text-sm font-semibold text-white">RV University, Bengaluru</dd>
              </div>
              <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
                <dt className="text-sm text-[#7f8b9b]">Graduation</dt>
                <dd className="text-sm font-semibold text-white">2027</dd>
              </div>
              <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-4 pb-0">
                <dt className="text-sm text-[#7f8b9b]">Focus</dt>
                <dd className="text-sm font-semibold text-white">SWE · Backend · Applied AI</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section id="work" className="scroll-mt-24 border-t border-white/8">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label">Selected work</p>
              <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.045em] text-white md:text-6xl">Projects with real engineering depth.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#8995a5] md:text-right">
              No tutorial clones and no decorative metrics. These are the systems I&apos;d be comfortable opening in a technical interview and explaining from architecture to tradeoffs.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <article key={project.slug} className={`project-card p-6 md:p-8 ${index === 0 ? "lg:col-span-2" : ""}`}>
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#9cf6d9]">{project.eyebrow}</p>
                    <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 font-mono text-[0.68rem] text-[#8995a5]">{project.status}</span>
                  </div>

                  <h3 className={`mt-8 font-black tracking-[-0.04em] text-white ${index === 0 ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"}`}>{project.name}</h3>
                  <p className={`mt-4 max-w-3xl leading-7 text-[#a7b2c0] ${index === 0 ? "text-base md:text-lg" : "text-sm md:text-base"}`}>{project.summary}</p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.stack.slice(0, index === 0 ? 6 : 5).map((item) => <span className="chip" key={item}>{item}</span>)}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={`/work/${project.slug}`} className="button-secondary !py-2.5 text-sm">Case study →</Link>
                    {project.live ? <a href={project.live} target="_blank" rel="noreferrer" className="button-secondary !py-2.5 text-sm">Live ↗</a> : null}
                    <a href={project.repo} target="_blank" rel="noreferrer" className="button-secondary !py-2.5 text-sm">Source ↗</a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {additionalProjects.length > 0 ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {additionalProjects.map((project) => (
                <article key={project.slug} className="project-card p-6">
                  <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#9cf6d9]">{project.status}</p>
                  <h3 className="mt-5 text-2xl font-black tracking-[-0.035em] text-white">{project.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#96a2b1]">{project.summary}</p>
                  <div className="mt-6 flex gap-3">
                    <Link href={`/work/${project.slug}`} className="text-sm font-bold text-white transition hover:text-[#9cf6d9]">View case study →</Link>
                    <a href={project.repo} target="_blank" rel="noreferrer" className="text-sm text-[#7f8b9b] transition hover:text-white">GitHub ↗</a>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          <div className="mt-8">
            <Link href="/work" className="button-secondary">View all selected work →</Link>
          </div>
        </div>
      </section>

      <section id="experience" className="scroll-mt-24 border-t border-white/8">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="section-label">Experience</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.045em] text-white md:text-5xl">Beyond project cards.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#8e9aaa]">
              Teaching, applied ML work and startup experience shaped how I communicate technical ideas, debug under constraints and turn prototypes into products.
            </p>
          </div>

          <div className="border-l border-white/10 pl-5 md:pl-8">
            {experience.map((item) => (
              <article key={`${item.company}-${item.period}`} className="relative border-b border-white/8 py-7 first:pt-0 last:border-b-0 last:pb-0">
                <span className="absolute -left-[1.55rem] top-2 h-2 w-2 rounded-full border border-[#9cf6d9] bg-[#080b10] md:-left-[2.3rem]" />
                <p className="font-mono text-xs text-[#7f8b9b]">{item.period}</p>
                <h3 className="mt-2 text-xl font-bold text-white md:text-2xl">{item.role}</h3>
                <p className="mt-1 text-sm font-semibold text-[#9cf6d9]">{item.company}</p>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#99a5b4]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="scroll-mt-24 border-t border-white/8">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <p className="section-label">Engineering capabilities</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 className="max-w-3xl text-4xl font-black tracking-[-0.045em] text-white md:text-5xl">Tools grouped by how I actually use them.</h2>
            <p className="max-w-xl text-sm leading-7 text-[#8e9aaa] lg:justify-self-end">
              No proficiency percentages. The useful question is whether I can design, build, debug and ship with the stack — and the projects above are the evidence.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilityGroups.map((group) => (
              <article key={group.title} className="metric-card p-5 md:p-6">
                <h3 className="text-sm font-bold text-white">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => <span key={item} className="chip">{item}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-t border-white/8">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-2">
          <div>
            <p className="section-label">About</p>
            <h2 className="mt-5 max-w-xl text-4xl font-black tracking-[-0.045em] text-white md:text-5xl">Product-minded engineering, without losing the fundamentals.</h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-[#9da9b8]">
            <p>
              I&apos;m a final-year B.Tech (Hons) Computer Science student specializing in AI & ML at RV University. I enjoy software engineering problems where product experience and technical architecture have to meet in the middle.
            </p>
            <p>
              My recent work spans deterministic AI-assisted analytics, realtime multiplayer systems, synchronized media experiences, AutoML workflows, local-first speech products and multi-provider music infrastructure. I care about the less glamorous parts too: failure states, auth boundaries, data correctness, testing, observability and deployment.
            </p>
            <p>
              I&apos;m currently looking for software engineering opportunities where I can keep building, learn from strong engineers and own meaningful pieces of a real product.
            </p>
            <div className="pt-3 flex flex-wrap gap-3">
              <a href="https://www.linkedin.com/in/rishikesh-munnaluri-143b34293/" target="_blank" rel="noreferrer" className="button-secondary">LinkedIn ↗</a>
              <a href="mailto:rishikeshjonin@gmail.com" className="button-secondary">Email me →</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
