import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { sectors } from "@/content/site";

/**
 * Twelve sectors is reference material, not a gallery — so it is set as an index
 * rather than a selector with a detail panel. Systems already owns the
 * list-plus-panel pattern; repeating it here would make two adjacent movements
 * read as one template used twice.
 *
 * Being a plain table also means no state, no client bundle.
 */
export default function Sectors() {
  return (
    <section id="sectors" className="movement-tight relative">
      <div className="page">
        <SectionHead
          index="04"
          label="Sectors"
          title={<>Where the work lands.</>}
          lead="Twelve sectors, seventy-five systems. The domain language changes far more than the architecture does."
          aside={
            <div className="mono text-sm text-ink-3">
              <div className="tnum text-ink">75 systems</div>
              <div className="text-ink-4">2021—2024</div>
            </div>
          }
        />

        <Reveal delay={0.06}>
          <div className="mt-10 lg:mt-14">
            {/* Column headings, shown once — the rows below inherit their meaning
                from here rather than repeating a label each time. */}
            <div className="label hidden grid-cols-12 gap-8 border-b border-line-2 pb-3 lg:grid">
              <span className="col-span-3">Sector</span>
              <span className="col-span-5">Focus</span>
              <span className="col-span-3">Typical systems</span>
              <span className="col-span-1 text-right">Built</span>
            </div>

            <ul>
              {sectors.map((sector) => (
                <li
                  key={sector.id}
                  className="group grid grid-cols-1 gap-x-8 gap-y-3 border-b border-line py-6 transition-colors duration-300 hover:border-line-3 lg:grid-cols-12 lg:items-baseline"
                >
                  <h3 className="display col-span-3 text-[1.5rem] text-ink transition-transform duration-500 group-hover:translate-x-1 lg:text-[1.75rem]">
                    {sector.name}
                  </h3>

                  <p className="col-span-5 leading-relaxed text-ink-2">{sector.focus}</p>

                  <ul className="col-span-3 flex flex-wrap gap-x-4 gap-y-1.5">
                    {sector.systems.map((sys) => (
                      <li key={sys} className="mono text-[0.78rem] text-ink-4">
                        {sys}
                      </li>
                    ))}
                  </ul>

                  <span className="mono tnum col-span-1 text-[0.8rem] text-ink-3 lg:text-right">
                    {sector.projects}
                    <span className="ml-1.5 text-ink-4 lg:hidden">built</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
