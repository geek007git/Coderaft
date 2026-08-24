"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { sectors } from "@/content/site";

/**
 * A signal trace unique to each sector — derived from the name, so every sector
 * gets a distinct but consistent mark without shipping twelve illustrations.
 */
function SectorTrace({ seed }: { seed: string }) {
  const code = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const points = Array.from({ length: 28 }, (_, i) => {
    const v = Math.sin((i + code) / 3.1) * 0.5 + Math.sin((i * (code % 7) + code) / 5.7) * 0.4;
    const x = Math.round((i / 27) * 300 * 100) / 100;
    const y = Math.round((60 - v * 42) * 100) / 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 300 120" fill="none" className="h-20 w-full" aria-hidden>
      <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.07)" />
      <polyline points={points} stroke="var(--color-accent)" strokeWidth="1.3" />
    </svg>
  );
}

export default function Sectors() {
  const [activeId, setActiveId] = useState(sectors[0].id);
  const active = sectors.find((s) => s.id === activeId) ?? sectors[0];

  return (
    <section id="sectors" className="relative py-28 lg:py-40">
      <div className="page">
        <SectionHead
          index="04"
          label="Sectors"
          title={<>Where the work lands.</>}
          lead="The engineering is the same discipline everywhere. What changes is the failure that matters most — a rounding error, a dropped record, an hour of downtime."
        />

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          {/* The typographic index */}
          <div className="lg:col-span-7">
            <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
              {sectors.map((sector) => {
                const on = sector.id === active.id;
                return (
                  <li key={sector.id}>
                    <button
                      onMouseEnter={() => setActiveId(sector.id)}
                      onFocus={() => setActiveId(sector.id)}
                      onClick={() => setActiveId(sector.id)}
                      aria-pressed={on}
                      className="display block py-1 text-[2rem] transition-all duration-300 sm:text-[2.6rem] lg:text-[3.1rem]"
                      style={{
                        color: on ? "var(--color-ink)" : "var(--color-ink-5)",
                        transform: on ? "translateY(-2px)" : "none",
                      }}
                    >
                      {sector.name}
                      <sup className="mono ml-1.5 align-super text-[0.62rem] tracking-normal">
                        {sector.projects}
                      </sup>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Preview */}
          <div className="lg:col-span-5">
            <Reveal from="right">
              <div className="glass-2 rounded-sm p-7 lg:sticky lg:top-28">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="mb-5 flex items-baseline justify-between">
                      <span className="label label-accent">{active.name}</span>
                      <span className="mono text-[0.7rem] text-ink-4">
                        {active.projects} SYSTEMS
                      </span>
                    </div>

                    <SectorTrace seed={active.id} />

                    <p className="mt-5 mb-7 leading-relaxed text-ink-2">{active.focus}</p>

                    <span className="label mb-3 block">Typical scope</span>
                    <ul className="space-y-2">
                      {active.systems.map((sys) => (
                        <li
                          key={sys}
                          className="mono flex items-center gap-3 border-t border-line pt-2 text-[0.78rem] text-ink-3"
                        >
                          <span className="bg-ink-5 h-1 w-1 rotate-45" />
                          {sys}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
