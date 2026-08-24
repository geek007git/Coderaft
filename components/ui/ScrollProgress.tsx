"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A hairline read-progress indicator.
 *
 * Kept because it reports position in a long editorial page — it communicates
 * structure rather than decorating.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="bg-accent fixed inset-x-0 top-0 z-[70] h-px origin-left"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
