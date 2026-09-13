"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import rishiPhoto from "../assets/imgs/rishi.jpeg";

const githubUsername = "Rishikeshsanin";

const experience = [
  { date: "May 2026 – Jul 2026", title: "Assistant Teaching Faculty Intern · RICON Technologies", blurb: "Supported C and Python theory/lab sessions, prepared programming exercises and mentored students through debugging and core programming concepts." },
  { date: "Jun 2024 – Jul 2024", title: "Cybersecurity Intern · Dhee Data Center", blurb: "Built a Python malware-detection workflow with preprocessing and feature engineering, then evaluated Random Forest, SVM and XGBoost models." },
  { date: "2025", title: "Co-Founder · Mew Thetis", blurb: "Presented Socio Drift, an AI-powered music-generation platform, as a Karnataka Elevate 2025 finalist." },
];

const loopTitles = [
  "Software Engineering",
  "Backend Systems",
  "Product Engineering",
  "Applied AI",
  "Realtime Apps",
  "Full Stack Delivery",
  "ML Pipelines",
  "API Engineering",
  "System Design",
  "Production Reliability",
];

const focusAreas = [
  { label: "Backend & APIs", filled: 18 },
  { label: "Full Stack Development", filled: 18 },
  { label: "Applied AI / ML", filled: 16 },
  { label: "Realtime Systems", filled: 17 },
];

const coreStack = [
  { name: "Git", icon: "https://img.icons8.com/color/96/git.png" },
  { name: "GitHub", icon: "https://img.icons8.com/color/96/github--v1.png" },
  { name: "Docker", icon: "https://img.icons8.com/color/96/docker.png" },
  { name: "Java", icon: "https://img.icons8.com/color/96/java-coffee-cup-logo--v1.png" },
  { name: "Python", icon: "https://img.icons8.com/color/96/python--v1.png" },
  { name: "JavaScript", icon: "https://img.icons8.com/color/96/javascript--v1.png" },
  { name: "TypeScript", icon: "https://img.icons8.com/color/96/typescript.png" },
  { name: "React", icon: "https://img.icons8.com/color/96/react-native.png" },
  { name: "Next.js", icon: "https://img.icons8.com/color/96/nextjs.png" },
  { name: "Tailwind CSS", icon: "https://img.icons8.com/color/96/tailwindcss.png" },
  { name: "PostgreSQL", icon: "https://img.icons8.com/color/96/postgreesql.png" },
  { name: "Firebase", icon: "https://img.icons8.com/color/96/firebase.png" },
  { name: "API Engineering", icon: "https://img.icons8.com/color/96/api-settings.png" },
  { name: "SQL", icon: "https://img.icons8.com/color/96/sql.png" },
  { name: "AI / LLMs", icon: "https://img.icons8.com/color/96/chatgpt.png" },
];

type Contribution = { date: string; count: number; level: number };

export default function About() {
  const [repoCount, setRepoCount] = useState<string>("—");
  const [starCount, setStarCount] = useState<string>("—");
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [contributionTotal, setContributionTotal] = useState<string>("—");

  useEffect(() => {
    async function loadGitHub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`),
          fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`),
        ]);

        if (userRes.ok) {
          const user = await userRes.json();
          if (typeof user.public_repos === "number") setRepoCount(String(user.public_repos));
        }

        if (reposRes.ok) {
          const repos = await reposRes.json();
          const stars = repos.reduce((sum: number, repo: { stargazers_count?: number }) => sum + (repo.stargazers_count || 0), 0);
          setStarCount(String(stars));
        }
      } catch {
        // The cards retain neutral fallbacks if GitHub rate-limits a visitor.
      }

      try {
        const graphRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`);
        if (!graphRes.ok) return;
        const graph = await graphRes.json();
        if (Array.isArray(graph.contributions)) {
          setContributions(graph.contributions);
          const total = graph.contributions.reduce((sum: number, day: Contribution) => sum + (day.count || 0), 0);
          setContributionTotal(String(total));
        }
      } catch {
        // Graph gracefully falls back to an empty grid and direct GitHub link.
      }
    }

    loadGitHub();
  }, []);

  const graphDays = useMemo(() => {
    if (contributions.length) return contributions.slice(-371);
    return Array.from({ length: 364 }, (_, index) => ({ date: String(index), count: 0, level: 0 }));
  }, [contributions]);

  const monthLabels = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 12 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - 11 + index, 1);
      return date.toLocaleString("en", { month: "short" });
    });
  }, []);

  const stats = [
    { label: "GitHub Repositories", value: repoCount },
    { label: "Portfolio Flagships", value: "7" },
    { label: "GitHub Contributions", value: contributionTotal },
    { label: "GitHub Stars", value: starCount },
  ];

  return (
    <section id="about" className="relative w-full min-h-screen pb-16 overflow-hidden">
      <div className="relative px-6 md:px-12 w-full max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-14">
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-7xl font-extrabold font-headline font-doto text-[var(--text-heading)] tracking-tight leading-[0.95]">
            Building Products, <br />With Curiosity<span className="font-doto rubber-spin-dot inline-flex text-[#10b981] ml-1">+</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] font-medium max-w-3xl mx-auto">
            Final-year CSE (AI & ML) student at RV University, focused on software engineering, backend systems and applied AI.
          </p>
          <div className="mt-6 flex justify-center">
            <a href="/rishi-resume.pdf" download="Rishikesh-Munnaluri-Resume.pdf" className="group inline-flex items-center gap-2 rounded-full border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-6 py-3 text-sm md:text-base font-extrabold tracking-[0.08em] uppercase text-[#10b981] shadow-[0_10px_24px_rgba(16,185,129,0.08)] backdrop-blur-md hover:shadow-[0_14px_32px_rgba(16,185,129,0.15)] transition-all">
              Download Resume <span className="material-symbols-outlined text-base">download</span>
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-10">
          <motion.aside initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-5 rounded-[2.6rem] border border-[#10b981]/20 bg-[var(--site-card-bg-accent)] backdrop-blur-xl p-7 md:p-9 shadow-[0_24px_64px_rgba(0,0,0,0.12)] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#10b981]/10 blur-2xl" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl border border-[#10b981]/25 overflow-hidden shadow-[0_14px_24px_rgba(0,0,0,0.15)] shrink-0">
                <Image src={rishiPhoto} alt="Rishikesh Munnaluri" fill className="object-cover" sizes="112px" priority />
              </div>
              <div>
                <p className="text-xs tracking-[0.14em] uppercase text-[#10b981] font-bold">Hello there, I&apos;m</p>
                <h2 className="text-2xl font-black leading-tight mt-1 text-[var(--text-heading)]">Rishikesh Munnaluri</h2>
                <p className="text-xs tracking-[0.12em] uppercase text-[var(--text-secondary)] mt-2 font-bold">Software Engineer · Bengaluru</p>
              </div>
            </div>
            <p className="relative z-10 mt-6 text-[var(--text-secondary)] text-base leading-relaxed font-medium">
              I like building products end-to-end — from interface and API design to databases, realtime state, AI workflows, testing and deployment. Most of my recent work started as an ambitious idea and became a product I could actually run, demo and defend technically.
            </p>
            <div className="relative z-10 mt-6 flex flex-wrap gap-2.5">
              {["Backend Systems", "Applied AI", "Realtime Apps", "Product Engineering", "Full Stack"].map((chip) => (
                <span key={chip} className="rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.08em] uppercase border border-[#10b981]/25 bg-[#10b981]/10 text-[#10b981]">{chip}</span>
              ))}
            </div>
          </motion.aside>

          <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-7 rounded-[2.6rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-xl p-7 md:p-9 shadow-[0_20px_56px_rgba(16,185,129,0.05)]">
            <p className="inline-flex px-4 py-1.5 rounded-full text-[11px] tracking-[0.16em] uppercase font-bold text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20">Experience</p>
            <div className="mt-6 space-y-6">
              {experience.map((item) => (
                <div key={item.title} className="relative pl-5 border-l border-[#10b981]/25">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_0_4px_rgba(16,185,129,0.10)]" />
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#10b981]">{item.date}</p>
                  <h3 className="mt-1 text-lg font-black text-[var(--text-heading)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed font-medium text-[var(--text-secondary)]">{item.blurb}</p>
                </div>
              ))}
            </div>
          </motion.article>
        </div>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 rounded-[2.6rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-xl p-6 md:p-8 shadow-[0_20px_56px_rgba(16,185,129,0.06)]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <p className="text-[11px] tracking-[0.16em] uppercase font-bold text-[#10b981]">GitHub Graph</p>
            <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer" className="rounded-full border border-[#10b981]/20 bg-[#10b981]/10 px-4 py-1.5 text-xs md:text-sm font-extrabold tracking-[0.08em] uppercase text-[#10b981] hover:bg-[#10b981]/15">
              @{githubUsername}
            </a>
          </div>

          <div className="rounded-[1.7rem] border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] p-4 md:p-6 overflow-x-auto no-scrollbar">
            <div className="min-w-[760px]">
              <div className="ml-14 mb-3 flex justify-between text-xs md:text-sm font-medium text-[var(--text-muted)]">
                {monthLabels.map((month, index) => <span key={`${month}-${index}`}>{month}</span>)}
              </div>
              <div className="flex gap-3">
                <div className="w-10 shrink-0 flex flex-col justify-around py-1 text-[11px] md:text-xs text-[var(--text-muted)]">
                  <span>Mon</span><span>Wed</span><span>Fri</span>
                </div>
                <div className="grid flex-1 grid-flow-col grid-rows-7 auto-cols-[11px] md:auto-cols-[13px] gap-[3px] md:gap-1">
                  {graphDays.map((day, index) => {
                    const opacity = day.level === 0 ? 0.08 : 0.28 + Math.min(day.level, 4) * 0.17;
                    return (
                      <span
                        key={`${day.date}-${index}`}
                        title={day.date.includes("-") ? `${day.date}: ${day.count} contributions` : undefined}
                        className="aspect-square rounded-[2px] border border-[var(--site-border)]"
                        style={{ backgroundColor: day.level === 0 ? "var(--site-surface-soft)" : `rgba(16,185,129,${opacity})` }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      <div className="relative z-10 w-screen left-1/2 -translate-x-1/2 overflow-hidden border-y border-[var(--site-border)] bg-[var(--site-surface)]/75 backdrop-blur-xl py-4 md:py-5 mb-10">
        <motion.div
          className="flex w-max items-center gap-5 md:gap-7"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          {[...loopTitles, ...loopTitles, ...loopTitles].map((title, index) => (
            <span key={`${title}-${index}`} className="whitespace-nowrap rounded-full border border-[#10b981]/20 bg-[#10b981]/10 px-5 py-2 text-sm md:text-base font-black uppercase tracking-[0.11em] text-[#10b981]">
              {title}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-10 items-start">
          <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-7 rounded-[2.6rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-xl p-7 md:p-9 shadow-[0_20px_56px_rgba(16,185,129,0.06)]">
            <p className="inline-flex px-4 py-1.5 rounded-full text-[11px] tracking-[0.16em] uppercase font-bold text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20">Product Stats</p>
            <h3 className="mt-5 text-3xl md:text-5xl font-extrabold font-doto text-[var(--text-heading)] leading-[1.04]">
              Products that ship, <br />not just demos.
            </h3>
            <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed font-medium">
              I like taking ideas through the uncomfortable parts too — integration, debugging, deployment, reliability and iteration after the first version works.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3 md:gap-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-4 py-4 shadow-sm">
                  <p className="text-[10px] md:text-[11px] tracking-[0.14em] uppercase text-[#10b981] font-bold">{item.label}</p>
                  <p className="mt-1 text-xl md:text-2xl font-black text-[var(--text-card)]">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-5 rounded-[2.6rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-xl p-7 md:p-9 shadow-[0_20px_56px_rgba(16,185,129,0.06)]">
            <h3 className="text-3xl md:text-4xl font-extrabold font-doto text-[var(--text-heading)]">Skills</h3>
            <div className="mt-6 space-y-5">
              {focusAreas.map((area) => (
                <div key={area.label}>
                  <p className="mb-2 text-sm font-bold text-[var(--text-secondary)]">{area.label}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from({ length: 20 }, (_, index) => (
                      <span key={index} className={`h-2.5 w-2.5 rounded-[4px] border ${index < area.filled ? "border-[#059669] bg-[#10b981]" : "border-[var(--site-border-strong)] bg-[var(--site-card-bg-strong)]"}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 grid grid-cols-5 gap-2.5 md:gap-3">
              {coreStack.map((tech) => (
                <div key={tech.name} title={tech.name} className="group aspect-square grid place-items-center rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] p-2.5 shadow-sm transition-transform hover:-translate-y-1">
                  <img src={tech.icon} alt={tech.name} loading="lazy" className="h-7 w-7 md:h-8 md:w-8 object-contain group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </motion.article>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <article className="rounded-[2.4rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-xl p-7 md:p-9 shadow-[0_20px_56px_rgba(16,185,129,0.05)]">
            <p className="text-[11px] tracking-[0.16em] uppercase font-bold text-[#10b981]">Education</p>
            <h3 className="mt-4 text-2xl md:text-3xl font-black text-[var(--text-heading)]">RV University</h3>
            <p className="mt-2 text-base font-bold text-[var(--text-secondary)]">B.Tech (Hons) Computer Science & Engineering — AI & ML</p>
            <div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full px-3 py-1.5 text-xs font-bold border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] text-[#10b981]">2023 – 2027</span><span className="rounded-full px-3 py-1.5 text-xs font-bold border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] text-[#10b981]">Bengaluru</span></div>
          </article>
          <article className="rounded-[2.4rem] border border-[#10b981]/20 bg-[var(--site-card-bg-accent)] backdrop-blur-xl p-7 md:p-9 shadow-[0_20px_56px_rgba(16,185,129,0.06)]">
            <p className="text-[11px] tracking-[0.16em] uppercase font-bold text-[#10b981]">Selected Achievement</p>
            <h3 className="mt-4 text-2xl md:text-3xl font-black text-[var(--text-heading)]">Karnataka Elevate 2025 Finalist</h3>
            <p className="mt-3 text-sm md:text-base leading-relaxed font-medium text-[var(--text-secondary)]">Presented Socio Drift through Mew Thetis as an AI-powered music-generation startup project.</p>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
