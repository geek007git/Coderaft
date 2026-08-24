import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { engagements } from "@/content/site";

/**
 * Two ways to work with the studio. Deliberately asymmetric rows rather than two
 * matched cards — they are different engagements, not two tiers of one product.
 *
 * The three columns swap sides on alternating rows via explicit column starts,
 * so the page keeps moving instead of settling into a repeated block.
 */
export default function Engagements() {
  return (
    <section id="engagements" className="relative py-16 lg:py-24">
      <div className="page">
        <SectionHead
          index="06"
          label="Engagements"
          title={<>Two ways in.</>}
          lead="Same standard in both. Only the scale and the length of the relationship change."
        />

        <div className="mt-10 lg:mt-14">
          {engagements.map((eng, i) => {
            const mirrored = i % 2 === 1;
            const cols = mirrored
              ? { mark: "lg:col-start-11", body: "lg:col-start-5", scope: "lg:col-start-1" }
              : { mark: "lg:col-start-1", body: "lg:col-start-3", scope: "lg:col-start-9" };

            return (
              <Reveal key={eng.id} as="article" delay={i * 0.06}>
                <div className="grid items-start gap-8 border-t border-line py-10 lg:grid-cols-12 lg:gap-14 lg:py-12">
                  {/* Oversized index letter */}
                  <div className={`lg:col-span-2 lg:row-start-1 ${cols.mark}`}>
                    <span
                      className="display block leading-none"
                      style={{
                        fontSize: "clamp(4rem, 9vw, 8rem)",
                        color: "transparent",
                        WebkitTextStroke: "1px var(--color-ink-5)",
                      }}
                      aria-hidden
                    >
                      {eng.index}
                    </span>
                  </div>

                  {/* Statement */}
                  <div className={`lg:col-span-6 lg:row-start-1 ${cols.body}`}>
                    <span className="label mb-4 block">{eng.audience}</span>
                    <h3 className="display text-d4 mb-6 text-ink">{eng.title}</h3>
                    <p className="prose-lead mb-9 max-w-[46ch]">{eng.statement}</p>
                    <a href="#contact" className="action-ghost">
                      {eng.cta}
                      <span aria-hidden>→</span>
                    </a>
                  </div>

                  {/* Scope */}
                  <div className={`lg:col-span-4 lg:row-start-1 ${cols.scope}`}>
                    <span className="label mb-4 block">Scope</span>
                    <ul>
                      {eng.scope.map((item) => (
                        <li
                          key={item}
                          className="mono flex items-baseline gap-3 border-t border-line py-2.5 text-[0.78rem] text-ink-3"
                        >
                          <span className="bg-ink-5 mt-1.5 h-1 w-1 shrink-0 rotate-45" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
