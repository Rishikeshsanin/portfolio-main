"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const focusTags = ["DevOps", "Automation", "UI/UX Systems", "Full Stack",  "AI Workflows"];

type TerminalEntry = {
    command: string;
    output: Array<string | { label: string; href: string }>;
    isError?: boolean;
};

type TerminalWindowState = "open" | "minimized" | "closed";

const terminalCommands: Record<string, Array<string | { label: string; href: string }>> = {
    "help": [
        "whoami",
        "cat focus.txt",
        "echo $EMAIL",
        "socials --list",
        "clear",
    ],
    "whoami": ["Rishikesh - DevOps | Full Stack "],
    "cat focus.txt": ["Building scalable pipelines, polished UI/UX, and AI-powered workflows."],
    "echo $email": ["rishikeshjonin@gmail.com"],
    "socials --list": [
        { label: "linkedin: https://www.linkedin.com/in/rishikesh-munnaluri-143b34293/", href: "https://www.linkedin.com/in/rishikesh-munnaluri-143b34293/" },
        { label: "github: https://github.com/Rishikeshsanin", href: "https://github.com/Rishikeshsanin" },
        { label: "x: https://x.com/Rishikesh_jonin", href: "https://x.com/Rishikesh_jonin" },
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
        if (isTerminalClosed || isTerminalMinimized) {
            return;
        }

        const raw = value.trim();
        if (!raw) {
            return;
        }

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

    const runCommand = () => {
        executeCommand(terminalInput);
        setTerminalInput("");
    };

    const handleClose = () => {
        setTerminalWindowState("closed");
    };

    const handleMinimize = () => {
        setTerminalWindowState((prev) => {
            if (prev === "closed") {
                return "minimized";
            }
            return prev === "minimized" ? "open" : "minimized";
        });
    };

    const handleZoom = () => {
        setTerminalWindowState("open");
        setIsTerminalZoomed((prev) => !prev);
        requestAnimationFrame(() => terminalInputRef.current?.focus());
    };

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
                        <p className="inline-flex px-3.5 py-1.5 rounded-full text-[11px] tracking-[0.18em] uppercase font-bold bg-[#10b981]/12 text-[#047857] border border-[#10b981]/20">
                            Contact / Open for Work
                        </p>

                        <h2 className="mt-5 text-4xl sm:text-5xl md:text-7xl font-extrabold font-headline font-doto text-[#022c22] leading-[0.95] tracking-tight">
                            Let’s build
                            <br />
                            something
                            <br />
                            meaningful.
                        </h2>

                        <p className="mt-5 max-w-2xl mx-auto lg:mx-0 text-[#064e3b]/85 text-lg md:text-xl font-medium leading-relaxed">
                            DevOps pipelines, smart product engineering, and high-polish UI/UX experiences. If you want all three done right, let us build together.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                            {focusTags.map((word) => (
                                <span
                                    key={word}
                                    className="px-3 py-1.5 rounded-full text-xs tracking-[0.12em] uppercase font-bold bg-white/65 text-[#047857] border border-emerald-200/80 backdrop-blur-md"
                                >
                                    {word}
                                </span>
                            ))}
                        </div>

                        <div className="mt-5 relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_20px_56px_rgba(6,95,70,0.16)] px-5 py-4 md:px-6">
                            <div className="absolute inset-y-0 right-[-10%] w-[40%] rounded-full bg-[#10b981]/14 blur-2xl" />
                            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                <a
                                    href="mailto:rishikeshjonin@gmail.com"
                                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#10b981] text-white px-7 py-3 font-extrabold text-base md:text-lg shadow-[0_7px_0_#059669] hover:-translate-y-1 hover:shadow-[0_10px_0_#059669] active:translate-y-1 active:shadow-[0_4px_0_#059669] transition-all"
                                >
                                    Talk now
                                    <span className="material-symbols-outlined text-[1.1rem]">arrow_outward</span>
                                </a>
                                <a
                                    href="/rishi-resume.pdf"
                                    download="Rishikesh-Resume.pdf"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#10b981]/35 bg-white/70 px-5 py-3 text-sm md:text-base font-extrabold tracking-[0.08em] uppercase text-[#047857] shadow-[0_8px_18px_rgba(6,95,70,0.1)] hover:-translate-y-0.5 hover:bg-white/90 transition-all"
                                >
                                    Resume
                                    <span className="material-symbols-outlined text-[1rem]" aria-hidden="true">download</span>
                                </a>
                                <span className="text-[#065f46] font-semibold text-sm md:text-base text-center sm:text-left">Usually replies within 24h</span>
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
                        <div className="relative rounded-[1.5rem] border border-white/60 bg-white/18 backdrop-blur-3xl shadow-[0_24px_60px_rgba(6,95,70,0.22)] overflow-hidden text-left">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.06)_48%,rgba(255,255,255,0)_100%)]" />
                            <div className="pointer-events-none absolute -bottom-16 right-[-10%] h-48 w-48 rounded-full bg-emerald-200/35 blur-3xl" />

                            <div className="relative z-10 h-11 px-4 flex items-center justify-between border-b border-white/55 bg-white/28 backdrop-blur-2xl">
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        aria-label="Close terminal"
                                        title="Close"
                                        onClick={handleClose}
                                        className="group h-2.5 w-2.5 rounded-full bg-[#ff5f57] ring-1 ring-black/10 flex items-center justify-center"
                                    >
                                        <span className="text-[8px] leading-none text-black/65 opacity-0 group-hover:opacity-100">x</span>
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Minimize terminal"
                                        title="Minimize"
                                        onClick={handleMinimize}
                                        className="group h-2.5 w-2.5 rounded-full bg-[#febc2e] ring-1 ring-black/10 flex items-center justify-center"
                                    >
                                        <span className="text-[9px] leading-none text-black/65 opacity-0 group-hover:opacity-100">-</span>
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Zoom terminal"
                                        title="Zoom"
                                        onClick={handleZoom}
                                        className="group h-2.5 w-2.5 rounded-full bg-[#28c840] ring-1 ring-black/10 flex items-center justify-center"
                                    >
                                        <span className="text-[8px] leading-none text-black/65 opacity-0 group-hover:opacity-100">+</span>
                                    </button>
                                </div>
                                <p className="text-[10px] tracking-[0.12em] uppercase font-bold text-[#047857]">terminal / profile</p>
                            </div>

                            {isTerminalClosed ? (
                                <div className="relative z-10 px-4 md:px-5 py-5 font-mono bg-white/10 text-[12px] md:text-[13px] text-[#065f46]/78">
                                    Window closed. Click the green dot to reopen.
                                </div>
                            ) : isTerminalMinimized ? null : (
                            <div className="relative z-10 px-4 md:px-5 py-4 font-mono bg-white/16 text-[12px] md:text-[13px] leading-relaxed text-[#064e3b]">
                                <div className={`min-h-[220px] ${isTerminalZoomed ? "max-h-[360px]" : "max-h-[260px]"} overflow-y-auto pr-1 no-scrollbar`}>
                                    {terminalHistory.length === 0 ? (
                                        <p className="text-[#065f46]/78">Type <span className="text-[#059669]">help</span> and press Enter.</p>
                                    ) : (
                                        terminalHistory.map((entry, idx) => (
                                            <div key={`${entry.command}-${idx}`} className="mb-3 last:mb-0">
                                                <p className="text-[#059669]">$ {entry.command}</p>
                                                {entry.output.map((line, lineIdx) => (
                                                    typeof line === "string" ? (
                                                        <p key={`${line}-${lineIdx}`} className={`${entry.isError ? "text-[#b91c1c]" : "text-[#065f46]/90"} break-words`}>
                                                            {line}
                                                        </p>
                                                    ) : (
                                                        <a
                                                            key={`${line.href}-${lineIdx}`}
                                                            href={line.href}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="block break-words text-[#065f46]/90 hover:text-[#047857] underline decoration-[#047857]/35 underline-offset-2"
                                                        >
                                                            {line.label}
                                                        </a>
                                                    )
                                                ))}
                                            </div>
                                        ))
                                    )}
                                </div>

                                <form
                                    className="mt-3 pt-3 border-t border-white/50 flex items-center gap-2"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        runCommand();
                                    }}
                                    onClick={() => terminalInputRef.current?.focus()}
                                >
                                    <span className="text-[#059669] shrink-0">$</span>
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
                                        className="w-full bg-transparent text-[#064e3b] placeholder:text-[#065f46]/50 focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isTerminalClosed || isTerminalMinimized}
                                        className="shrink-0 rounded-md border border-emerald-100/70 bg-white/55 px-2 py-1 text-[10px] tracking-[0.08em] uppercase font-bold text-[#047857] hover:bg-white/80 transition-colors"
                                    >
                                        Run
                                    </button>
                                </form>
                                <div className="mt-2 text-[10px] text-[#065f46]/65">
                                    Commands: help, whoami, cat focus.txt, echo $EMAIL, socials --list, clear
                                </div>
                            </div>
                            )}
                        </div>

                        <div className="mt-4 relative rounded-[1.35rem] border border-white/60 bg-white/20 backdrop-blur-2xl shadow-[0_16px_44px_rgba(6,95,70,0.18)] overflow-hidden">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_12%,rgba(16,185,129,0.2)_0%,rgba(16,185,129,0.02)_52%,rgba(16,185,129,0)_100%)]" />
                            <div className="relative z-10 px-4 md:px-5 py-4">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.14em] font-bold text-[#047857]">Command Deck</p>
                                    <span className="text-[10px] text-[#065f46]/70">Tap to run quick actions</span>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {quickCommands.map((command) => (
                                        <button
                                            key={command}
                                            type="button"
                                            onClick={() => {
                                                executeCommand(command);
                                                setTerminalInput("");
                                                requestAnimationFrame(() => terminalInputRef.current?.focus());
                                            }}
                                            className="rounded-full border border-emerald-200/80 bg-white/55 px-3 py-1.5 text-[11px] md:text-xs font-mono font-semibold text-[#065f46] hover:bg-white/80 hover:-translate-y-0.5 transition-all"
                                        >
                                            {command}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-3 grid grid-cols-5 gap-1.5">
                                    {[0, 1, 2, 3, 4].map((idx) => (
                                        <span
                                            key={idx}
                                            className={`h-1.5 rounded-full ${idx < 4 ? "bg-emerald-400/80" : "bg-emerald-200/70"}`}
                                            aria-hidden="true"
                                        />
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
