"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const focusTags = ["Software Engineering", "Backend Systems", "Full Stack", "Applied AI", "Realtime Systems"];

type TerminalEntry = {
  command: string;
  output: Array<string | { label: string; href: string }>;
  isError?: boolean;
};

type TerminalWindowState = "open" | "minimized" | "closed";

const terminalCommands: Record<string, Array<string | { label: string; href: string }>> = {
  help: ["whoami", "cat focus.txt", "echo $EMAIL", "socials --list", "clear"],
  whoami: ["Rishikesh Munnaluri - Software Engineering | Full Stack | Applied AI"],
  "cat focus.txt": ["Building reliable software products across backend systems, realtime apps and applied AI."],
  "echo $email": ["rishikeshjonin@gmail.com"],
  "socials --list": [
    { label: "linkedin: linkedin.com/in/rishikesh-munnaluri-143b34293", href: "https://www.linkedin.com/in/rishikesh-munnaluri-143b34293/" },
    { label: "github: github.com/Rishikeshsanin", href: "https://github.com/Rishikeshsanin" },
    { label: "x: x.com/Rishikesh_jonin", href: "https://x.com/Rishikesh_jonin" },
  ],
};

const quickCommands = ["whoami", "cat focus.txt", "socials --list", "echo $EMAIL", "clear"];

export default function Contact() {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>([]);
  const [terminalWindowState, setTerminalWindowState] = useState<TerminalWindowState>("open");
  const [isTerminalZoomed, setIsTerminalZoomed] = useState(false);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  const isTerminalClosed = terminalWindowState === "closed";
  const isTerminalMinimized = terminalWindowState === "minimized";

  const executeCommand = (value: string) => {
    if (isTerminalClosed || isTerminalMinimized) return;
    const raw = value.trim();
    if (!raw) return;
    const normalized = raw.toLowerCase();
    setTerminalInput("");

    if (normalized === "clear") {
      setTerminalHistory([]);
      return;
    }

    const output = terminalCommands[normalized];
    if (output) {
      setTerminalHistory((prev) => [...prev, { command: raw, output }]);
      return;
    }

    setTerminalHistory((prev) => [
      ...prev,
      {
        command: raw,
        output: [`command not found: ${raw}`, "type 'help' to list available commands"],
        isError: true,
      },
    ]);
  };

  const runCommand = () => executeCommand(terminalInput);

  return (
    <section className="relative w-full min-h-screen flex items-center py-20 md:py-24 lg:py-16 overflow-hidden" id="contact">
      <div className="px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <p className="inline-flex px-3.5 py-1.5 rounded-full text-[11px] tracking-[0.18em] uppercase font-bold bg-[var(--site-accent-soft)] text-[#10b981] border border-[var(--site-border)]">
              Contact / Open for Work
            </p>

            <h2 className="mt-5 text-4xl sm:text-5xl md:text-7xl font-extrabold font-headline font-doto text-[var(--text-heading)] leading-[0.95] tracking-tight">
              Let&apos;s build
              <br />
              something
              <br />
              meaningful.
            </h2>

            <p className="mt-5 max-w-2xl mx-auto lg:mx-0 text-[var(--text-secondary)] text-lg md:text-xl font-medium leading-relaxed">
              Software engineering, strong backend systems, and product-focused interfaces. If the problem is interesting, I&apos;d like to build it properly.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
              {focusTags.map((word) => (
                <span
                  key={word}
                  className="px-3 py-1.5 rounded-full text-xs tracking-[0.12em] uppercase font-bold bg-[var(--site-card-bg-strong)] border border-[var(--site-border)] text-[#10b981] backdrop-blur-md"
                >
                  {word}
                </span>
              ))}
            </div>

            <div className="mt-5 relative overflow-hidden rounded-[2rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] backdrop-blur-xl shadow-[0_20px_56px_rgba(0,0,0,0.2)] px-5 py-4 md:px-6">
              <div className="absolute inset-y-0 right-[-10%] w-[40%] rounded-full bg-[#10b981]/8 blur-2xl" />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <a
                  href="mailto:rishikeshjonin@gmail.com"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#10b981] text-white px-7 py-3 font-extrabold text-base md:text-lg shadow-[0_7px_0_#059669] hover:-translate-y-1 hover:shadow-[0_10px_0_#059669] active:translate-y-1 active:shadow-[0_4px_0_#059669] transition-all"
                >
                  Mail Now
                  <span className="material-symbols-outlined text-[1.1rem]">arrow_outward</span>
                </a>
                <a
                  href="/rishi-resume.pdf"
                  download="Rishikesh-Munnaluri-Resume.pdf"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-5 py-3 text-sm md:text-base font-extrabold tracking-[0.08em] uppercase text-[var(--text-primary)] shadow-[0_8px_18px_rgba(0,0,0,0.1)] hover:bg-[var(--site-card-bg)] transition-all"
                >
                  Resume
                  <span className="material-symbols-outlined text-[1rem]" aria-hidden="true">download</span>
                </a>
                <span className="text-[var(--text-muted)] font-semibold text-sm md:text-base text-center sm:text-left">Usually replies within 24h</span>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className={`w-full ${isTerminalZoomed ? "max-w-2xl" : "max-w-xl"} mx-auto lg:mx-0`}
          >
            <div className="relative rounded-[1.5rem] border border-[var(--site-border)] bg-[var(--site-terminal-bg)] backdrop-blur-3xl shadow-[0_8px_20px_rgba(0,0,0,0.15)] overflow-hidden text-left">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(129,181,50,0.08)_0%,rgba(129,181,50,0.01)_48%,rgba(129,181,50,0)_100%)]" />
              <div className="pointer-events-none absolute -bottom-16 right-[-10%] h-48 w-48 rounded-full bg-[#10b981]/5 blur-3xl" />

              <div className="relative z-10 h-11 px-4 flex items-center justify-between border-b border-[var(--site-border)] bg-[var(--site-card-bg-strong)] backdrop-blur-2xl">
                <div className="flex items-center gap-2">
                  <button type="button" aria-label="Close terminal" title="Close" onClick={() => setTerminalWindowState("closed")} className="group h-2.5 w-2.5 rounded-full bg-[#ff5f57] ring-1 ring-black/10 flex items-center justify-center">
                    <span className="text-[8px] leading-none text-black/65 opacity-0 group-hover:opacity-100">x</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Minimize terminal"
                    title="Minimize"
                    onClick={() => setTerminalWindowState((prev) => prev === "minimized" ? "open" : "minimized")}
                    className="group h-2.5 w-2.5 rounded-full bg-[#febc2e] ring-1 ring-black/10 flex items-center justify-center"
                  >
                    <span className="text-[9px] leading-none text-black/65 opacity-0 group-hover:opacity-100">-</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Zoom terminal"
                    title="Zoom"
                    onClick={() => {
                      setTerminalWindowState("open");
                      setIsTerminalZoomed((prev) => !prev);
                      requestAnimationFrame(() => terminalInputRef.current?.focus());
                    }}
                    className="group h-2.5 w-2.5 rounded-full bg-[#28c840] ring-1 ring-black/10 flex items-center justify-center"
                  >
                    <span className="text-[8px] leading-none text-black/65 opacity-0 group-hover:opacity-100">+</span>
                  </button>
                </div>
                <p className="text-[10px] tracking-[0.12em] uppercase font-bold text-[#10b981]">terminal / profile</p>
              </div>

              {isTerminalClosed ? (
                <div className="relative z-10 px-4 md:px-5 py-5 font-mono bg-[var(--site-card-bg-strong)] text-[12px] md:text-[13px] text-[var(--text-muted)]">
                  Window closed. Click the green dot to reopen.
                </div>
              ) : isTerminalMinimized ? null : (
                <div className="relative z-10 px-4 md:px-5 py-4 font-mono bg-[var(--site-card-bg-strong)] text-[12px] md:text-[13px] leading-relaxed text-[var(--text-card)]">
                  <div className={`min-h-[220px] ${isTerminalZoomed ? "max-h-[360px]" : "max-h-[260px]"} overflow-y-auto pr-1 no-scrollbar`}>
                    {terminalHistory.length === 0 ? (
                      <p className="text-[var(--text-muted)]">Type <span className="text-[#10b981]">help</span> and press Enter.</p>
                    ) : (
                      terminalHistory.map((entry, idx) => (
                        <div key={`${entry.command}-${idx}`} className="mb-3 last:mb-0">
                          <p className="text-[#10b981]">$ {entry.command}</p>
                          {entry.output.map((line, lineIdx) =>
                            typeof line === "string" ? (
                              <p key={`${line}-${lineIdx}`} className={`${entry.isError ? "text-red-400" : "text-[var(--text-secondary)]"} break-words`}>{line}</p>
                            ) : (
                              <a key={`${line.href}-${lineIdx}`} href={line.href} target="_blank" rel="noreferrer" className="block break-words text-[var(--text-secondary)] hover:text-[#10b981] underline decoration-[#10b981]/30 underline-offset-2">
                                {line.label}
                              </a>
                            ),
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  <form
                    className="mt-3 pt-3 border-t border-[var(--site-border)] flex items-center gap-2"
                    onSubmit={(event) => {
                      event.preventDefault();
                      runCommand();
                    }}
                    onClick={() => terminalInputRef.current?.focus()}
                  >
                    <span className="text-[#10b981] shrink-0">$</span>
                    <input
                      ref={terminalInputRef}
                      type="text"
                      disabled={isTerminalClosed || isTerminalMinimized}
                      value={terminalInput}
                      onChange={(event) => setTerminalInput(event.target.value)}
                      placeholder="whoami"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      className="w-full bg-transparent text-[var(--text-card)] placeholder:text-[var(--text-muted)] focus:outline-none"
                    />
                    <button type="submit" disabled={isTerminalClosed || isTerminalMinimized} className="shrink-0 rounded-md border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-2 py-1 text-[10px] tracking-[0.08em] uppercase font-bold text-[#10b981] hover:bg-[var(--site-card-bg)] transition-colors">
                      Run
                    </button>
                  </form>
                  <div className="mt-2 text-[10px] text-[var(--text-muted)]">Commands: help, whoami, cat focus.txt, echo $EMAIL, socials --list, clear</div>
                </div>
              )}
            </div>

            <div className="mt-4 relative rounded-[1.35rem] border border-[var(--site-border)] bg-[var(--site-card-bg)] shadow-[0_6px_16px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_12%,rgba(129,181,50,0.08)_0%,rgba(129,181,50,0.01)_52%,rgba(129,181,50,0)_100%)]" />
              <div className="relative z-10 px-4 md:px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.14em] font-bold text-[#10b981]">Command Deck</p>
                  <span className="text-[10px] text-[var(--text-muted)]">Tap to run quick actions</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {quickCommands.map((command) => (
                    <button
                      key={command}
                      type="button"
                      onClick={() => {
                        executeCommand(command);
                        requestAnimationFrame(() => terminalInputRef.current?.focus());
                      }}
                      className="rounded-full border border-[var(--site-border)] bg-[var(--site-card-bg-strong)] px-3 py-1.5 text-[11px] md:text-xs font-mono font-semibold text-[var(--text-card)] hover:bg-[var(--site-card-bg)] hover:-translate-y-0.5 transition-all"
                    >
                      {command}
                    </button>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-5 gap-1.5">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <span key={idx} className={`h-1.5 rounded-full ${idx < 4 ? "bg-[#10b981]" : "bg-[var(--site-border-strong)]"}`} />
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
