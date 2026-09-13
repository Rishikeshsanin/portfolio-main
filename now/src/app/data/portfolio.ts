export type PortfolioProject = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  status: string;
  stack: string[];
  proof: string[];
  repo: string;
  live?: string;
  featured?: boolean;
};

export const projects: PortfolioProject[] = [
  {
    slug: "skylark-command",
    name: "Skylark Command",
    eyebrow: "Decision intelligence · Agentic analytics",
    summary:
      "Trust-native executive decision intelligence over live CRM and operational data, with deterministic business analytics, bounded AI interpretation, historical change intelligence, Customer 360 and scenario analysis.",
    status: "Production / V2",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "GraphQL", "Gemini", "Supabase Auth"],
    proof: [
      "Deterministic analytics own business arithmetic while AI is constrained to typed planning and interpretation.",
      "Temporal PostgreSQL snapshots power change intelligence without fabricating historical baselines.",
      "Includes RBAC foundations, structured observability, evaluation tooling and evidence lineage.",
    ],
    repo: "https://github.com/Rishikeshsanin/skylark-command",
    live: "https://skylark-command.vercel.app",
    featured: true,
  },
  {
    slug: "vibify",
    name: "Vibify",
    eyebrow: "Realtime systems · Shared listening",
    summary:
      "A realtime shared-listening room that keeps phones and laptops aligned to one authoritative YouTube playback timeline without rebroadcasting audio through the app.",
    status: "V1 shipped · V2 active",
    stack: ["Next.js", "TypeScript", "Firebase", "YouTube API", "React", "Vercel"],
    proof: [
      "Synchronizes compact room state rather than transferring audio between devices.",
      "Uses Firebase server time, versioned playback commands, presence and drift reporting.",
      "Separates host authority, anonymous guest identity and local YouTube playback.",
    ],
    repo: "https://github.com/Rishikeshsanin/vibify",
    live: "https://vibify-mu.vercel.app",
    featured: true,
  },
  {
    slug: "imposter-x",
    name: "Imposter X",
    eyebrow: "Realtime multiplayer · Voice / video",
    summary:
      "A social-deduction party game with server-authoritative game state, room modes for local and remote play, integrated low-latency voice/video, voting, chat, reactions and multi-round scoring.",
    status: "Live",
    stack: ["JavaScript", "Supabase", "PostgreSQL", "LiveKit", "WebRTC", "Vercel"],
    proof: [
      "Supabase RPCs and RLS protect room lifecycle, roles, voting, timers and scoring.",
      "LiveKit adds short-lived authenticated media sessions for remote rooms.",
      "Supports 3–12 players with separate same-room and remote-room interaction models.",
    ],
    repo: "https://github.com/Rishikeshsanin/Imposter-X",
    live: "https://imposter-x.vercel.app",
    featured: true,
  },
  {
    slug: "nocodeml",
    name: "NoCodeML",
    eyebrow: "ML platform · Backend engineering",
    summary:
      "A guest-first AutoML workspace for uploading data, exploring ML readiness, training and comparing models, predicting, exporting results and automatically deleting temporary visitor workspaces.",
    status: "V3 production source",
    stack: ["React", "TypeScript", "FastAPI", "scikit-learn", "XGBoost", "LightGBM", "Docker"],
    proof: [
      "Privacy-by-lifecycle session isolation with hashed temporary workspaces and automatic cleanup.",
      "Correct fitted preprocessing pipelines are reused during inference, including unseen categorical values.",
      "CI covers classification, regression, prediction, exports, Docker runtime and deployment validation.",
    ],
    repo: "https://github.com/Rishikeshsanin/NoCodeML",
    featured: true,
  },
  {
    slug: "auralis-music",
    name: "Auralis",
    eyebrow: "Music platform · Multi-provider architecture",
    summary:
      "A multi-provider music product that separates discovery, metadata and playback while combining full-song playback, live radio, playlists, provider health and artwork-driven Aura Mode behind one interface.",
    status: "v10.2 shipped",
    stack: ["JavaScript", "Vercel Functions", "YouTube API", "Audius", "Jamendo", "Deezer", "hls.js"],
    proof: [
      "Coordinates multiple playback engines so only one source owns audible output at a time.",
      "Uses legitimate provider-specific playback semantics and clearly distinguishes previews from full playback.",
      "Maintains a layered regression suite and release history focused on playback, artwork and performance stability.",
    ],
    repo: "https://github.com/Rishikeshsanin/auralis-music",
    live: "https://auralis-music-lime.vercel.app",
    featured: true,
  },
  {
    slug: "echotype",
    name: "EchoType",
    eyebrow: "Offline AI · Desktop productivity",
    summary:
      "A privacy-first desktop dictation product being redesigned around local speech recognition, multilingual Indian-language support, push-to-talk workflows, transcript cleanup and system-wide text injection.",
    status: "Active V2 development",
    stack: ["Python", "PySide6", "Qt", "Local ASR", "CUDA", "Desktop services"],
    proof: [
      "Designed to keep normal dictation local after the speech model is available.",
      "Separates UI, speech-processing core, desktop services and storage for safer evolution.",
      "Targets native packaging, CI, benchmarks, local history controls and multilingual/code-switched dictation.",
    ],
    repo: "https://github.com/Rishikeshsanin/EchoType",
  },
  {
    slug: "sociodrift",
    name: "Socio Drift",
    eyebrow: "Generative AI · Music research",
    summary:
      "An AI-powered music-generation platform concept for creating original jingles, theme music and sonic identities from prompts with configurable mood, genre, tempo and instruments.",
    status: "Research / startup project",
    stack: ["Python", "TensorFlow", "LSTM", "Transformers", "Gemini API"],
    proof: [
      "Explores prompt-conditioned music generation across model-driven and API-assisted workflows.",
      "Designed around configurable musical attributes rather than one fixed generation style.",
      "Presented as part of the Mew Thetis startup work at Karnataka Elevate 2025.",
    ],
    repo: "https://github.com/Rishikeshsanin/SocioDrift",
  },
];

export const capabilityGroups = [
  {
    title: "Languages",
    items: ["Java", "Python", "TypeScript / JavaScript", "SQL", "C++"],
  },
  {
    title: "Backend & data",
    items: ["FastAPI", "REST APIs", "PostgreSQL", "Supabase", "Firebase", "GraphQL"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Responsive product UI"],
  },
  {
    title: "AI / ML",
    items: ["scikit-learn", "XGBoost", "LightGBM", "LLM integration", "AI agents", "ML pipelines"],
  },
  {
    title: "Realtime & media",
    items: ["Firebase Realtime Database", "LiveKit", "WebRTC", "YouTube IFrame API", "Presence / sync"],
  },
  {
    title: "Engineering",
    items: ["Git / GitHub", "Docker", "GitHub Actions", "Vercel", "Testing", "Observability", "CI/CD"],
  },
];

export const experience = [
  {
    period: "May 2026 — July 2026",
    role: "Assistant Teaching Faculty Intern",
    company: "RICON Technologies · Nellore",
    description:
      "Supported C and Python theory and lab sessions, prepared and tested programming exercises, and mentored students through debugging and core programming concepts.",
  },
  {
    period: "June 2024 — July 2024",
    role: "Cybersecurity Intern",
    company: "Dhee Data Center",
    description:
      "Built a Python malware-detection workflow using static features, preprocessing and feature engineering, then evaluated Random Forest, SVM and XGBoost models.",
  },
  {
    period: "2025",
    role: "Co-Founder",
    company: "Mew Thetis",
    description:
      "Presented Socio Drift, an AI-powered music-generation platform, as a Karnataka Elevate 2025 finalist for government startup funding.",
  },
];
