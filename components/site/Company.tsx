import Reveal, { RevealList } from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { principles, stackIndex, studio, studioStats } from "@/content/site";

export default function Company() {
  return (
    <section id="company" className="relative py-28 lg:py-40">
      <div className="page">
        <SectionHead
          index="07"
          label="Company"
          title={<>An engineering studio.</>}
          lead={
            <>
              {studio.name} designs, builds, and operates software systems. We work across the stack
              because the interesting failures happen between the layers — and someone has to own
              the whole path.
            </>
          }
        />

        {/* Studio figures */}
        <Reveal delay={0.08}>
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-line bg-[rgba(255,255,255,0.05)] lg:mt-20 lg:grid-cols-4">
            {studioStats.map((s) => (
              <div key={s.label} className="bg-[rgba(17,19,22,0.92)] px-6 py-8">
                <dt className="label mb-3">{s.label}</dt>
                <dd className="display text-[2.2rem] text-ink lg:text-[2.8rem]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Principles */}
        <div className="mt-24 rail lg:mt-32">
          <Reveal from="left">
            <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
              <span className="index-num">07.1</span>
              <span className="label">Principles</span>
            </div>
          </Reveal>

          <RevealList className="grid gap-x-14 gap-y-10 md:grid-cols-2" stagger={0.06}>
            {principles.map((p) => (
              <div key={p.index} className="border-t border-line pt-6">
                <div className="mb-3 flex items-baseline gap-4">
                  <span className="index-num">{p.index}</span>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">{p.title}</h3>
                </div>
                <p className="pl-[2.6rem] text-sm leading-relaxed text-ink-3">{p.body}</p>
              </div>
            ))}
          </RevealList>
        </div>

        {/* Stack index — dense technical counterpoint to the display type above */}
        <div className="mt-24 rail lg:mt-32">
          <Reveal from="left">
            <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
              <span className="index-num">07.2</span>
              <span className="label">Stack index</span>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {stackIndex.map((group) => (
                <div key={group.group}>
                  <h3 className="label mb-4 border-b border-line pb-2">{group.group}</h3>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="mono text-[0.78rem] text-ink-3">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
