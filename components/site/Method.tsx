"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { phases } from "@/content/site";

export default function Method() {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <section id="method" className="relative py-28 lg:py-40">
      <div className="page">
        <SectionHead
          index="05"
          label="Method"
          title={<>Six phases, in order.</>}
          lead="The sequence rarely changes, because the expensive mistakes are always made early. Notes below are the studio's own, written after the projects shipped."
          aside={
            <div className="mono text-sm text-ink-3">
              <div className="text-ink">~9 weeks</div>
              <div className="text-ink-4">typical platform build</div>
            </div>
          }
        />
      </div>

      {/* Horizontal rail — the timeline is read across, not down */}
      <div
        ref={railRef}
        onScroll={onScroll}
        className="rail-x mt-20 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:mt-28"
        style={{
          paddingInline: "var(--rail-inset)",
          scrollPaddingInline: "var(--rail-inset)",
        }}
      >
        {phases.map((phase, i) => (
          <article
            key={phase.index}
            className="group relative flex w-[82vw] shrink-0 snap-start flex-col sm:w-[54vw] lg:w-[27rem]"
          >
            {/* Timeline edge */}
            <div className="mb-7 flex items-center gap-4">
              <span className="mono text-[0.7rem] tracking-[0.16em] text-accent">{phase.index}</span>
              <span className="h-px flex-1 bg-line transition-colors duration-500 group-hover:bg-[var(--color-line-3)]" />
              <span className="label">{phase.duration}</span>
            </div>

            <div className="glass-2 flex-1 rounded-sm p-7 transition-colors duration-500 group-hover:border-[var(--color-line-2)]">
              <h3 className="display mb-4 text-[1.75rem] text-ink">{phase.name}</h3>
              <p className="mb-7 leading-relaxed text-ink-2">{phase.summary}</p>

              <span className="label mb-3 block">Outputs</span>
              <ul className="mb-8 space-y-2">
                {phase.outputs.map((o) => (
                  <li
                    key={o}
                    className="mono flex items-center gap-3 border-t border-line pt-2 text-[0.76rem] text-ink-3"
                  >
                    <span className="bg-ink-5 h-1 w-1 rotate-45" />
                    {o}
                  </li>
                ))}
              </ul>

              {/* The human voice */}
              <blockquote className="border-l-2 border-accent pl-5">
                <p className="editorial text-[1.05rem] leading-relaxed text-ink-2">{phase.note}</p>
              </blockquote>
            </div>

            {i === phases.length - 1 && (
              <span className="label absolute -right-2 -bottom-8 hidden lg:block">end</span>
            )}
          </article>
        ))}
      </div>

      {/* Rail position */}
      <div className="page mt-8">
        <Reveal>
          <div className="flex items-center gap-5">
            <div className="h-px flex-1 bg-line">
              <div
                className="bg-accent h-px origin-left transition-transform duration-150"
                style={{ transform: `scaleX(${Math.max(0.06, progress)})` }}
              />
            </div>
            <span className="label hidden sm:block">Scroll the timeline</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
