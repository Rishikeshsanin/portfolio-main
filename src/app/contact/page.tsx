import type { Metadata } from "next";
import Contact from "../components/Contact";

export const metadata: Metadata = {
    title: "Contact",
};

export default function ContactPage() {
    return (
        <main id="contact" className="relative isolate flex-1 min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_22%,rgba(16,185,129,0.18),transparent_38%),radial-gradient(circle_at_86%_74%,rgba(6,95,70,0.2),transparent_40%)]" />
            <div className="pointer-events-none absolute top-4 -left-12 -z-10 h-64 w-64 rounded-full bg-[#10b981]/16 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 right-0 -z-10 h-72 w-72 rounded-full bg-[#047857]/18 blur-3xl" />
            <Contact />
        </main>
    );
}
