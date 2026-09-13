"use client";
import { useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import aetherShot from '../assets/imgs/aether.jpeg';
import calgpaShot from '../assets/imgs/calgpa.jpeg';
import zephraShot from '../assets/imgs/zephra.jpeg';
import minimindsShot from '../assets/imgs/miniminds.jpeg';
import carsioShot from '../assets/imgs/cario.jpeg';
import roledocShot from '../assets/imgs/roledoc.jpeg';
import textotestShot from '../assets/imgs/textotest.jpeg';

type PhoneMockupProps = {
  screenshotSrc?: string | StaticImageData;
  alt: string;
  accentClassName: string;
  topVisibleImageOnly?: boolean;
  imageClassName?: string;
  topGapPx?: number;
  frameClassName?: string;
};

type ProjectKey = 'calgpa' | 'zephra' | 'aether' | 'miniminds' | 'carsio' | 'roledoc' | 'textotest';

type BracketButtonProps = {
  onClick: () => void;
  label: string;
  inverse?: boolean;
  className?: string;
  iconClassName?: string;
};

type PopupProject = {
  name: string;
  description: string;
  workedOn: string;
  domain: string;
  role: string;
  stack: string[];
  repoUrl: string;
  liveUrl: string;
};

type ProjectRating = {
  count: number;
  average: number;
  starCounts: number[];
};

function createEmptyRatings(): Record<ProjectKey, ProjectRating> {
  return {
    calgpa: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
    zephra: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
    aether: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
    miniminds: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
    carsio: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
    roledoc: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
    textotest: { count: 0, average: 0, starCounts: [0, 0, 0, 0] },
  };
}


function BracketButton({ onClick, label, inverse = false, className = '', iconClassName = '' }: BracketButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-8 right-8 z-20 h-10 w-10 rounded-xl border backdrop-blur-md shadow-[0_10px_24px_rgba(6,95,70,0.14)] flex items-center justify-center transition-colors ${
        inverse
          ? 'border-white/80 bg-white text-emerald-800 hover:bg-emerald-50'
          : 'border-[#10b981]/80 bg-[#10b981] text-white hover:bg-[#059669]'
      } ${className}`}
    >
      <span className={`material-symbols-outlined text-[0.95rem] leading-none ${iconClassName}`} aria-hidden="true">open_in_new</span>
    </button>
  );
}

function PhoneMockup({ screenshotSrc, alt, accentClassName, topVisibleImageOnly = false, imageClassName = '', topGapPx = 0, frameClassName = '' }: PhoneMockupProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#f0fdf4] rounded-[2.1rem] ${frameClassName}`}>
      {screenshotSrc ? (
        topVisibleImageOnly ? (
          <div className="h-full w-full flex flex-col">
            <div className="relative h-[90%] w-full overflow-hidden">
              <Image src={screenshotSrc} alt={alt} fill className={`object-cover object-top ${imageClassName}`} sizes="(max-width: 768px) 90vw, 370px" />
            </div>
            <div className="h-[10%] w-full bg-gradient-to-b from-[#0f172a]/28 to-[#0f172a]/55" />
          </div>
        ) : (
          <>
            <Image src={screenshotSrc} alt={alt} fill className={`object-cover ${imageClassName}`} sizes="(max-width: 768px) 90vw, 370px" />
            {topGapPx > 0 ? <div className="absolute inset-x-0 top-0 z-10 bg-[#f0fdf4]" style={{ height: `${topGapPx}px` }} /> : null}
          </>
        )
      ) : (
        <div className={`h-full w-full ${accentClassName} p-3 text-white`}>
          <div className="h-full w-full rounded-[1.35rem] bg-white/18 backdrop-blur-[1px] border border-white/30 p-3 flex flex-col gap-2.5">
            <div className="h-4 w-2/3 rounded-full bg-white/70" />
            <div className="h-16 rounded-xl bg-white/80" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-10 rounded-lg bg-white/70" />
              <div className="h-10 rounded-lg bg-white/55" />
            </div>
            <div className="h-3 w-5/6 rounded-full bg-white/70" />
            <div className="h-3 w-4/6 rounded-full bg-white/55" />
            <div className="mt-auto grid grid-cols-3 gap-2">
              <div className="h-8 rounded-lg bg-white/80" />
              <div className="h-8 rounded-lg bg-white/60" />
              <div className="h-8 rounded-lg bg-white/70" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectGrid() {
  const [activeProject, setActiveProject] = useState<ProjectKey | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [ratings, setRatings] = useState<Record<ProjectKey, ProjectRating>>(createEmptyRatings);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!activeProject) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeProject]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const syncMobile = () => setIsMobile(media.matches);
    syncMobile();

    media.addEventListener("change", syncMobile);
    return () => media.removeEventListener("change", syncMobile);
  }, []);

  useEffect(() => {
    let stopped = false;

    const fetchRatings = async () => {
      try {
        const response = await fetch('/api/project-ratings', { cache: 'no-store' });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { ratings?: Partial<Record<ProjectKey, ProjectRating>> };
        if (!stopped && data.ratings) {
          setRatings((prev) => ({ ...prev, ...data.ratings }));
        }
      } catch {
        // Ignore transient network errors.
      }
    };

    fetchRatings();
    const intervalId = window.setInterval(fetchRatings, 14000);

    return () => {
      stopped = true;
      window.clearInterval(intervalId);
    };
  }, []);

  const submitRating = async (projectKey: ProjectKey, stars: number) => {
    if (isSubmittingRating) {
      return;
    }

    setIsSubmittingRating(true);
    try {
      const response = await fetch('/api/project-ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectKey, stars }),
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as { ratings?: Partial<Record<ProjectKey, ProjectRating>> };
      if (data.ratings) {
        setRatings((prev) => ({ ...prev, ...data.ratings }));
      }
    } catch {
      // Ignore submit errors to keep popup interactions smooth.
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const renderRatingSummary = (projectKey: ProjectKey, compact = false) => {
    const stats = ratings[projectKey] ?? { count: 0, average: 0, starCounts: [0, 0, 0, 0] };
    const filledStars = Math.round(stats.average);

    return (
      <div className={`mt-2 flex items-center gap-2 ${compact ? 'text-[11px]' : 'text-sm'}`}>
        <span className="inline-flex gap-[2px] text-[#10b981]">
          {[0, 1, 2, 3].map((star) => (
            <span key={star}>{star < filledStars ? '★' : '☆'}</span>
          ))}
        </span>
        <span className="font-semibold text-emerald-900/80">
          {stats.count > 0 ? `${stats.average.toFixed(1)} (${stats.count})` : 'No ratings yet'}
        </span>
      </div>
    );
  };

  const ratingChoices = [
    { stars: 1, label: 'Poor', className: 'border-emerald-300/85 bg-emerald-400 text-white' },
    { stars: 2, label: 'Fair', className: 'border-emerald-400/85 bg-emerald-500 text-white' },
    { stars: 3, label: 'Good', className: 'border-emerald-500/85 bg-emerald-600 text-white' },
    { stars: 4, label: 'Great', className: 'border-emerald-600/90 bg-emerald-700 text-white' },
  ] as const;

  const screenshots = {
    calgpa: calgpaShot,
    zephra: zephraShot,
    aether: aetherShot,
    miniminds: minimindsShot,
    carsio: carsioShot,
    roledoc: roledocShot,
    textotest: textotestShot,
  };

  const popupProjects: Record<ProjectKey, PopupProject> = {
    calgpa: {
      name: 'CalGPA',
      description:
        'CalGPA gives students a fast performance cockpit to track coursework, simulate grade outcomes, and plan future semesters with confidence.',
      workedOn: '2025',
      domain: 'EdTech Productivity',
      role: 'Full Stack Developer',
      stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PWA'],
      repoUrl: 'https://github.com/your-username/calgpa',
      liveUrl: 'https://your-calgpa-app-url.com',
    },
    zephra: {
      name: 'Zephra',
      description:
        'Zephra blends satellite and ground sensing into clear, actionable air-quality intelligence with an interface designed for quick comprehension.',
      workedOn: '2025',
      domain: 'Climate Intelligence',
      role: 'Frontend + Data UX Developer',
      stack: ['Next.js', 'TypeScript', 'Framer Motion', 'Visualization APIs'],
      repoUrl: 'https://github.com/your-username/zephra',
      liveUrl: 'https://your-zephra-app-url.com',
    },
    aether: {
      name: 'Aether',
      description:
        'Aether combines journaling, habits, and emotional analytics into a single adaptive loop with AI-assisted behavior support.',
      workedOn: '2026',
      domain: 'AI Companion / Wellness',
      role: 'Product Engineer',
      stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AI Workflows'],
      repoUrl: 'https://github.com/your-username/aether',
      liveUrl: 'https://your-aether-app-url.com',
    },
    miniminds: {
      name: 'Mini-Minds',
      description: 'A playful learning platform concept for children with mini exercises, levels, and progress rewards.',
      workedOn: '2024',
      domain: 'Kids E-Learning',
      role: 'Frontend Developer',
      stack: ['React', 'TypeScript', 'Tailwind CSS'],
      repoUrl: 'https://github.com/your-username/miniminds',
      liveUrl: 'https://your-miniminds-app-url.com',
    },
    carsio: {
      name: 'Cars.IO',
      description: 'A SQL-based retail database system that tracks car inventory, purchases, and sales records.',
      workedOn: '2024',
      domain: 'Retail Data Systems',
      role: 'Database Developer',
      stack: ['SQL', 'Database Design', 'DBMS'],
      repoUrl: 'https://github.com/your-username/cars-io',
      liveUrl: 'https://your-cars-io-demo-url.com',
    },
    roledoc: {
      name: 'RoleDoc',
      description: 'A document-chat assistant that reads uploaded files and responds with role-aware, context-smart answers.',
      workedOn: '2025',
      domain: 'AI Knowledge Assistant',
      role: 'AI Engineer',
      stack: ['RAG', 'LLM APIs', 'Next.js'],
      repoUrl: 'https://github.com/your-username/roledoc',
      liveUrl: 'https://your-roledoc-app-url.com',
    },
    textotest: {
      name: 'TexToTest',
      description: 'An AI-powered question generator that creates context-aware MCQs from source content for faster practice workflows.',
      workedOn: '2026',
      domain: 'AI Assessment',
      role: 'AI Product Developer',
      stack: ['Next.js', 'TypeScript', 'LLM APIs', 'Prompt Engineering'],
      repoUrl: 'https://github.com/your-username/textotest',
      liveUrl: 'https://your-textotest-app-url.com',
    },
  };

  const selectedProject = activeProject ? popupProjects[activeProject] : null;
  const selectedScreenshot = activeProject ? screenshots[activeProject] : undefined;

  return (
    <section id="projects" className="px-6 md:px-12 w-full max-w-7xl mx-auto scroll-mt-28">
      <div className="text-center mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-headline font-doto text-[#064e3f] mb-6">
          Projects Made<span className="font-doto text-4xl sm:text-5xl md:text-7xl font-extrabold rubber-spin-dot inline-flex items-center justify-center w-[1em] h-[1em] leading-none align-middle">+</span>
        </h2>
        <p className="text-xl text-[#064e3b]/80 font-medium">Real projects I built to solve real problems, with design and engineering working together.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        {/* Card 1 */}
        <motion.div
          id="calgpa"
          initial={reduceMotion ? false : { opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.42 }}
          className="rounded-[3rem] border border-white/60 bg-white/34 backdrop-blur-lg p-10 md:p-12 transition-all duration-300 hover:-translate-y-2 group flex flex-col h-[550px] overflow-hidden relative shadow-[0_20px_60px_rgba(16,185,129,0.14)] scroll-mt-28 cursor-pointer"
          onClick={() => setActiveProject('calgpa')}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setActiveProject('calgpa');
            }
          }}
        >
            <BracketButton onClick={() => setActiveProject('calgpa')} label="Open CalGPA project details popup" />
          <div className="flex flex-col relative z-10 w-full mb-10 text-center items-center">
            <h3 className="text-4xl font-extrabold font-doto text-[#064e3f] mb-5">CalGPA</h3>
            {renderRatingSummary('calgpa')}
            <p className="text-[#10b981] font-bold text-sm tracking-widest uppercase bg-[#10b981]/10 px-4 py-1.5 rounded-full mt-3">Academic Tool • PWA</p><br />
            <p className="text-[#10b981] text-xl font-medium mb-12 max-w-md leading-relaxed">CalGPA is a web app designed to help uni students analyze and check their semester performance</p>

          </div>
          <div className="mt-auto relative overflow-hidden aspect-[9/42] w-[90%] md:w-[84%] max-w-none md:max-w-[370px] mx-auto -mb-[30%] rounded-[2.5rem] border-[10px] border-white shadow-[0_34px_52px_rgba(6,78,59,0.32)] transition-transform duration-500 md:group-hover:-translate-y-4 bg-[#0f172a]/20">
            <PhoneMockup screenshotSrc={screenshots.calgpa || undefined} alt="CalGPA mobile preview" accentClassName="bg-gradient-to-b from-[#34d399] to-[#059669]" topVisibleImageOnly />
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          id="zephra"
          initial={reduceMotion ? false : { opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.42, delay: 0.07 }}
          className="rounded-[3rem] border border-white/60 bg-white/34 backdrop-blur-lg p-10 md:p-12 transition-all duration-300 hover:-translate-y-2 group flex flex-col h-[550px] overflow-hidden relative shadow-[0_20px_60px_rgba(16,185,129,0.14)] scroll-mt-28 cursor-pointer"
          onClick={() => setActiveProject('zephra')}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setActiveProject('zephra');
            }
          }}
        >
            <BracketButton onClick={() => setActiveProject('zephra')} label="Open Zephra project details popup" />
          <div className="flex flex-col relative z-10 w-full mb-10 text-center items-center">
            <h3 className="text-4xl font-extrabold font-doto text-[#064e3f] mb-5">Zephra</h3>
            {renderRatingSummary('zephra')}
            <p className="text-[#059669] font-bold text-sm tracking-widest uppercase bg-[#059669]/10 px-4 py-1.5 rounded-full mt-3 mb-4">Climate Tracking • PWA</p>
            <p className="text-[#10b981] text-xl font-medium mb-12 max-w-md leading-relaxed">A web app that merges NASA TEMPO satellite data with ground-based monitoring to provide real-time air quality forecasts.</p>
          </div>
          <div className="mt-auto relative overflow-hidden aspect-[9/42] w-[90%] md:w-[84%] max-w-none md:max-w-[370px] mx-auto -mb-[30%] rounded-[2.5rem] border-[10px] border-white shadow-[0_34px_52px_rgba(6,78,59,0.32)] transition-transform duration-500 md:group-hover:-translate-y-4 bg-[#0f172a]/20">
            <PhoneMockup screenshotSrc={screenshots.zephra || undefined} alt="Zephra mobile preview" accentClassName="bg-gradient-to-b from-[#6ee7b7] to-[#10b981]" topVisibleImageOnly />
          </div>
        </motion.div>
      </div>

      {/* Featured Big Card */}
      <motion.div
        id="aether"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.985, y: 28 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.45 }}
        className="relative rounded-[4rem] border border-[#d1fae5]/55 bg-[#10b981]/44 backdrop-blur-lg p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 shadow-[0_20px_60px_rgba(16,185,129,0.24)] overflow-hidden scroll-mt-28 cursor-pointer"
        onClick={() => setActiveProject('aether')}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setActiveProject('aether');
          }
        }}
      >
        <BracketButton onClick={() => setActiveProject('aether')} label="Open Aether project details popup" inverse />
        <div className="md:w-1/2 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/60 bg-white/72 text-[12px] font-extrabold font-doto text-[#059669] mb-8 uppercase tracking-widest shadow-sm backdrop-blur-sm">FEATURED APP</span>
          <h3 className="text-5xl md:text-[4.5rem] font-extrabold font-doto text-white mb-6 leading-none">Aether.</h3>
          <div className="text-white/95">{renderRatingSummary('aether')}</div>
          <p className="text-[#a7f3d0] text-xl font-medium mb-12 max-w-md leading-relaxed mt-3">A virtual pet system that integrates journaling, habit tracking, emotional analytics, and autonomous AI behavior..</p>
        </div>
        <div className="md:w-1/2 relative w-full flex justify-center z-10">
          <div className="w-[90%] sm:w-[76%] md:w-[56%] max-w-none md:max-w-[260px] aspect-[9/19] rounded-[2.7rem] border-[10px] border-white shadow-[0_38px_56px_rgba(6,78,59,0.34)] rotate-[-4deg] hover:rotate-0 transition-transform duration-500 overflow-hidden">
            <PhoneMockup screenshotSrc={screenshots.aether || undefined} alt="Aether mobile preview" accentClassName="bg-gradient-to-b from-[#10b981] to-[#047857]" imageClassName="scale-[1.02]" topGapPx={2} />
          </div>
        </div>

        {/* Giant background blob */}
        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[160%] bg-[#059669] rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
      </motion.div>

      <div className="mt-10 mb-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {[
          {
            key: 'miniminds' as const,
            name: 'Mini-Minds',
            short: 'Fun e-learning with levels and mini exercises.',
            badge: 'E-Learning Prototype',
            accentClassName: 'bg-gradient-to-b from-[#6ee7b7] to-[#10b981]',
          },
          {
            key: 'carsio' as const,
            name: 'Cars.IO',
            short: 'SQL retail DB for car sales and purchases.',
            badge: 'DBMS • SQL',
            accentClassName: 'bg-gradient-to-b from-[#34d399] to-[#059669]',
          },
          {
            key: 'roledoc' as const,
            name: 'RoleDoc',
            short: 'RAG chatbot that talks with your documents.',
            badge: 'AI RAG Assistant',
            accentClassName: 'bg-gradient-to-b from-[#10b981] to-[#047857]',
          },
          {
            key: 'textotest' as const,
            name: 'TexToTest',
            short: ' Context based advanced MCQ generation',
            badge: 'AI MCQ Generation',
            accentClassName: 'bg-gradient-to-b from-[#86efac] to-[#10b981]',
          },
        ].map((item, index) => (
          <motion.div
            id={item.key}
            key={item.name}
            initial={reduceMotion ? false : (isMobile ? { opacity: 0, x: index % 2 === 0 ? -34 : 34, y: 0 } : { opacity: 0, y: 20 })}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.36, ease: "easeOut", delay: isMobile ? index * 0.05 : 0 }}
            className="relative rounded-[2.25rem] border border-white/60 bg-white/36 backdrop-blur-lg p-6 md:p-7 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col min-h-[430px] shadow-[0_20px_60px_rgba(16,185,129,0.14)] scroll-mt-28 overflow-hidden cursor-pointer"
            onClick={() => setActiveProject(item.key)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveProject(item.key);
              }
            }}
          >
            <BracketButton
              onClick={() => setActiveProject(item.key)}
              label={`Open ${item.name} project details popup`}
              className="top-3 right-3 h-8 w-8 rounded-lg"
              iconClassName="text-[0.72rem]"
            />
            <div className="flex flex-col relative z-10 w-full h-full text-left pr-9">
              <p className="inline-flex w-fit text-[#10b981] font-bold text-[10px] tracking-[0.14em] uppercase bg-[#10b981]/10 px-3 py-1.5 rounded-full">{item.badge}</p>
              <h4 className="mt-4 text-[1.45rem] font-extrabold font-doto text-[#064e3f] leading-tight">{item.name}</h4>
              {renderRatingSummary(item.key, true)}
              <p className="mt-2 text-[0.95rem] leading-relaxed text-[#064e3b]/80 font-medium">{item.short}</p>
            </div>

            <div className="pointer-events-none absolute left-1/2 bottom-[-85%] md:bottom-[-85%] -translate-x-1/2 overflow-hidden aspect-[9/20] w-[62%] md:w-[83%] rounded-[1.5rem] md:rounded-[2rem] border-[6px] md:border-[8px] border-white shadow-[0_14px_22px_rgba(6,78,59,0.26)] bg-[#0f172a]/18 transition-transform duration-500 md:group-hover:-translate-y-4">
              <PhoneMockup
                screenshotSrc={screenshots[item.key]}
                alt={`${item.name} mini mobile preview`}
                accentClassName={item.accentClassName}
                frameClassName="rounded-none"
                imageClassName="object-cover object-top scale-[1.02]"
              />
            </div>
          </motion.div>
        ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-[#052e24]/28 backdrop-blur-[2px] px-2 pb-24 pt-20 md:px-8 md:pb-8 md:pt-24"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.99 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="relative h-full w-full md:mx-auto md:h-[82vh] md:max-w-6xl overflow-hidden rounded-[2rem] border border-white/90 bg-white/76 backdrop-blur-md shadow-[0_24px_58px_rgba(6,78,59,0.14)]"
            >
              <div className="pointer-events-none absolute -top-20 right-6 h-36 w-36 rounded-full bg-[#10b981]/8 blur-3xl" />
              <div className="h-full overflow-y-auto p-4 md:p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="pr-2">
                    <p className="text-[10px] tracking-[0.16em] uppercase text-emerald-800/70 font-bold">Project Spotlight</p>
                    <h3 className="mt-1 text-2xl md:text-3xl font-black font-doto text-emerald-950 leading-tight">{selectedProject.name}</h3>
                    <p className="mt-2 text-sm md:text-[15px] text-emerald-900/85 max-w-3xl leading-relaxed">{selectedProject.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveProject(null)}
                    className="h-10 w-10 rounded-xl border border-emerald-200 bg-white/90 text-emerald-900 hover:bg-white transition-colors shrink-0 inline-flex items-center justify-center"
                    aria-label="Close popup"
                  >
                    <span className="material-symbols-outlined text-[1.15rem] leading-none">close</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 md:gap-5">
                  <div className="rounded-[1.25rem] border border-white/80 bg-white/80 backdrop-blur-sm p-4 shadow-[0_10px_22px_rgba(15,23,42,0.08)]">
                    <div className="mx-auto relative overflow-hidden aspect-[9/19] w-[68%] sm:w-[46%] lg:w-full max-w-[210px] rounded-[1.45rem] border-[7px] border-white shadow-[0_18px_30px_rgba(6,78,59,0.2)] bg-[#0f172a]/20">
                      <PhoneMockup
                        screenshotSrc={selectedScreenshot}
                        alt={`${selectedProject.name} popup preview`}
                        accentClassName="bg-gradient-to-b from-[#34d399] to-[#059669]"
                        frameClassName="rounded-none"
                      />
                    </div>
                  </div>

                  <div className="rounded-[1.25rem] border border-white/80 bg-white/80 backdrop-blur-sm p-4 md:p-5 shadow-[0_10px_22px_rgba(15,23,42,0.08)]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2">
                        <p className="text-[10px] tracking-[0.12em] uppercase text-emerald-800/70 font-bold">Domain</p>
                        <p className="mt-0.5 text-sm font-bold text-emerald-950">{selectedProject.domain}</p>
                      </div>
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2">
                        <p className="text-[10px] tracking-[0.12em] uppercase text-emerald-800/70 font-bold">Community Rating</p>
                        {activeProject ? renderRatingSummary(activeProject, true) : null}
                      </div>
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2">
                        <p className="text-[10px] tracking-[0.12em] uppercase text-emerald-800/70 font-bold">Project Year</p>
                        <p className="mt-0.5 text-sm font-bold text-emerald-950">{selectedProject.workedOn}</p>
                      </div>
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2">
                        <p className="text-[10px] tracking-[0.12em] uppercase text-emerald-800/70 font-bold">Role</p>
                        <p className="mt-0.5 text-sm font-bold text-emerald-950 line-clamp-2">{selectedProject.role}</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-emerald-100 bg-white p-3">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-emerald-800/85 font-bold">Rate This Project</p>
                      <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {ratingChoices.map((entry) => (
                          <button
                            key={entry.stars}
                            type="button"
                            onClick={() => activeProject && submitRating(activeProject, entry.stars)}
                            disabled={isSubmittingRating}
                            className={`rounded-full border px-3 py-2 text-xs font-bold tracking-wide transition-all hover:-translate-y-0.5 disabled:opacity-65 ${entry.className}`}
                            aria-label={`Rate ${entry.stars} stars`}
                          >
                            {entry.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <h4 className="mt-4 text-[11px] tracking-[0.14em] uppercase font-bold font-doto text-emerald-900/80">Tech Stack</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-900/10 text-emerald-900 border border-emerald-700/15">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={selectedProject.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-2xl border border-emerald-700/20 bg-white px-4 py-3 text-center font-semibold text-emerald-900 hover:bg-emerald-50 transition-colors"
                      >
                        Open Repository
                      </a>
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-2xl border border-emerald-700/15 bg-emerald-700 text-white px-4 py-3 text-center font-semibold hover:bg-emerald-800 transition-colors"
                      >
                        Open Live App
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
