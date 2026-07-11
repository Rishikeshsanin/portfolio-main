import type { Metadata } from "next";
import Hero from "./components/Hero";
import HomeBackground from "./components/HomeBackground";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faGithub, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main className="relative flex-1 flex flex-col justify-center overflow-hidden pb-28 md:pb-8 min-h-screen">
      <HomeBackground quality="lite" />
      <div className="relative z-10 flex-1 flex items-center">
        <Hero />
      </div>
      <footer className="absolute bottom-0 inset-x-0 z-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-7 md:pb-8 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between gap-5 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <p className="font-bold text-base md:text-lg text-[#022c22]">Rishikesh</p>
            <p className="text-xs md:text-sm font-medium text-[#059669]">@2026 rights reserved.</p>
          </div>

          <div className="hidden md:flex flex-col gap-2 items-end">
            <p className="font-bold text-lg text-[#022c22]">My Socials</p>
            <div className="flex gap-5 justify-end">
              <a
                className="text-[#064e3b]/70 hover:text-[#10b981] transition-colors"
                href="mailto:rishikeshjonin@gmail.com"
                aria-label="Email"
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                className="text-[#064e3b]/70 hover:text-[#10b981] transition-colors"
                href="https://www.linkedin.com/in/rishikesh-munnaluri-143b34293/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                className="text-[#064e3b]/70 hover:text-[#10b981] transition-colors"
                href="https://github.com/Rishikeshsanin"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
