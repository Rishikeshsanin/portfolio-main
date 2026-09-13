"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type ExtraProject = {
  name: string;
  category: string;
  icon: string;
  description: string;
  stack: string[];
  repo: string;
  live?: string;
};

const extraProjects: ExtraProject[] = [
  {
    name: "AetherWeather",
    category: "Weather · Forecasting",
    icon: "partly_cloudy_day",
    description: "A polished weather experience with forecast exploration and an architecture ready for predictive ML features.",
    stack: ["JavaScript", "Weather APIs", "Vercel"],
    repo: "https://github.com/Rishikeshsanin/AetherWeather",
    live: "https://aether-weather-kappa.vercel.app",
  },
  {
    name: "Trust Issues 1D",
    category: "Game · Unity",
    icon: "sports_esports",
    description: "A compact 1D game built in Unity and shipped for both web and desktop as a complete playable project.",
    stack: ["Unity", "C#", "WebGL"],
    repo: "https://github.com/Rishikeshsanin/TrustIssues1D",
    live: "https://trust-issues-1d.vercel.app",
  },
  {
    name: "Student Attendance",
    category: "Campus Tool · QR",
    icon: "qr_code_scanner",
    description: "QR-based attendance workflow designed around student USNs, daily sessions and lightweight classroom use.",
    stack: ["JavaScript", "QR", "Supabase"],
    repo: "https://github.com/Rishikeshsanin/student-attendance-system",
  },
  {
    name: "Business Receipt Generator",
    category: "Utility · Documents",
    icon: "receipt_long",
    description: "A fast no-login receipt generator focused on practical business use, print output and clean document export.",
    stack: ["Web", "PDF", "Print"],
    repo: "https://github.com/Rishikeshsanin/business-receipt-generator",
  },
  {
    name: "SecretURL",
    category: "Web Utility · Links",
    icon: "link",
    description: "A lightweight URL utility product with a small surface area, clean interaction model and deployable web workflow.",
    stack: ["JavaScript", "JSON", "Vercel"],
    repo: "https://github.com/Rishikeshsanin/SecretURL",
  },
  {
    name: "OpenPage",
    category: "Frontend · Product UI",
    icon: "web",
    description: "A refined open-source web experience rebuilt with custom content, product polish and preserved upstream credits.",
    stack: ["Frontend", "UI/UX", "Vercel"],
    repo: "https://github.com/Rishikeshsanin/OpenPage",
  },
];

export default function MoreProjects() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative z-10 w-full max-w-[1480px] mx-auto px-5 md:px-10 lg:px-14 -mt-12 pb-12">
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="group inline-flex items-center gap-3 rounded-full border border-[var(--site-border)] bg-[var(--site-surface)]/90 px-5 py-3 text-sm font-extrabold text-[var(--text-heading)] shadow-[0_12px_34px_rgba(6,95,70,0.12)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-[#10b981]/45 hover:shadow-[0_16px_42px_rgba(6,95,70,0.18)]"
        >
          <span className="material-symbols-outlined text-[18px] text-[#10b981]">{open ? "grid_view" : "add"}</span>
          {open ? "Hide additional projects" : "View more projects"}
          <span className="rounded-full border border-[#10b981]/20 bg-[#10b981]/10 px-2 py-0.5 text-[10px] font-black tracking-wide text-[#10b981]">
            +{extraProjects.length}
          </span>
          <span className={`material-symbols-outlined text-[18px] text-[#10b981] transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            expand_more
          </span>
        </button>

        <p className="mt-3 text-center text-xs md:text-sm font-medium text-[var(--text-secondary)]">
          Smaller shipped projects and experiments — kept separate from the main case studies.
        </p>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="more-projects"
            initial={{ opacity: 0, height: 0, y: -12 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -12 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
              {extraProjects.map((project, index) => (
                <motion.article
                  key={project.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.035, duration: 0.28 }}
                  className="group relative overflow-hidden rounded-[1.55rem] border border-[var(--site-border)] bg-[var(--site-card-bg)]/95 p-5 backdrop-blur-2xl shadow-[0_14px_36px_rgba(6,95,70,0.08)] transition-all hover:-translate-y-1 hover:border-[#10b981]/35 hover:shadow-[0_20px_50px_rgba(6,95,70,0.14)]"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#10b981]/10 blur-3xl" />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#10b981]/20 bg-[#10b981]/10">
                          <span className="material-symbols-outlined text-[20px] text-[#10b981]">{project.icon}</span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate text-base md:text-lg font-black text-[var(--text-heading)]">{project.name}</h3>
                          <p className="mt-0.5 text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#10b981]">{project.category}</p>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed font-medium text-[var(--text-secondary)]">{project.description}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span key={tech} className="rounded-full border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-2.5 py-1 text-[10px] font-semibold text-[#10b981]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-2 pt-1">
                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-[#10b981] px-3 py-1.5 text-[11px] font-extrabold text-white shadow-[0_3px_0_#059669] transition-transform hover:-translate-y-0.5"
                        >
                          Live <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                        </a>
                      ) : null}
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-3 py-1.5 text-[11px] font-extrabold text-[var(--text-heading)] transition-colors hover:border-[#10b981]/45"
                      >
                        GitHub <span className="material-symbols-outlined text-[13px]">code</span>
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
