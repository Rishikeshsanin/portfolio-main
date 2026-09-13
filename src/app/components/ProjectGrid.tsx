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
  preview?: string;
  secondaryPreview?: string;
  visual?: "echotype" | "sociodrift";
};

type CardVariant = "compact" | "feature" | "showcase" | "visual";

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
    preview: "https://raw.githubusercontent.com/Rishikeshsanin/skylark-command/main/Screenshots/Screenshot%20(57).png",
    secondaryPreview: "https://raw.githubusercontent.com/Rishikeshsanin/skylark-command/main/Screenshots/Screenshot%20(60).png",
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
    preview: "https://image.thum.io/get/width/1200/crop/720/noanimate/https://vibify-mu.vercel.app",
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
    preview: "https://image.thum.io/get/width/1200/crop/720/noanimate/https://imposter-x.vercel.app",
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
    preview: "https://raw.githubusercontent.com/Rishikeshsanin/NoCodeML/main/screenshots/landing-page.png",
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
    preview: "https://image.thum.io/get/width/1200/crop/720/noanimate/https://auralis-music-lime.vercel.app",
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
    visual: "echotype",
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
    visual: "sociodrift",
  },
];

const byKey = Object.fromEntries(projects.map((project) => [project.key, project])) as Record<string, Project>;

function FallbackVisual({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_20%_15%,rgba(16,185,129,0.28),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.46),rgba(16,185,129,0.08))]">
      <div className="text-center">
        <span className="material-symbols-outlined text-5xl text-[#10b981]">{project.icon}</span>
        <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--text-secondary)]">{project.name} preview</p>
      </div>
    </div>
  );
}

function Screenshot({ project, src, className = "" }: { project: Project; src: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return <FallbackVisual project={project} />;

  return (
    <img
      src={src}
      alt={`${project.name} product screenshot`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover object-top ${className}`}
    />
  );
}

function ProductVisual({ project, tall = false }: { project: Project; tall?: boolean }) {
  if (project.visual === "echotype") {
    return (
      <div className={`${tall ? "h-[300px]" : "h-[230px]"} relative overflow-hidden rounded-[1.45rem] border border-[var(--site-border)] bg-[linear-gradient(145deg,rgba(7,20,39,0.94),rgba(11,46,53,0.91))] p-5 shadow-inner`}>
        <div className="flex items-center justify-between text-emerald-100/80 text-[10px] uppercase tracking-[0.18em] font-bold">
          <span>EchoType · Local</span><span>Listening</span>
        </div>
        <div className="mt-7 flex h-16 items-center justify-center gap-1.5">
          {[14, 29, 42, 24, 55, 72, 38, 61, 31, 76, 49, 27, 58, 35, 18].map((height, index) => (
            <span key={index} className="w-2 rounded-full bg-emerald-300/90" style={{ height }} />
          ))}
        </div>
        <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-left">
          <p className="text-[10px] uppercase tracking-[0.15em] text-emerald-300 font-bold">Live transcript</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-100">“Turn speech into clean text locally, then type it wherever I am working.”</p>
        </div>
        <span className="absolute bottom-4 right-5 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-200">Product visual</span>
      </div>
    );
  }

  if (project.visual === "sociodrift") {
    return (
      <div className={`${tall ? "h-[300px]" : "h-[230px]"} relative overflow-hidden rounded-[1.45rem] border border-[var(--site-border)] bg-[linear-gradient(145deg,rgba(250,255,252,0.84),rgba(167,243,208,0.44))] p-5`}>
        <div className="flex items-center justify-between">
          <p className="font-doto text-xl font-black text-[#064e3b]">SocioDrift</p>
          <span className="rounded-full bg-[#10b981] px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-white">Generate</span>
        </div>
        <div className="mt-5 rounded-2xl border border-emerald-900/10 bg-white/55 p-4 text-left shadow-sm">
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#047857]">Prompt</p>
          <p className="mt-1.5 text-sm font-semibold text-[#064e3b]">Cinematic futuristic jingle · hopeful · 118 BPM</p>
        </div>
        <div className="mt-5 flex h-14 items-end gap-1">
          {[24, 44, 31, 57, 38, 49, 64, 28, 52, 36, 67, 42, 25, 55, 34, 61, 46, 30, 50, 39].map((height, index) => (
            <span key={index} className="flex-1 rounded-t-sm bg-[#10b981]/75" style={{ height: `${height}%` }} />
          ))}
        </div>
        <span className="absolute bottom-4 right-5 rounded-full border border-emerald-900/10 bg-white/55 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#047857]">Concept visual</span>
      </div>
    );
  }

  if (!project.preview) return <div className={`${tall ? "h-[300px]" : "h-[220px]"} relative rounded-[1.45rem] overflow-hidden`}><FallbackVisual project={project} /></div>;

  return (
    <div className={`${tall ? "h-[315px]" : "h-[225px]"} relative overflow-hidden rounded-[1.45rem] border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] shadow-[0_14px_34px_rgba(6,95,70,0.12)]`}>
      <div className="absolute inset-x-0 top-0 z-10 h-8 border-b border-black/5 bg-white/70 backdrop-blur-md flex items-center gap-1.5 px-3">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-[8px] font-bold uppercase tracking-[0.12em] text-[#065f46]/65">{project.name}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 top-8">
        <Screenshot project={project} src={project.preview} />
      </div>
    </div>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        ["Domain", project.domain],
        ["Role", project.role],
        ["Status", project.status],
      ].map(([label, value]) => (
        <div key={label} className="rounded-xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-3 py-2.5">
          <p className="text-[9px] uppercase tracking-[0.12em] text-[#10b981] font-black">{label}</p>
          <p className="mt-1 text-[10px] md:text-[11px] font-bold text-[var(--text-card)] line-clamp-2">{value}</p>
        </div>
      ))}
    </div>
  );
}

function Actions({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3">
      {project.live ? (
        <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#10b981] px-4 py-2 text-xs font-extrabold text-white shadow-[0_4px_0_#059669] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_#059669]">
          Live <span className="material-symbols-outlined text-sm">open_in_new</span>
        </a>
      ) : null}
      <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-4 py-2 text-xs font-extrabold text-[var(--text-heading)] transition-colors hover:border-[#10b981]/50">
        GitHub <span className="material-symbols-outlined text-sm">code</span>
      </a>
    </div>
  );
}

function ProjectCard({
  project,
  variant,
  open,
  onToggle,
  className = "",
}: {
  project: Project;
  variant: CardVariant;
  open: boolean;
  onToggle: () => void;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const alwaysShowVisual = variant !== "compact";
  const isFeature = variant === "feature";

  return (
    <motion.article
      layout={!reduceMotion ? "position" : false}
      className={`self-start relative overflow-hidden rounded-[2rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-2xl shadow-[0_18px_52px_rgba(6,95,70,0.09)] transition-[border-color,box-shadow] duration-300 hover:border-[#10b981]/35 hover:shadow-[0_24px_70px_rgba(6,95,70,0.14)] ${className}`}
    >
      <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[#10b981]/10 blur-3xl" />
      <div className="relative p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[#10b981]/25 bg-[#10b981]/10 shadow-[0_8px_24px_rgba(16,185,129,0.10)]">
              <span className="material-symbols-outlined text-[#10b981]">{project.icon}</span>
            </div>
            <div className="min-w-0">
              <h2 className={`${isFeature ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} truncate font-black tracking-tight text-[var(--text-heading)]`}>{project.name}</h2>
              <p className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[0.13em] font-extrabold text-[#10b981]">{project.badge}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggle}
            aria-label={`${open ? "Collapse" : "Expand"} ${project.name}`}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#10b981]/60 bg-[#10b981] text-white shadow-[0_8px_20px_rgba(16,185,129,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#059669]"
          >
            <span className="material-symbols-outlined text-base">{open ? "expand_less" : "expand_more"}</span>
          </button>
        </div>

        <p className="mt-4 text-sm md:text-base leading-relaxed font-medium text-[var(--text-secondary)]">{project.short}</p>

        {alwaysShowVisual ? <div className="mt-5"><ProductVisual project={project} tall={isFeature} /></div> : null}

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              {!alwaysShowVisual ? <div className="mt-5"><ProductVisual project={project} /></div> : null}

              {isFeature && project.secondaryPreview ? (
                <div className="mt-5 grid grid-cols-[1.3fr_.7fr] gap-3">
                  <div className="relative h-36 overflow-hidden rounded-2xl border border-[var(--site-border)] bg-[var(--site-card-bg-strong)]">
                    <Screenshot project={project} src={project.secondaryPreview} />
                  </div>
                  <div className="rounded-2xl border border-[#10b981]/20 bg-[#10b981]/8 p-4 flex flex-col justify-between">
                    <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#10b981]">Built for decisions</p>
                    <p className="text-sm font-bold leading-snug text-[var(--text-heading)]">Evidence-backed answers instead of AI guessing business arithmetic.</p>
                  </div>
                </div>
              ) : null}

              <p className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)] font-medium">{project.description}</p>
              <div className="mt-5"><Meta project={project} /></div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="rounded-full border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-2.5 py-1 text-[10px] md:text-xs font-semibold text-[#10b981]">{tech}</span>
                ))}
              </div>
              <div className="mt-6"><Actions project={project} /></div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function ProjectGrid() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ skylark: true });

  const toggle = (key: string) => {
    setExpanded((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <section className="w-full max-w-[1480px] mx-auto px-5 md:px-10 lg:px-14 pb-28 pt-5">
      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 md:mb-12">
        <p className="text-[11px] tracking-[0.18em] uppercase font-extrabold text-[#10b981]">Selected Engineering Work</p>
        <h1 className="mt-4 text-4xl sm:text-5xl md:text-7xl font-extrabold font-doto text-[var(--text-heading)] tracking-tight leading-[0.95]">
          Things I Actually Built<span className="rubber-spin-dot inline-flex text-[#10b981] ml-1">+</span>
        </h1>
        <p className="mt-5 max-w-3xl mx-auto text-base md:text-lg font-medium text-[var(--text-secondary)]">
          Different products deserve different presentations. Open any card for the engineering story, stack and links.
        </p>
      </motion.div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 grid gap-6 items-start self-start">
            <ProjectCard project={byKey.vibify} variant="compact" open={!!expanded.vibify} onToggle={() => toggle("vibify")} />
            <ProjectCard project={byKey.imposter} variant="compact" open={!!expanded.imposter} onToggle={() => toggle("imposter")} />
          </div>
          <ProjectCard project={byKey.skylark} variant="feature" open={!!expanded.skylark} onToggle={() => toggle("skylark")} className="lg:col-span-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <ProjectCard project={byKey.nocodeml} variant="showcase" open={!!expanded.nocodeml} onToggle={() => toggle("nocodeml")} className="lg:col-span-7" />
          <ProjectCard project={byKey.auralis} variant="showcase" open={!!expanded.auralis} onToggle={() => toggle("auralis")} className="lg:col-span-5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <ProjectCard project={byKey.echotype} variant="visual" open={!!expanded.echotype} onToggle={() => toggle("echotype")} />
          <ProjectCard project={byKey.sociodrift} variant="visual" open={!!expanded.sociodrift} onToggle={() => toggle("sociodrift")} />
        </div>
      </div>
    </section>
  );
}
