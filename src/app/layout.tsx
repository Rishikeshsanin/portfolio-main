import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import MobileNav from "./components/MobileNav";
import SearchKeywordHighlighter from "./components/SearchKeywordHighlighter";
import PageLoader from "./components/PageLoader";
import ResumeDownloadFab from "./components/ResumeDownloadFab";
import RoutePixelBackground from "./components/RoutePixelBackground";
import ThemeProvider from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import logo from "./assets/imgs/logo.png";

const doto = localFont({
  src: "./assets/fonts/Doto/Doto-VariableFont_ROND,wght.ttf",
  variable: "--font-doto",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Rishikesh | Home", template: "Rishikesh | %s" },
  description: "Portfolio of Rishikesh Munnaluri — Software Engineer focused on full-stack systems, backend engineering and applied AI.",
  icons: { icon: logo.src, shortcut: logo.src, apple: logo.src },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <Script id="theme-bootstrap" strategy="beforeInteractive">{`(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}else{document.documentElement.dataset.theme=window.innerWidth<768?'dark':'light';}}catch(e){document.documentElement.dataset.theme=window.innerWidth<768?'dark':'light';}})();`}</Script>
      </head>
      <body className={`${doto.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <RoutePixelBackground />
          <PageLoader />
          <Suspense fallback={null}><SearchKeywordHighlighter /></Suspense>
          <ResumeDownloadFab />
          <ThemeToggle />
          <div className="flex-1 w-full relative z-10 flex flex-col">{children}</div>
          <MobileNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
