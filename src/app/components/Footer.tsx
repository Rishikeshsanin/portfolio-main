"use client";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center pb-32 md:pb-8 bg-transparent">
      <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div className="text-center md:text-left">
          <p className="font-bold text-lg text-[#022c22] mb-1">Rishikesh</p>
          <p className="text-sm font-medium text-[#059669]">© 2026 All rights reserved.</p>
        </div>

        <div className="hidden md:flex flex-col gap-2 items-center md:items-end md:text-left">
          <p className="font-bold text-lg text-[#022c22] mb-1">My Socials</p>
          <div className="flex gap-5 justify-center md:justify-end">
            <a
              className="text-[#064e3b]/70 hover:text-[#10b981] transition-colors"
              href="mailto:rishikeshjonin@gmail.com"
              aria-label="Email"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </a>
            <a
              className="text-[#064e3b]/70 hover:text-[#10b981] transition-colors"
              href="https://www.linkedin.com/in/rishikesh-munnaluri-143b34293/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
                <path d="M6.94 8.5A1.56 1.56 0 1 1 6.93 5.4a1.56 1.56 0 0 1 0 3.1ZM8.33 10H5.54v8.6h2.79V10ZM12.8 10h-2.67v8.6h2.79v-4.25c0-2.37 3.08-2.56 3.08 0v4.25h2.78v-5.2c0-4.04-4.56-3.88-5.98-1.9V10Z" />
              </svg>
            </a>
            <a
              className="text-[#064e3b]/70 hover:text-[#10b981] transition-colors"
              href="https://github.com/Rishikeshsanin"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.88 1.52 2.32 1.08 2.89.83.09-.65.35-1.08.63-1.33-2.22-.26-4.56-1.11-4.56-4.95 0-1.1.39-2 1.03-2.71-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.03A9.55 9.55 0 0 1 12 6.84c.85 0 1.71.12 2.5.35 1.9-1.3 2.74-1.03 2.74-1.03.56 1.42.21 2.47.1 2.73.64.7 1.03 1.6 1.03 2.71 0 3.85-2.34 4.69-4.57 4.95.36.31.67.92.67 1.85v2.75c0 .27.18.59.69.48A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
            <a
              className="text-[#064e3b]/70 hover:text-[#10b981] transition-colors"
              href="https://x.com/Rishikesh_jonin"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
                <path d="M18.24 2H21l-6.03 6.9L22 22h-5.62l-4.4-5.9L6.8 22H4.03l6.45-7.36L2 2h5.76l3.98 5.33L18.24 2Zm-1.97 18h1.56L7.1 3.9H5.43L16.27 20Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
