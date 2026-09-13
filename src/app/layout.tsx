import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rishikesh Munnaluri | Software Engineer",
    template: "%s | Rishikesh Munnaluri",
  },
  description:
    "Software Engineer focused on full-stack systems, backend engineering and applied AI. Selected work by Rishikesh Munnaluri.",
  openGraph: {
    title: "Rishikesh Munnaluri | Software Engineer",
    description:
      "Full-stack, backend and applied AI engineering portfolio with selected production projects and case studies.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const navItems = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#capabilities", label: "Skills" },
  { href: "/#about", label: "About" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-grid" aria-hidden="true" />
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#080b10]/82 backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:px-8">
            <Link href="/" className="group inline-flex items-center gap-3 font-semibold tracking-[-0.02em] text-white">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 bg-white/[0.045] font-mono text-xs text-[#9cf6d9] transition group-hover:border-[#9cf6d9]/45">
                RM
              </span>
              <span className="hidden sm:inline">Rishikesh Munnaluri</span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>

            <a
              href="/rishi-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="button-secondary !px-4 !py-2 text-sm"
            >
              Resume ↗
            </a>
          </div>
        </header>

        <div className="relative z-10 min-h-screen pt-16">{children}</div>

        <footer className="relative z-10 border-t border-white/8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-[#8e99aa] md:flex-row md:items-center md:justify-between md:px-8">
            <p>© 2026 Rishikesh Munnaluri. Built for engineers, recruiters and curious people.</p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:rishikeshjonin@gmail.com" className="footer-link">Email</a>
              <a href="https://www.linkedin.com/in/rishikesh-munnaluri-143b34293/" target="_blank" rel="noreferrer" className="footer-link">LinkedIn ↗</a>
              <a href="https://github.com/Rishikeshsanin" target="_blank" rel="noreferrer" className="footer-link">GitHub ↗</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
