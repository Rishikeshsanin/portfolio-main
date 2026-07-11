"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

type PixelCell = {
  x: number;
  y: number;
  lowOpacity: number;
  highOpacity: number;
  flickerSpeed: number;
  phase: number;
};

type HomeBackgroundProps = {
  quality?: "default" | "lite";
};

const QUALITY_CONFIG = {
  default: {
    pixelSize: 20,
    targetFrameMs: 1000 / 30,
    updateStride: 2,
  },
  lite: {
    pixelSize: 24,
    targetFrameMs: 1000 / 22,
    updateStride: 3,
  },
} as const;

function seededNoise(index: number): number {
  const x = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export default function HomeBackground({ quality = "default" }: HomeBackgroundProps) {
  const config = QUALITY_CONFIG[quality];
  const enableBallMotion = quality === "default";
  const pixelSize = config.pixelSize;
  const [grid, setGrid] = useState({ cols: 0, rows: 0 });
  const pixelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const opacityCacheRef = useRef<number[]>([]);
  const viewportRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    let rafId = 0;

    const applyGrid = (width: number, height: number) => {
      const cols = Math.ceil(width / pixelSize) + 2;
      const rows = Math.ceil(height / pixelSize) + 2;
      setGrid((prev) => (prev.cols === cols && prev.rows === rows ? prev : { cols, rows }));
      viewportRef.current = { width, height };
    };

    const updateGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const previous = viewportRef.current;
      const isMobile = width < 768;

      if (!previous.width || !previous.height) {
        applyGrid(width, height);
        return;
      }

      const widthChanged = Math.abs(width - previous.width) >= 1;
      const heightThreshold = isMobile ? pixelSize * 2 : pixelSize;
      const heightChanged = Math.abs(height - previous.height) >= heightThreshold;

      if (widthChanged || heightChanged) {
        applyGrid(width, height);
      }
    };

    const scheduleUpdate = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateGrid);
    };

    updateGrid();
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("orientationchange", scheduleUpdate, { passive: true });

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
    };
  }, [pixelSize]);

  const cells = useMemo(() => {
    const total = grid.cols * grid.rows;
    return Array.from({ length: total }, (_, i): PixelCell => {
      const col = i % grid.cols;
      const row = Math.floor(i / grid.cols);
      const x = grid.cols > 1 ? col / (grid.cols - 1) : 0.5;
      const y = grid.rows > 1 ? row / (grid.rows - 1) : 0.5;

      const sideDensity = Math.pow(Math.abs(x - 0.5) * 2, 1.45);
      const centerLift = Math.exp(-Math.pow((x - 0.5) / 0.18, 2));
      const verticalDepth = y * 0.09;
      const random = seededNoise(i * 3 + 7) * 0.3 - 0.15;

      const base = Math.max(0.08, Math.min(0.28, 0.18 + sideDensity * 0.05 - centerLift * 0.03 + verticalDepth * 0.14 + random * 0.2));
      const peak = Math.min(0.48, base + (0.07 + seededNoise(i * 11 + 29) * 0.1));

      return {
        x: col * pixelSize + pixelSize / 2,
        y: row * pixelSize + pixelSize / 2,
        lowOpacity: base,
        highOpacity: peak,
        flickerSpeed: 0.0007 + seededNoise(i * 17 + 3) * 0.0012,
        phase: seededNoise(i * 23 + 19) * Math.PI * 2,
      };
    });
  }, [grid.cols, grid.rows, pixelSize]);

  const staticInfluence = useMemo(() => {
    if (enableBallMotion || !cells.length) {
      return null;
    }

    if (typeof window === "undefined") {
      return null;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;
    const ballRadius = isMobile ? pixelSize * 10.4 : pixelSize * 12;
    const anchorX = width * 0.5;
    const anchorY = height * 0.48;

    return cells.map((cell) => {
      const dx = cell.x - anchorX;
      const dy = cell.y - anchorY;
      const dist = Math.hypot(dx, dy);
      return Math.max(0, 1 - dist / ballRadius);
    });
  }, [cells, enableBallMotion, pixelSize]);

  useEffect(() => {
    if (!cells.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    let rafId = 0;
    let prevTime = performance.now();
    let lastPaintTime = 0;
    let framePartition = 0;

    const ball = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.48,
    };

    const ballTarget = {
      x: ball.x,
      y: ball.y,
    };

    const render = (now: number) => {
      if (document.visibilityState === "hidden") {
        rafId = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min(33, now - prevTime);
      prevTime = now;

      if (now - lastPaintTime < config.targetFrameMs) {
        rafId = requestAnimationFrame(render);
        return;
      }

      lastPaintTime = now;

      const width = window.innerWidth;
      const height = window.innerHeight;

      const isMobile = width < 768;
      const ballRadius = isMobile ? pixelSize * 10.4 : pixelSize * 12;

      if (enableBallMotion) {
        const xWave = Math.sin(now * 0.00038);
        const yWave = Math.sin(now * 0.00057 + 1.15);
        const xRadius = width * (isMobile ? 0.2 : 0.26);
        const yRadius = height * (isMobile ? 0.16 : 0.22);

        ballTarget.x = width * 0.5 + xWave * xRadius;
        ballTarget.y = height * 0.5 + yWave * yRadius;

        // Smooth follow keeps motion stable and removes visible jitter.
        const follow = Math.min(1, dt * 0.018);
        ball.x += (ballTarget.x - ball.x) * follow;
        ball.y += (ballTarget.y - ball.y) * follow;
      } else {
        ball.x = width * 0.5;
        ball.y = height * 0.48;
      }

      for (let i = framePartition; i < cells.length; i += config.updateStride) {
        const el = pixelRefs.current[i];
        if (!el) {
          continue;
        }

        const cell = cells[i];
        const flicker = cell.lowOpacity + ((Math.sin(now * cell.flickerSpeed + cell.phase) + 1) / 2) * (cell.highOpacity - cell.lowOpacity);
        const influence = staticInfluence ? staticInfluence[i] : Math.max(0, 1 - Math.hypot(cell.x - ball.x, cell.y - ball.y) / ballRadius);
        const boosted = Math.min(0.95, flicker + influence * 0.72);
        const previous = opacityCacheRef.current[i];
        if (previous === undefined || Math.abs(previous - boosted) > 0.015) {
          el.style.opacity = `${boosted}`;
          opacityCacheRef.current[i] = boosted;
        }
      }

      framePartition = (framePartition + 1) % config.updateStride;

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [cells, config, enableBallMotion, pixelSize, staticInfluence]);

  useEffect(() => {
    opacityCacheRef.current = [];
  }, [cells.length, pixelSize, quality]);

  return (
    <div className="home-pixel-field" aria-hidden="true">
      <div
        className="home-pixel-grid"
        style={
          {
            "--home-pixel-size": `${pixelSize}px`,
            "--home-pixel-cols": grid.cols,
          } as CSSProperties
        }
      >
        {cells.map((cell, index) => (
          <span
            key={index}
            className="home-pixel-cell"
            style={{ opacity: cell.lowOpacity }}
            ref={(el) => {
              pixelRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
