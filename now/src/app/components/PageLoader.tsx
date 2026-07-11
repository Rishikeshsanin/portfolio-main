"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const CHAR_SEQUENCE = ["R", "I", "S", "H", "I"] as const;
const PIXEL_COUNT = 20;
const FIRST_VISIT_KEY = "portfolio-initial-load-complete-v1";
const FIRST_VISIT_MIN_VISIBLE_MS = 900;
const FIRST_VISIT_MAX_WAIT_MS = 7000;
const ROUTE_TRANSITION_VISIBLE_MS = 220;

const CHAR_PIXELS: Record<(typeof CHAR_SEQUENCE)[number], number[]> = {
  // Pixel index map (5x4):
  //  0  1  2  3  4
  //  5  6  7  8  9
  // 10 11 12 13 14
  // 15 16 17 18 19
  R: [0, 1, 2, 3, 5, 9, 10, 11, 12, 13, 15, 18],
  I: [0, 1, 2, 3, 4, 7, 12, 15, 16, 17, 18, 19],
  S: [0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 18, 19],
  H: [0, 4, 5, 6, 7, 8, 9, 10, 14, 15, 19],
};

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T | null> {
  return new Promise((resolve) => {
    const timeoutId = window.setTimeout(() => finish(null), timeoutMs);

    const finish = (value: T | null) => {
      window.clearTimeout(timeoutId);
      resolve(value);
    };

    promise.then((value) => finish(value)).catch(() => finish(null));
  });
}

function waitForWindowLoad(): Promise<void> {
  if (document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const onLoad = () => resolve();
    window.addEventListener("load", onLoad, { once: true });
  });
}

function waitForFontsReady(): Promise<void> {
  const fontsApi = document.fonts;
  if (!fontsApi) {
    return Promise.resolve();
  }

  return fontsApi.ready.then(() => undefined).catch(() => undefined);
}

function waitForMountedImages(): Promise<void> {
  const images = Array.from(document.images);
  if (!images.length) {
    return Promise.resolve();
  }

  const waiters = images.map((img) => {
    if (img.complete && img.naturalWidth > 0) {
      return Promise.resolve();
    }

    if (typeof img.decode === "function") {
      return img.decode().then(() => undefined).catch(() => undefined);
    }

    return new Promise<void>((resolve) => {
      const onDone = () => {
        img.removeEventListener("load", onDone);
        img.removeEventListener("error", onDone);
        resolve();
      };

      img.addEventListener("load", onDone, { once: true });
      img.addEventListener("error", onDone, { once: true });
    });
  });

  return Promise.all(waiters).then(() => undefined);
}

export default function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const firstRunRef = useRef(true);
  const activeChar = CHAR_SEQUENCE[charIndex];

  const activePixels = useMemo(() => {
    return new Set<number>(CHAR_PIXELS[activeChar]);
  }, [activeChar]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCharIndex((previous) => (previous + 1) % CHAR_SEQUENCE.length);
    }, 420);

    return () => window.clearInterval(intervalId);
  }, [visible]);

  useEffect(() => {
    const onClickCapture = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const link = target?.closest("a") as HTMLAnchorElement | null;

      if (!link || !link.href) {
        return;
      }

      if (link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) {
        return;
      }

      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }

      setCharIndex(0);
      setVisible(true);
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | undefined;

    const hideSoon = (delayMs: number) => {
      timeoutId = window.setTimeout(() => {
        if (!cancelled) {
          setVisible(false);
        }
      }, delayMs);
    };

    const run = async () => {
      const isFirstRun = firstRunRef.current;
      firstRunRef.current = false;

      if (!isFirstRun) {
        hideSoon(ROUTE_TRANSITION_VISIBLE_MS);
        return;
      }

      let firstVisit = true;
      try {
        firstVisit = window.localStorage.getItem(FIRST_VISIT_KEY) !== "1";
        if (firstVisit) {
          window.localStorage.setItem(FIRST_VISIT_KEY, "1");
        }
      } catch {
        firstVisit = true;
      }

      if (!firstVisit) {
        hideSoon(ROUTE_TRANSITION_VISIBLE_MS);
        return;
      }

      const start = performance.now();
      await withTimeout(
        Promise.all([waitForWindowLoad(), waitForFontsReady(), waitForMountedImages()]).then(() => undefined),
        FIRST_VISIT_MAX_WAIT_MS
      );

      if (cancelled) {
        return;
      }

      const elapsed = performance.now() - start;
      const remaining = Math.max(0, FIRST_VISIT_MIN_VISIBLE_MS - elapsed);
      hideSoon(remaining);
    };

    run();

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-[#d1fae5]/55 backdrop-blur-md"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.24),transparent_40%),radial-gradient(circle_at_80%_75%,rgba(16,185,129,0.22),transparent_44%)]" />

          <motion.div
            initial={{ y: 10, opacity: 0.25, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="relative z-10 rounded-[0.72rem] border border-[#34d399]/75 bg-transparent p-1.5 shadow-[0_10px_18px_rgba(6,95,70,0.16)]"
          >
            <div className="grid grid-cols-5 gap-[2px]">
              {Array.from({ length: PIXEL_COUNT }, (_, pixelIndex) => {
                const isActive = activePixels.has(pixelIndex);
                return (
                <motion.span
                  key={pixelIndex}
                  className="block h-[5px] w-[5px] rounded-[1px]"
                  animate={{
                    backgroundColor: isActive ? "#10b981" : "rgba(16,185,129,0.14)",
                    opacity: isActive ? 1 : 0.22,
                    boxShadow: isActive ? "0 0 0 1px rgba(6,95,70,0.18), 0 0 6px rgba(16,185,129,0.42)" : "0 0 0 1px rgba(6,95,70,0.08)",
                    scale: isActive ? 1 : 0.92,
                  }}
                  transition={{ duration: 0.14, ease: "easeOut", delay: pixelIndex * 0.006 }}
                />
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
