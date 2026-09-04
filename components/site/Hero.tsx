"use client";

import { motion, useReducedMotion } from "framer-motion";
import SystemStack from "@/components/visuals/SystemStack";
import { heroDisciplines, studio } from "@/content/site";

const HEADLINE = [
  { text: "We engineer", metal: false },
  { text: "software", metal: false },
  { text: "that holds.", metal: true },
];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative min-h-svh overflow-hidden">
      <div className="page relative flex min-h-svh flex-col justify-between pt-28 pb-6 lg:pt-32">
        {/* Studio metadata */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-line pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="label">
            {studio.location} — Est. {studio.established}
          </span>
          <span className="label flex items-center gap-2">
            <span className="bg-accent pulse-dot h-1.5 w-1.5 rounded-full" />
            {studio.availability}
          </span>
        </motion.div>

        {/* Statement over structure */}
        <div className="relative grid flex-1 items-center gap-y-10 py-10 lg:grid-cols-12 lg:py-0">
          {/* The visual sits behind and to the right; the headline crosses over it. */}
          <div className="pointer-events-none relative order-2 h-[46vh] min-h-[320px] lg:pointer-events-auto lg:order-none lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:h-[74vh] lg:min-h-[540px]">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <SystemStack />
            </motion.div>
          </div>

          {/* Headline */}
          <div className="relative z-10 order-1 lg:order-none lg:col-span-7 lg:row-start-1">
            <h1 className="display display-tight text-d1">
              {HEADLINE.map((line, i) => (
                <span key={line.text} className="line-mask">
                  <motion.span
                    className={line.metal ? "display-plate" : "block"}
                    initial={reduced ? undefined : { y: "108%" }}
                    animate={reduced ? undefined : { y: 0 }}
                    transition={{ duration: 1.1, delay: 0.25 + i * 0.11, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="editorial mt-8 max-w-[38ch] text-xl text-ink-2 lg:text-[1.7rem] lg:leading-snug"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75 }}
            >
              Launch day is easy. We build for <span className="text-accent">year three</span> —
              when traffic has tripled and we&apos;re no longer in the room.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.88 }}
            >
              <a href="#work" className="action-ghost">
                Selected work
              </a>
              <a href="#contact" className="action">
                Start a project
              </a>
            </motion.div>
          </div>
        </div>

        {/* Disciplines — the practice, stated as an index */}
        <motion.div
          className="border-t border-line pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1 }}
        >
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {heroDisciplines.map((d) => (
              <li key={d} className="label">
                {d}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
