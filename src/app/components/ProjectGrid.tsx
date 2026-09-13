"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type Project = {
  key: string;
  name: string;
  short: string;
  badge: string;
  icon: string;
  domain: string;
  role: string;
  status: string;
  description: string;
  stack: string[];
  repo: string;
  live?: string;
};

const projects: Project[] = [
  {
    key: "skylark",
    name: "Skylark Command",
    short: "Trust-native decision intelligence over live CRM and operational data.",
    badge: "Agentic AI · Enterprise",
    icon: "hub",
    domain: "Decision Intelligence",
    role: "Full Stack / AI Engineer",
    status: "Production · V2",
    description: "An executive decision-intelligence platform where deterministic analytics own business arithmetic and AI is constrained to typed planning and interpretation. Temporal PostgreSQL snapshots support change intelligence, Customer 360 and evidence-backed workflows.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "GraphQL", "Gemini", "Supabase"],
    repo: "https://github.com/Rishikeshsanin/skylark-command",
    live: "https://skylark-command.vercel.app",
  },
  {
    key: "vibify",
    name: "Vibify",
    short: "Realtime shared listening with one authoritative playback timeline.",
    badge: "Realtime · Music",
    icon: "graphic_eq",
    domain: "Realtime Media",
    role: "Full Stack Engineer",
    status: "V2 Active",
    description: "A shared-listening room that keeps phones and laptops aligned to one YouTube playback timeline without rebroadcasting audio. It synchronizes compact room state using Firebase server time, presence and versioned playback commands.",
    stack: ["Next.js", "TypeScript", "Firebase", "YouTube API", "React", "Vercel"],
    repo: "https://github.com/Rishikeshsanin/vibify",
    live: "https://vibify-mu.vercel.app",
  },
  {
    key: "imposter",
    name: "Imposter X",
    short: "Realtime social-deduction game with remote voice and video rooms.",
    badge: "Multiplayer · LiveKit",
    icon: "groups",
    domain: "Realtime Multiplayer",
    role: "Full Stack Engineer",
    status: "Live",
    description: "A social-deduction party game with server-authoritative room state, voting, chat, reactions, timers and scoring. Remote rooms add low-latency voice/video through authenticated LiveKit sessions, while Supabase RPCs and RLS protect game state.",
    stack: ["JavaScript", "Supabase", "PostgreSQL", "LiveKit", "WebRTC", "Vercel"],
    repo: "https://github.com/Rishikeshsanin/Imposter-X",
    live: "https://imposter-x.vercel.app",
  },
  {
    key: "nocodeml",
    name: "NoCodeML",
    short: "Guest-first AutoML workspace for training, comparing and exporting models.",
    badge: "ML Platform · Backend",
    icon: "model_training",
    domain: "Machine Learning Platform",
    role: "ML / Backend Engineer",
    status: "V3 Source",
    description: "An AutoML workflow for uploading datasets, checking ML readiness, training and comparing models, running predictions and exporting results. Temporary visitor workspaces are isolated and automatically cleaned up, while fitted preprocessing is reused correctly at inference time.",
    stack: ["React", "TypeScript", "FastAPI", "scikit-learn", "XGBoost", "LightGBM", "Docker"],
    repo: "https://github.com/Rishikeshsanin/NoCodeML",
  },
  {
    key: "auralis",
    name: "Auralis",
    short: "Multi-provider music platform with full playback, radio and Aura Mode.",
    badge: "Music · Multi-provider",
    icon: "music_note",
    domain: "Media Platform",
    role: "Product / Full Stack Engineer",
    status: "v10.2 Shipped",
    description: "A music product that separates discovery, metadata and playback while coordinating multiple providers behind one interface. It combines full-song playback, live radio, playlists, provider health and artwork-driven theming without letting multiple playback engines fight for audio ownership.",
    stack: ["JavaScript", "Vercel Functions", "YouTube API", "Audius", "Jamendo", "Deezer", "hls.js"],
    repo: "https://github.com/Rishikeshsanin/auralis-music",
    live: "https://auralis-music-lime.vercel.app",
  },
  {
    key: "echotype",
    name: "EchoType",
    short: "Privacy-first local dictation and multilingual desktop productivity.",
    badge: "Offline AI · Desktop",
    icon: "mic",
    domain: "Local AI / Speech",
    role: "Python / AI Engineer",
    status: "V2 Development",
    description: "A desktop dictation product being redesigned around local speech recognition, Indian-language support, push-to-talk, transcript cleanup and system-wide text injection. The architecture separates UI, speech-processing core, desktop services and storage for safer evolution.",
    stack: ["Python", "PySide6", "Qt", "Local ASR", "CUDA", "Desktop Services"],
    repo: "https://github.com/Rishikeshsanin/EchoType",
  },
  {
    key: "sociodrift",
    name: "Socio Drift",
    short: "Prompt-conditioned generative music for jingles and sonic identities.",
    badge: "Generative AI · Startup",
    icon: "auto_awesome",
    domain: "Generative Music",
    role: "Co-Founder / AI Engineer",
    status: "Elevate 2025 Finalist",
    description: "An AI-powered music-generation platform concept for creating original jingles, theme music and sonic identities from prompts with configurable mood, genre, tempo and instruments. Presented through Mew Thetis at Karnataka Elevate 2025.",
    stack: ["Python", "TensorFlow", "LSTM", "Transformers", "Gemini API"],
    repo: "https://github.com/Rishikeshsanin/SocioDrift",
  },
];

export default function ProjectGrid() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ skylark: true, vibify: true });
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-24 pt-6">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 md:mb-14">
        <p className="text-[11px] tracking-[0.18em] uppercase font-extrabold text-[#10b981]">Selected Engineering Work</p>
        <h1 className="mt-4 text-4xl sm:text-5xl md:text-7xl font-extrabold font-headline font-doto text-[var(--text-heading)] tracking-tight leading-[0.95]">
          Things I Actually Built<span className="rubber-spin-dot inline-flex text-[#10b981] ml-1">+</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg font-medium text-[var(--text-secondary)]">
          Seven projects chosen for technical depth, product thinking and the engineering conversations they can support in an interview.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {projects.map((project, index) => {
          const isOpen = !!expanded[project.key];
          const wide = index === 0;
          return (
            <motion.article
              key={project.key}
              layout={!reduceMotion}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2) }}
              className={`${wide ? "lg:col-span-2" : ""} relative overflow-hidden rounded-[2rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-xl shadow-[0_18px_52px_rgba(16,185,129,0.06)] hover:shadow-[0_24px_64px_rgba(16,185,129,0.13)] hover:border-[#10b981]/30 transition-all duration-300`}
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#10b981]/10 blur-3xl" />
              <div className="relative p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-12 w-12 rounded-2xl border border-[#10b981]/25 bg-[#10b981]/10 grid place-items-center shrink-0 shadow-[0_8px_24px_rgba(16,185,129,0.10)]">
                      <span className="material-symbols-outlined text-[#10b981]">{project.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-xl md:text-2xl font-black text-[var(--text-heading)] tracking-tight truncate">{project.name}</h2>
                      <p className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[0.13em] font-extrabold text-[#10b981]">{project.badge}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpanded((s) => ({ ...s, [project.key]: !isOpen }))}
                    aria-label={`${isOpen ? "Collapse" : "Expand"} ${project.name}`}
                    className="h-9 w-9 rounded-xl border border-[#10b981]/60 bg-[#10b981] text-white inline-flex items-center justify-center shadow-[0_8px_20px_rgba(16,185,129,0.18)] hover:bg-[#059669] transition-colors shrink-0"
                  >
                    <span className="material-symbols-outlined text-base">{isOpen ? "expand_less" : "expand_more"}</span>
                  </button>
                </div>

                <p className="mt-5 text-sm md:text-base leading-relaxed font-medium text-[var(--text-secondary)]">{project.short}</p>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div key="details" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden">
                      <p className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)] font-medium">{project.description}</p>

                      <div className="grid grid-cols-3 gap-2 mt-5">
                        <div className="rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-3 py-2"><p className="text-[9px] uppercase tracking-[0.12em] text-[#10b981] font-bold">Domain</p><p className="mt-1 text-[11px] font-bold text-[var(--text-card)] line-clamp-2">{project.domain}</p></div>
                        <div className="rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-3 py-2"><p className="text-[9px] uppercase tracking-[0.12em] text-[#10b981] font-bold">Role</p><p className="mt-1 text-[11px] font-bold text-[var(--text-card)] line-clamp-2">{project.role}</p></div>
                        <div className="rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-3 py-2"><p className="text-[9px] uppercase tracking-[0.12em] text-[#10b981] font-bold">Status</p><p className="mt-1 text-[11px] font-bold text-[var(--text-card)] line-clamp-2">{project.status}</p></div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.stack.map((tech) => <span key={tech} className="px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-[var(--site-card-bg-strong)] text-[#10b981] border border-[var(--site-border)]">{tech}</span>)}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#10b981] text-white px-4 py-2 text-xs font-extrabold shadow-[0_4px_0_#059669] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#059669] transition-all">Live <span className="material-symbols-outlined text-sm">open_in_new</span></a>}
                        <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] text-[var(--text-heading)] px-4 py-2 text-xs font-extrabold hover:border-[#10b981]/40 transition-colors">GitHub <span className="material-symbols-outlined text-sm">code</span></a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
