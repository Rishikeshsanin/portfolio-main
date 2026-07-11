"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
    const [isHovering, setIsHovering] = useState(false);
    const hoverStateRef = useRef(false);
    const rafRef = useRef<number | null>(null);
    const latestPointerRef = useRef({ x: 0, y: 0, target: null as EventTarget | null });

    const ringX = useMotionValue(-100);
    const ringY = useMotionValue(-100);
    const springX = useSpring(ringX, { stiffness: 500, damping: 28 });
    const springY = useSpring(ringY, { stiffness: 500, damping: 28 });
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 768px) and (pointer: fine)");
        if (!media.matches) {
            return;
        }

        const flushPointer = () => {
            rafRef.current = null;
            const { x, y, target } = latestPointerRef.current;

            ringX.set(x - 16);
            ringY.set(y - 16);
            dotX.set(x - 4);
            dotY.set(y - 4);

            const element = target as HTMLElement | null;
            const nextHoverState = !!element && (
                element.tagName.toLowerCase() === "a" ||
                element.tagName.toLowerCase() === "button" ||
                element.closest("a") !== null ||
                element.closest("button") !== null ||
                element.closest(".group") !== null
            );

            // Avoid redundant React state writes while moving the mouse.
            if (hoverStateRef.current !== nextHoverState) {
                hoverStateRef.current = nextHoverState;
                setIsHovering(nextHoverState);
            }
        };

        const updateMousePosition = (e: MouseEvent) => {
            latestPointerRef.current = { x: e.clientX, y: e.clientY, target: e.target };
            if (rafRef.current === null) {
                rafRef.current = window.requestAnimationFrame(flushPointer);
            }
        };

        window.addEventListener("mousemove", updateMousePosition, { passive: true });
        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            if (rafRef.current !== null) {
                window.cancelAnimationFrame(rafRef.current);
            }
        };
    }, [dotX, dotY, ringX, ringY]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#10b981] pointer-events-none z-[9999] hidden md:block"
                style={{ x: springX, y: springY }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0 : 0.7
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#059669] pointer-events-none z-[9999] hidden md:block mix-blend-multiply"
                animate={{
                    scale: isHovering ? 6 : 1,
                    backgroundColor: isHovering ? "rgba(16, 185, 129, 0.2)" : "rgba(5, 150, 105, 1)",
                }}
                style={{ x: dotX, y: dotY }}
                transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
            />
        </>
    );
}
