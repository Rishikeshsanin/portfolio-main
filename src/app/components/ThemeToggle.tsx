"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle(){
  const {theme,toggleTheme}=useTheme();
  return <button type="button" onClick={toggleTheme} aria-label={theme==="dark"?"Switch to light mode":"Switch to dark mode"} className="fixed bottom-6 left-6 lg:top-6 lg:left-6 lg:bottom-auto z-[120] h-9 w-9 rounded-full border border-[var(--site-border)] bg-[var(--site-surface)]/95 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.22)] flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_28px_rgba(16,185,129,0.24)]">
    <AnimatePresence mode="wait" initial={false}>
      <motion.span key={theme} initial={{opacity:0,rotate:-70,scale:.65}} animate={{opacity:1,rotate:0,scale:1}} exit={{opacity:0,rotate:70,scale:.65}} transition={{duration:.2}} className="material-symbols-outlined text-[var(--site-accent)] text-[18px]">{theme==="dark"?"light_mode":"dark_mode"}</motion.span>
    </AnimatePresence>
  </button>;
}
