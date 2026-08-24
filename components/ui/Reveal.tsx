"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type From = "up" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  from?: From;
  delay?: number;
  /** Travel distance in px. Kept small — entrances should be felt, not watched. */
  distance?: number;
  as?: "div" | "section" | "header" | "li" | "article";
}

const offset = (from: From, d: number) => {
  switch (from) {
    case "up":
      return { y: d };
    case "left":
      return { x: -d };
    case "right":
      return { x: d };
    default:
      return {};
  }
};

/**
 * The ref is shared across every element `as` can render, so it has to satisfy
 * all of them at once.
 */
type RevealElement = HTMLDivElement & HTMLElement & HTMLLIElement;

/**
 * The single scroll-entrance used across the site, so every section arrives with
 * the same weight and timing.
 */
export default function Reveal({
  children,
  className,
  from = "up",
  delay = 0,
  distance = 22,
  as = "div",
}: RevealProps) {
  const ref = useRef<RevealElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -8% 0px" });
  const reduced = useReducedMotion();

  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset(from, distance) }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Reveals each child in sequence. Used for lists where the order carries meaning
 * — process phases, principles, capability disciplines.
 */
export function RevealList({
  children,
  className,
  stagger = 0.05,
}: {
  children: ReactNode[];
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: i * stagger, ease: [0.16, 1, 0.3, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
