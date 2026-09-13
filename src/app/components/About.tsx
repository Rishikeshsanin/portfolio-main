"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import rishiPhoto from "../assets/imgs/rishi.jpeg";

const experience = [
  { date: "May 2026 – Jul 2026", title: "Assistant Teaching Faculty Intern · RICON Technologies", blurb: "Supported C and Python theory/lab sessions, prepared programming exercises and mentored students through debugging and core programming concepts." },
  { date: "Jun 2024 – Jul 2024", title: "Cybersecurity Intern · Dhee Data Center", blurb: "Built a Python malware-detection workflow with preprocessing and feature engineering, then evaluated Random Forest, SVM and XGBoost models." },
  { date: "2025", title: "Co-Founder · Mew Thetis", blurb: "Presented Socio Drift, an AI-powered music-generation platform, as a Karnataka Elevate 2025 finalist." },
];

const skills = [
  { title: "Languages", items: ["Java", "Python", "TypeScript / JavaScript", "SQL", "C++"] },
  { title: "Full Stack", items: ["React", "Next.js", "FastAPI", "REST APIs", "PostgreSQL"] },
  { title: "Applied AI / ML", items: ["LLMs", "AI Agents", "scikit-learn", "XGBoost", "ML Pipelines"] },
  { title: "Realtime & Delivery", items: ["Firebase", "Supabase", "LiveKit", "WebRTC", "Docker", "CI/CD"] },
];

export default function About() {
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

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[2.6rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-xl p-7 md:p-9 shadow-[0_20px_56px_rgba(16,185,129,0.05)]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div><p className="text-[11px] tracking-[0.16em] uppercase font-bold text-[#10b981]">Engineering Stack</p><h3 className="mt-2 text-2xl md:text-3xl font-black text-[var(--text-heading)]">What I build with</h3></div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">Grouped by actual engineering use, not proficiency percentages.</p>
          </div>
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((group) => <div key={group.title} className="rounded-2xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] p-5"><h4 className="font-black text-[var(--text-heading)]">{group.title}</h4><div className="mt-3 flex flex-wrap gap-2">{group.items.map((item) => <span key={item} className="rounded-full px-2.5 py-1 text-[10px] md:text-xs font-bold border border-[#10b981]/20 bg-[#10b981]/10 text-[#10b981]">{item}</span>)}</div></div>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
