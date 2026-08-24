"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { tiers } from "@/content/site";

/** Packets descending the spine, so the diagram reads as a live request path. */
function Spine() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute top-0 bottom-0 left-0 hidden w-px bg-line md:block">
      {!reduced &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="bg-steel absolute left-1/2 h-10 w-px -translate-x-1/2"
            style={{
              maskImage: "linear-gradient(180deg, transparent, #000)",
              WebkitMaskImage: "linear-gradient(180deg, transparent, #000)",
            }}
            initial={{ top: "-10%" }}
            animate={{ top: "105%" }}
            transition={{
              duration: 5.5,
              delay: i * 1.85,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
    </div>
  );
}

export default function Systems() {
  const [activeId, setActiveId] = useState(tiers[2].id);
  const active = tiers.find((t) => t.id === activeId) ?? tiers[0];

  return (
    <section id="systems" className="relative py-28 lg:py-40">
      {/* This movement sits on its own ground so the architecture reads as a plate */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(17,19,22,0.7) 12%, rgba(17,19,22,0.7) 88%, transparent)",
        }}
        aria-hidden
      />

      <div className="page relative">
        <SectionHead
          index="03"
          label="Systems"
          title={<>How a request moves.</>}
          lead="Every platform we build resolves to the same seven tiers. The names change with the domain; the responsibilities do not. Select a tier to read what it owns."
          aside={
            <div className="mono text-sm">
              <div className="text-accent">7 tiers</div>
              <div className="text-ink-4">one request path</div>
            </div>
          }
        />

        <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          {/* The path */}
          <div className="relative lg:col-span-7">
            <Spine />

            <ul className="md:pl-10">
              {tiers.map((tier) => {
                const on = tier.id === active.id;
                return (
                  <li key={tier.id}>
                    <button
                      onClick={() => setActiveId(tier.id)}
                      onMouseEnter={() => setActiveId(tier.id)}
                      onFocus={() => setActiveId(tier.id)}
                      aria-pressed={on}
                      className="group relative grid w-full grid-cols-[2.5rem_1fr] items-baseline gap-x-5 border-t border-line py-6 text-left transition-colors duration-300 last:border-b sm:grid-cols-[2.5rem_1fr_auto]"
                    >
                      {/* Node on the spine */}
                      <span
                        className="absolute top-1/2 -left-10 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 transition-all duration-300 md:block"
                        style={{
                          background: on ? "var(--color-accent)" : "var(--color-ink-4)",
                          scale: on ? "1.5" : "1",
                        }}
                        aria-hidden
                      />

                      <span
                        className="index-num transition-colors duration-300"
                        style={{ color: on ? "var(--color-accent)" : undefined }}
                      >
                        {tier.index}
                      </span>

                      <span
                        className="display text-[1.6rem] transition-all duration-300 sm:text-[2rem]"
                        style={{
                          color: on ? "var(--color-ink)" : "var(--color-ink-4)",
                          transform: on ? "translateX(6px)" : "none",
                        }}
                      >
                        {tier.name}
                      </span>

                      <span className="label hidden max-w-[22ch] text-right normal-case sm:block">
                        {tier.role}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Detail — primary glass, because it is the panel you operate */}
          <div className="lg:col-span-5">
            <Reveal from="right">
              <div className="glass-1 glass-edge rounded-sm p-7 lg:sticky lg:top-28 lg:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <span className="mono text-[0.7rem] tracking-[0.16em] text-accent">
                        TIER {active.index}
                      </span>
                      <span className="label">{active.metric.label}</span>
                    </div>

                    <h3 className="display mb-2 text-[2rem] text-ink">{active.name}</h3>
                    <p className="label mb-6 normal-case">{active.role}</p>

                    <p className="mb-8 leading-relaxed text-ink-2">{active.detail}</p>

                    <div className="mb-8">
                      <span className="label mb-3 block">Components</span>
                      <ul className="flex flex-wrap gap-x-4 gap-y-2">
                        {active.components.map((c) => (
                          <li key={c} className="mono text-[0.78rem] text-ink-2">
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-baseline justify-between border-t border-line pt-5">
                      <span className="label">{active.metric.label}</span>
                      <span className="mono text-2xl text-accent">{active.metric.value}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>

        {/* The path, stated plainly */}
        <Reveal delay={0.1}>
          <div className="rail-x fade-edges mt-16 overflow-x-auto border-t border-line pt-5">
            <div className="mono flex items-center gap-3 whitespace-nowrap text-[0.72rem] text-ink-4">
              {tiers.map((t, i) => (
                <span key={t.id} className="flex items-center gap-3">
                  <span style={{ color: t.id === active.id ? "var(--color-accent)" : undefined }}>
                    {t.name.toUpperCase()}
                  </span>
                  {i < tiers.length - 1 && <span className="text-ink-4">→</span>}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
