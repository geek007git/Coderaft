"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/** Diameter of the ambient cursor light, in px. */
const LIGHT = 900;

/**
 * The page's atmosphere: a deep vertical wash, one low-intensity accent bloom,
 * an architectural grid, an ambient cursor light, and grain.
 *
 * Deliberately restrained — no drifting blobs. It exists to give the glass
 * something to refract and to keep the large dark areas from banding.
 */
export default function Backdrop() {
  const reduced = useReducedMotion();

  const lx = useMotionValue(-9999);
  const ly = useMotionValue(-9999);
  const x = useSpring(lx, { stiffness: 45, damping: 24, mass: 0.9 });
  const y = useSpring(ly, { stiffness: 45, damping: 24, mass: 0.9 });

  useEffect(() => {
    if (reduced) return;

    // Seat the light before the first move so it never sweeps in from off-screen.
    const cx = window.innerWidth * 0.68 - LIGHT / 2;
    const cy = window.innerHeight * 0.3 - LIGHT / 2;
    lx.jump(cx);
    ly.jump(cy);
    x.jump(cx);
    y.jump(cy);

    const onMove = (e: PointerEvent) => {
      lx.set(e.clientX - LIGHT / 2);
      ly.set(e.clientY - LIGHT / 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [lx, ly, x, y, reduced]);

  return (
    <div className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Base wash — lighter at the top, settling into the void below the fold */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0d1013 0%, #0a0b0e 38%, #07080a 72%, #060709 100%)",
        }}
      />

      {/* A single accent bloom, low intensity, anchored to the hero */}
      <div
        className="absolute"
        style={{
          top: "-24%",
          right: "-10%",
          width: "70vw",
          height: "70vw",
          maxWidth: 1100,
          maxHeight: 1100,
          background:
            "radial-gradient(circle, rgba(35,209,139,0.11) 0%, rgba(35,209,139,0.03) 38%, transparent 68%)",
          filter: "blur(20px)",
        }}
      />

      {/* Cool counterweight so the accent does not tint the whole page */}
      <div
        className="absolute"
        style={{
          bottom: "-30%",
          left: "-15%",
          width: "60vw",
          height: "60vw",
          maxWidth: 900,
          maxHeight: 900,
          background: "radial-gradient(circle, rgba(120,150,180,0.05) 0%, transparent 65%)",
          filter: "blur(30px)",
        }}
      />

      {/* Architectural grid — an engineering drawing, faded out at the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(ellipse 120% 80% at 50% 0%, #000 10%, rgba(0,0,0,0.35) 55%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 120% 80% at 50% 0%, #000 10%, rgba(0,0,0,0.35) 55%, transparent 90%)",
        }}
      />

      {/* Ambient cursor light — transform-driven, so tracking stays on the compositor */}
      {!reduced && (
        <motion.div
          className="absolute top-0 left-0 rounded-full"
          style={{
            x,
            y,
            width: LIGHT,
            height: LIGHT,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.045) 0%, rgba(35,209,139,0.03) 40%, transparent 68%)",
          }}
        />
      )}

      {/* Vignette keeps the edges heavy so content holds the centre */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 40%, transparent 45%, rgba(4,5,7,0.7) 100%)",
        }}
      />
    </div>
  );
}
