"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element chases the cursor, as a fraction of the offset. */
  strength?: number;
  /** Extra reach beyond the element bounds, in px. */
  radius?: number;
}

/** Pulls its child gently toward the cursor, then springs back on exit. */
export default function Magnetic({ children, className, strength = 0.32, radius = 90 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    const falloff = Math.max(0, 1 - dist / (Math.max(r.width, r.height) / 2 + radius));
    x.set(dx * strength * falloff);
    y.set(dy * strength * falloff);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
