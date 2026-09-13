import type { Metadata } from "next";
import About from "../components/About";

export const metadata: Metadata = {
    title: "About",
};

export default function AboutPage() {
    return (
        <main className="relative isolate flex-1 flex flex-col pt-32 pb-40 min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_20%,rgba(16,185,129,0.16),transparent_38%),radial-gradient(circle_at_84%_78%,rgba(6,95,70,0.16),transparent_42%)]" />
            <div className="pointer-events-none absolute -top-16 -left-16 -z-10 h-72 w-72 rounded-full bg-[#10b981]/20 blur-3xl" />
            <div className="pointer-events-none absolute top-8 right-2 -z-10 h-80 w-80 rounded-full bg-[#047857]/18 blur-3xl" />
            <About />
        </main>
    );
}
