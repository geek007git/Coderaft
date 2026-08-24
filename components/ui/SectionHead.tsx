import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadProps {
  /** Section index, e.g. "02". */
  index: string;
  /** Short technical label shown in the left rail. */
  label: string;
  /** The display statement. */
  title: ReactNode;
  /** Optional supporting paragraph. */
  lead?: ReactNode;
  /** Optional right-aligned metadata. */
  aside?: ReactNode;
}

/**
 * The recurring section opening: a technical rail on the left, a display
 * statement on the right. Using it everywhere is what makes the page read as one
 * system rather than a stack of unrelated blocks.
 */
export default function SectionHead({ index, label, title, lead, aside }: SectionHeadProps) {
  return (
    <header className="rail">
      <Reveal from="left">
        <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
          <span className="index-num">{index}</span>
          <span className="label">{label}</span>
          <span className="mt-4 hidden h-px w-10 bg-line-2 md:block" />
        </div>
      </Reveal>

      <div>
        <Reveal>
          <h2 className="display text-d3 max-w-[18ch] text-ink">{title}</h2>
        </Reveal>

        {(lead || aside) && (
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-col gap-8 border-t border-line pt-8 lg:flex-row lg:items-start lg:justify-between">
              {lead && <p className="prose-lead max-w-[52ch]">{lead}</p>}
              {aside && <div className="shrink-0 lg:text-right">{aside}</div>}
            </div>
          </Reveal>
        )}
      </div>
    </header>
  );
}
