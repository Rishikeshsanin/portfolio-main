"use client";

import { useEffect, useRef } from "react";

const REFERENCE_MOUNTAIN =
  "https://raw.githubusercontent.com/alurubalakarthikeya/portfolio/main/now/src/app/assets/imgs/desk-bg.png";

export default function HomeBackground({ quality = "default" }: { quality?: "default" | "lite" }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: -1000, y: -1000, activeAt: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastPaint = 0;
    let lastFrame = performance.now();

    const pixelSize = quality === "lite" ? 22 : window.innerWidth < 768 ? 12 : 19;
    const targetFps = quality === "lite" ? 24 : 35;
    const frameMs = 1000 / targetFps;

    const seededNoise = (n: number) => {
      const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    type Cell = {
      col: number;
      row: number;
      cx: number;
      cy: number;
      low: number;
      high: number;
      speed: number;
      phase: number;
    };

    let cells: Cell[] = [];

    const rebuildCells = () => {
      const cols = Math.ceil(width / pixelSize) + 1;
      const rows = Math.ceil(height / pixelSize) + 1;
      const total = cols * rows;

      cells = Array.from({ length: total }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const xRatio = cols > 1 ? col / (cols - 1) : 0.5;
        const yRatio = rows > 1 ? row / (rows - 1) : 0.5;
        const edge = Math.pow(Math.abs(xRatio - 0.5) * 2, 1.42);
        const centerLift = Math.exp(-Math.pow((xRatio - 0.5) / 0.2, 2));
        const noise = seededNoise(i * 3 + 7) * 0.055;
        const low = Math.max(0.025, Math.min(0.15, 0.055 + edge * 0.045 - centerLift * 0.018 + yRatio * 0.035 + noise));

        return {
          col,
          row,
          cx: col * pixelSize + pixelSize / 2,
          cy: row * pixelSize + pixelSize / 2,
          low,
          high: Math.min(0.28, low + 0.055 + seededNoise(i * 11 + 29) * 0.07),
          speed: 0.00045 + seededNoise(i * 17 + 3) * 0.00058,
          phase: seededNoise(i * 23 + 19) * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildCells();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY, activeAt: performance.now() };
    };

    const onPointerLeave = () => {
      pointerRef.current = { x: -1000, y: -1000, activeAt: 0 };
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const glow = { x: width * 0.5, y: height * 0.5 };

    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      if (document.visibilityState === "hidden") return;
      if (now - lastPaint < frameMs) return;

      const dt = Math.min(36, now - lastFrame);
      lastFrame = now;
      lastPaint = now;

      const styles = getComputedStyle(document.documentElement);
      const canvasFill = styles.getPropertyValue("--site-canvas-fill").trim() || "#d1fae5";
      const accent = styles.getPropertyValue("--site-accent").trim() || "#10b981";
      const grid = styles.getPropertyValue("--site-canvas-grid").trim() || "rgba(6, 76, 57, 0.12)";

      ctx.fillStyle = canvasFill;
      ctx.fillRect(0, 0, width, height);

      const pointerActive = pointerRef.current.activeAt > 0 && now - pointerRef.current.activeAt < 3500;
      if (!reducedMotion) {
        const targetX = pointerActive ? pointerRef.current.x : width * 0.5 + Math.sin(now * 0.00031) * width * 0.3;
        const targetY = pointerActive ? pointerRef.current.y : height * 0.48 + Math.sin(now * 0.00043 + 1.4) * height * 0.23;
        glow.x += (targetX - glow.x) * Math.min(1, dt * 0.018);
        glow.y += (targetY - glow.y) * Math.min(1, dt * 0.018);
      }

      const radius = quality === "lite" ? pixelSize * 8 : pixelSize * 10;

      for (const cell of cells) {
        let opacity = cell.low;
        if (!reducedMotion) {
          const wave = (Math.sin(now * cell.speed + cell.phase) + 1) / 2;
          opacity += wave * (cell.high - cell.low);
          const distance = Math.hypot(cell.cx - glow.x, cell.cy - glow.y);
          if (distance < radius) opacity = Math.min(0.78, opacity + (1 - distance / radius) * 0.48);
        }

        ctx.globalAlpha = opacity;
        ctx.fillStyle = accent;
        ctx.fillRect(cell.col * pixelSize + 1, cell.row * pixelSize + 1, pixelSize - 1, pixelSize - 1);
        ctx.globalAlpha = 1;
        ctx.fillStyle = grid;
        ctx.fillRect(cell.col * pixelSize, cell.row * pixelSize, pixelSize, 1);
        ctx.fillRect(cell.col * pixelSize, cell.row * pixelSize, 1, pixelSize);
      }
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [quality]);

  return (
    <div className="home-pixel-field absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="md:hidden absolute inset-[-12%] bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url(${REFERENCE_MOUNTAIN})`,
            backgroundPosition: "right 45% bottom 5%",
          }}
        />
        <div
          className="hidden md:block absolute inset-0 bg-no-repeat bg-contain translate-x-[18%] translate-y-[13%] scale-[0.82] origin-center"
          style={{
            backgroundImage: `url(${REFERENCE_MOUNTAIN})`,
            backgroundPosition: "right 8% bottom 4%",
          }}
        />
      </div>

      <div className="absolute inset-0 z-[5] bg-white/[0.04]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 block h-full w-full opacity-[0.58] border-none outline-none pointer-events-none"
      />
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_52%,rgba(4,15,36,0.10)_100%)]" />
    </div>
  );
}
