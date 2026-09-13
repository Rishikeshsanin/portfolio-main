"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";

function CasinoNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 900, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className="tabular-nums">{display.toLocaleString()}{suffix}</span>;
}

function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });
  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set(e.clientX - (r.left + r.width / 2));
        y.set(e.clientY - (r.top + r.height / 2));
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ translateX: sx, translateY: sy }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-[#10b981]/90 backdrop-blur-md text-white px-8 py-4 md:px-10 rounded-full font-headline font-bold text-base md:text-lg shadow-[0_6px_0_#059669] hover:shadow-[0_10px_0_#059669] active:shadow-none transition-all duration-200 border border-[#10b981]/45 overflow-hidden"
    >
      <span className="relative z-10">{children}</span>
      <motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full" whileHover={{ x: "200%" }} transition={{ duration: 0.5 }} />
    </motion.a>
  );
}

export default function Hero() {
  const stats = [
    { value: 7, suffix: "", label: "Flagship Projects" },
    { value: 4, suffix: "", label: "Live Tier-A Builds" },
    { value: 3, suffix: "", label: "Experience Tracks" },
    { value: 2027, suffix: "", label: "Graduation" },
  ];

  return (
    <section id="hero" className="w-full relative flex items-center justify-center px-6 md:px-12 pt-28 pb-10 md:pt-14 md:py-14 min-h-[70vh] md:min-h-0 scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:block fixed left-8 bottom-[clamp(8.75rem,18vh,11rem)] z-20"
      >
        <motion.div whileHover={{ scale: 1.01 }} className="bg-white/5 backdrop-blur-xl scale-85 rounded-2xl border border-white/10 p-6 shadow-[0_12px_32px_rgba(16,185,129,0.12)] hover:shadow-[0_16px_40px_rgba(16,185,129,0.2)] transition-all duration-200">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} whileHover={{ scale: 1.05 }} className="bg-[var(--site-card-bg-strong)]/50 rounded-xl p-3 border border-[var(--site-border)]/50 hover:border-[#10b981]/30 transition-all duration-200">
                <p className="text-2xl font-black text-[#10b981] leading-none"><CasinoNumber value={stat.value} suffix={stat.suffix} /></p>
                <p className="text-[10px] tracking-[0.12em] uppercase font-bold text-[var(--text-secondary)] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center text-center relative z-10 min-h-[60vh] md:min-h-0">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
          <h1 className="text-5xl md:text-[4.8rem] font-extrabold font-headline tracking-tighter leading-[1.05] mb-5" style={{ color: "var(--site-foreground)" }}>
            Hi. I&apos;m Rishikesh<span className="font-doto text-4xl sm:text-5xl md:text-7xl font-extrabold rubber-spin-dot inline-flex items-center justify-center w-[1em] h-[1em] leading-none align-middle text-[#10b981]">+</span><br />
            <span className="text-[#10b981] md:text-[2.9rem]">Software Engineer · Full Stack &amp; Applied AI</span>
          </h1>

          <p className="text-md md:text-xl font-body leading-relaxed mb-6 max-w-2xl mx-auto font-medium" style={{ color: "var(--site-muted-strong)" }}>
            I build and ship end-to-end software across realtime systems, backend platforms and applied AI — with product quality, reliability and clean UX in mind.
          </p>

          <div className="md:hidden flex gap-5 justify-center mb-8">
            <a className="transition-colors hover:text-[#10b981]" style={{ color: "var(--site-muted)" }} href="mailto:rishikeshjonin@gmail.com" aria-label="Email"><FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" /></a>
            <a className="transition-colors hover:text-[#10b981]" style={{ color: "var(--site-muted)" }} href="https://www.linkedin.com/in/rishikesh-munnaluri-143b34293/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedinIn} className="w-6 h-6" /></a>
            <a className="transition-colors hover:text-[#10b981]" style={{ color: "var(--site-muted)" }} href="https://github.com/Rishikeshsanin" target="_blank" rel="noreferrer" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} className="w-6 h-6" /></a>
          </div>

          <div className="relative flex justify-center"><MagneticButton href="/work">Explore Work</MagneticButton></div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="md:hidden mt-8">
            <div className="bg-[var(--site-card-bg)]/80 backdrop-blur-xl rounded-2xl border border-[var(--site-border)] p-4 shadow-[0_8px_24px_rgba(16,185,129,0.1)]">
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => <div key={stat.label} className="bg-[var(--site-card-bg-strong)]/60 rounded-xl p-3 border border-[var(--site-border)]/50"><p className="text-xl font-black text-[#10b981] leading-none">{stat.value}{stat.suffix}</p><p className="text-[9px] tracking-[0.1em] uppercase font-bold text-[var(--text-secondary)] mt-1">{stat.label}</p></div>)}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
