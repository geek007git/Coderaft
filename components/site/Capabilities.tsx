"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { capabilities } from "@/content/site";

/**
 * A distinguishing mark per capability, drawn in the vocabulary of that
 * discipline — an interface, a graph, a vector field, a boundary.
 */
const glyphs: Record<string, ReactNode> = {
  product: (
    <>
      <rect x="6" y="10" width="52" height="44" rx="2" />
      <line x1="6" y1="20" x2="58" y2="20" />
      <rect x="12" y="27" width="20" height="20" rx="1" />
      <line x1="38" y1="28" x2="52" y2="28" />
      <line x1="38" y1="35" x2="48" y2="35" />
      <line x1="38" y1="42" x2="52" y2="42" />
    </>
  ),
  systems: (
    <>
      <circle cx="32" cy="14" r="4" />
      <circle cx="13" cy="42" r="4" />
      <circle cx="32" cy="52" r="4" />
      <circle cx="51" cy="42" r="4" />
      <line x1="32" y1="18" x2="15" y2="38" />
      <line x1="32" y1="18" x2="49" y2="38" />
      <line x1="16" y1="44" x2="28" y2="50" />
      <line x1="48" y1="44" x2="36" y2="50" />
      <line x1="17" y1="42" x2="47" y2="42" strokeDasharray="2 3" />
    </>
  ),
  intelligent: (
    <>
      <line x1="10" y1="46" x2="54" y2="46" />
      <line x1="10" y1="46" x2="10" y2="16" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx={16 + i * 7} cy={40 - i * 4 + (i % 2) * 3} r="1.8" />
      ))}
      <path d="M14 42 C 26 34, 38 26, 54 18" strokeDasharray="3 3" />
      <rect x="40" y="10" width="14" height="14" rx="1" />
    </>
  ),
  security: (
    <>
      <path d="M32 8 L52 17 V34 C52 45 42 52 32 56 C22 52 12 45 12 34 V17 Z" />
      <path d="M32 18 L43 23 V34 C43 40 37 44 32 46 C27 44 21 40 21 34 V23 Z" strokeDasharray="2 3" />
      <circle cx="32" cy="31" r="4" />
      <line x1="32" y1="35" x2="32" y2="40" />
    </>
  ),
};

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-16 lg:py-24">
      <div className="page">
        <SectionHead
          index="02"
          label="Capabilities"
          title={<>Four practices, one team.</>}
          lead="The people who design it are the people on call for it. Incentives do the rest."
        />

        <div className="mt-10 lg:mt-14">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.id} as="article" delay={i * 0.05}>
              <div className="group grid gap-6 border-t border-line py-8 transition-colors duration-500 hover:border-line-3 lg:grid-cols-12 lg:gap-10 lg:py-10">
                {/* Index + glyph */}
                <div className="flex items-start gap-6 lg:col-span-3 lg:flex-col lg:gap-8">
                  <span className="index-num pt-1">{cap.index}</span>
                  <svg
                    viewBox="0 0 64 64"
                    className="h-14 w-14 shrink-0 transition-colors duration-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="square"
                    style={{ color: "var(--color-ink-4)" }}
                    aria-hidden
                  >
                    <g className="transition-[stroke] duration-500 group-hover:stroke-[var(--color-accent)]">
                      {glyphs[cap.id]}
                    </g>
                  </svg>
                </div>

                {/* Statement */}
                <div className="lg:col-span-5">
                  <h3 className="display mb-5 text-[1.9rem] text-ink transition-transform duration-500 group-hover:translate-x-1 lg:text-[2.4rem]">
                    {cap.title}
                  </h3>
                  <p className="max-w-[42ch] leading-relaxed text-ink-2">{cap.statement}</p>
                </div>

                {/* Disciplines */}
                <div className="lg:col-span-4">
                  <span className="label mb-4 block">Disciplines</span>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                    {cap.disciplines.map((d) => (
                      <li key={d} className="mono text-[0.78rem] text-ink-3">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
