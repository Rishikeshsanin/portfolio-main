"use client";

import { useEffect, useRef } from "react";

const REFERENCE_MOUNTAIN =
  "https://raw.githubusercontent.com/alurubalakarthikeya/portfolio/main/now/src/app/assets/imgs/desk-bg.png";

export default function HomeBackground({ quality = "default" }: { quality?: "default" | "lite" }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: -1000, y: -1000 });
  const lastActiveRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let lastPaintTime = 0;
    let prevTime = performance.now();

    const pixelSize = quality === "lite" ? 22 : window.innerWidth < 768 ? 12 : 19;
    const targetFps = quality === "lite" ? 24 : 35;
    const targetFrameMs = 1000 / targetFps;

    const seededNoise = (n: number) => {
      const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    type Cell = {
      col: number;
      row: number;
      cx: number;
      cy: number;
      lowOpacity: number;
      highOpacity: number;
      speed: number;
      phase: number;
    };

    let cellParams: Cell[] = [];

    const rebuild = () => {
      const cols = Math.ceil(width / pixelSize) + 1;
      const rows = Math.ceil(height / pixelSize) + 1;
      const totalCells = cols * rows;

      cellParams = Array.from({ length: totalCells }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const xRatio = cols > 1 ? col / (cols - 1) : 0.5;
        const yRatio = rows > 1 ? row / (rows - 1) : 0.5;
        const sideDensity = Math.pow(Math.abs(xRatio - 0.5) * 2, 1.45);
        const centerLift = Math.exp(-Math.pow((xRatio - 0.5) / 0.18, 2));
        const verticalDepth = yRatio * 0.08;
        const noise = seededNoise(i * 3 + 7) * 0.2 - 0.1;
        const lowOpacity = Math.max(
          0.02,
          Math.min(0.12, 0.06 + sideDensity * 0.03 - centerLift * 0.02 + verticalDepth * 0.05 + noise),
        );

        return {
          col,
          row,
          cx: col * pixelSize + pixelSize / 2,
          cy: row * pixelSize + pixelSize / 2,
          lowOpacity,
          highOpacity: Math.min(0.24, lowOpacity + 0.04 + seededNoise(i * 11 + 29) * 0.06),
          speed: 0.0004 + seededNoise(i * 17 + 3) * 0.0006,
          phase: seededNoise(i * 23 + 19) * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuild();
    };

    const onMouseMove = (event: MouseEvent) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
      lastActiveRef.current = performance.now();
    };

    const onMouseLeave = () => {
      pointerRef.current.x = -1000;
      pointerRef.current.y = -1000;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ballPos = { x: width * 0.5, y: height * 0.48 };
    const ballTarget = { x: width * 0.5, y: height * 0.48 };

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (document.visibilityState === "hidden") return;

      const elapsed = now - lastPaintTime;
      if (elapsed < targetFrameMs) return;
      lastPaintTime = now - (elapsed % targetFrameMs);

      const dt = Math.min(33, now - prevTime);
      prevTime = now;

      const styles = getComputedStyle(document.documentElement);
      const canvasFill = styles.getPropertyValue("--site-canvas-fill").trim() || "#081b3a";
      const pixelFill = styles.getPropertyValue("--site-accent").trim() || "#10b981";
      const gridFill = styles.getPropertyValue("--site-canvas-grid").trim() || "rgba(4,15,36,.28)";

      ctx.fillStyle = canvasFill;
      ctx.fillRect(0, 0, width, height);

      const pointerActive = pointerRef.current.x !== -1000 && now - lastActiveRef.current < 4000;
      const ballRadius = quality === "lite" ? pixelSize * 8 : pixelSize * 10;

      if (pointerActive && !prefersReducedMotion) {
        ballPos.x += (pointerRef.current.x - ballPos.x) * Math.min(1, dt * 0.024);
        ballPos.y += (pointerRef.current.y - ballPos.y) * Math.min(1, dt * 0.024);
      } else if (!prefersReducedMotion) {
        ballTarget.x = width * 0.5 + Math.sin(now * 0.0003) * width * 0.28;
        ballTarget.y = height * 0.48 + Math.sin(now * 0.00045 + 1.2) * height * 0.22;
        ballPos.x += (ballTarget.x - ballPos.x) * Math.min(1, dt * 0.014);
        ballPos.y += (ballTarget.y - ballPos.y) * Math.min(1, dt * 0.014);
      }

      for (const cell of cellParams) {
        let opacity = cell.lowOpacity;
        if (!prefersReducedMotion) {
          const sine = Math.sin(now * cell.speed + cell.phase);
          opacity = cell.lowOpacity + ((sine + 1) / 2) * (cell.highOpacity - cell.lowOpacity);
          const distance = Math.hypot(cell.cx - ballPos.x, cell.cy - ballPos.y);
          if (distance < ballRadius) {
            opacity = Math.min(0.78, opacity + (1 - distance / ballRadius) * 0.46);
          }
        }

        ctx.fillStyle = pixelFill;
        ctx.globalAlpha = opacity;
        ctx.fillRect(cell.col * pixelSize + 1, cell.row * pixelSize + 1, pixelSize - 1, pixelSize - 1);
        ctx.globalAlpha = 1;

        ctx.fillStyle = gridFill;
        ctx.fillRect(cell.col * pixelSize, cell.row * pixelSize, pixelSize, 1);
        ctx.fillRect(cell.col * pixelSize, cell.row * pixelSize, 1, pixelSize);
      }
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [quality]);

  return (
    <div className="home-pixel-field absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="md:hidden absolute inset-0 bg-no-repeat bg-contain scale-125 origin-center"
          style={{
            backgroundImage: `url(${REFERENCE_MOUNTAIN})`,
            backgroundPosition: "90% 50%",
          }}
        />
        <div
          className="hidden md:block absolute inset-0 translate-x-[20%] translate-y-[20%] scale-[0.65] origin-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url(${REFERENCE_MOUNTAIN})`,
            backgroundPosition: "80% 70%",
          }}
        />
      </div>

      <div className="absolute inset-0 z-[5] bg-white/5" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 block h-full w-full opacity-60 border-none outline-none pointer-events-none"
      />
    </div>
  );
}
