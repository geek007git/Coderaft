"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { projectVisuals } from "@/components/visuals/ProjectVisuals";
import { projects, type Project } from "@/content/site";

/** Status reads as a build stage, with only the shipped state carrying accent. */
function Status({ status }: { status: Project["status"] }) {
  const live = status === "DEPLOYED";
  return (
    <span className="label flex items-center gap-2.5" style={{ color: live ? "var(--color-accent)" : undefined }}>
      <span
        className="h-1 w-1 rotate-45"
        style={{ background: live ? "var(--color-accent)" : "var(--color-ink-4)" }}
      />
      {status}
    </span>
  );
}

function Metrics({ metrics }: { metrics: Project["metrics"] }) {
  return (
    <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-line bg-[rgba(255,255,255,0.05)]">
      {metrics.map((m) => (
        <div key={m.label} className="bg-[rgba(17,19,22,0.88)] px-3 py-4">
          <dt className="label mb-2 text-[0.6rem]">{m.label}</dt>
          <dd className="mono tnum text-lg text-ink lg:text-xl">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The framed product render. Corner ticks read as a technical crop, not a card. */
function Visual({ id, name }: { id: string; name: string }) {
  const Render = projectVisuals[id];
  return (
    <div className="group/vis lift relative aspect-[8/5] w-full overflow-hidden rounded-lg border border-line bg-[rgba(11,12,14,0.75)]">
      <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/vis:scale-[1.025]">
        {Render ? <Render /> : null}
      </div>

      {/* Crop marks */}
      {[
        "left-3 top-3 border-l border-t",
        "right-3 top-3 border-r border-t",
        "left-3 bottom-3 border-l border-b",
        "right-3 bottom-3 border-r border-b",
      ].map((pos) => (
        <span
          key={pos}
          className={`pointer-events-none absolute h-3 w-3 border-ink-4 opacity-0 transition-opacity duration-500 group-hover/vis:opacity-100 ${pos}`}
        />
      ))}

      <span className="sr-only">{name} interface</span>
    </div>
  );
}

function CaseStudy({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <div className="mt-8 grid gap-8 border-t border-line pt-8 md:grid-cols-3">
        <div>
          <h4 className="label mb-3">Architecture</h4>
          <p className="text-sm leading-relaxed text-ink-2">{project.architecture}</p>
        </div>
        <div>
          <h4 className="label mb-3">Outcome</h4>
          <p className="text-sm leading-relaxed text-ink-2">{project.outcome}</p>
        </div>
        <div className="border-l-2 border-accent-dim pl-5">
          <h4 className="label mb-3">Engineering note</h4>
          <p className="editorial text-base leading-relaxed text-ink-2">{project.note}</p>
        </div>
      </div>
    </motion.div>
  );
}

function Entry({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const panelId = `case-${project.id}`;

  const identity = (
    <div>
      <div className="mb-5 flex items-baseline gap-4">
        <span className="mono text-[0.7rem] tracking-[0.16em] text-ink-3">
          PROJECT / {project.num}
        </span>
        <span className="h-px flex-1 bg-line" />
        <span className="label">{project.year}</span>
      </div>

      <h3 className="display text-d4 mb-4 text-ink lg:text-[2.6rem]">{project.name}</h3>

      <p className="mb-7 max-w-[46ch] leading-relaxed text-ink-2">{project.summary}</p>

      <div className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2">
        {project.stack.map((tech, i) => (
          <span key={tech} className="mono flex items-center gap-3 text-[0.72rem] text-ink-3">
            {tech}
            {i < project.stack.length - 1 && <span className="text-ink-5">·</span>}
          </span>
        ))}
      </div>
    </div>
  );

  const controls = (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
      <Status status={project.status} />
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="label group/btn flex items-center gap-3 text-ink transition-colors hover:text-accent"
      >
        {open ? "Close case study" : "View case study"}
        <span
          className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1"
          aria-hidden
        >
          {open ? "−" : "→"}
        </span>
      </button>
    </div>
  );

  /* -------- Full-bleed composition: the visual leads, metadata follows ----- */
  if (project.layout === "wide") {
    return (
      <Reveal as="article" delay={0.04}>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">{identity}</div>
          <div className="lg:col-span-8">
            <Visual id={project.id} name={project.name} />
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="label mb-3 block">Sector · Discipline</span>
            <p className="mono text-sm text-ink-2">
              {project.sector} — {project.discipline}
            </p>
          </div>
          <div className="lg:col-span-5">
            <Metrics metrics={project.metrics} />
          </div>
          <div className="flex items-end lg:col-span-3">
            <div className="w-full">{controls}</div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <div id={panelId}>
              <CaseStudy project={project} />
            </div>
          )}
        </AnimatePresence>
      </Reveal>
    );
  }

  /* -------- Split compositions, mirrored so the rhythm never repeats ------- */
  const visualFirst = project.layout === "left";

  return (
    <Reveal as="article" delay={0.04}>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Explicit placement on both columns — mixing `order` with `col-start`
            in one grid makes auto-placement unpredictable. */}
        <div
          className={`lg:col-span-7 lg:row-start-1 ${visualFirst ? "lg:col-start-1" : "lg:col-start-6"}`}
        >
          <Visual id={project.id} name={project.name} />
        </div>

        <div
          className={`lg:col-span-5 lg:row-start-1 ${visualFirst ? "lg:col-start-8" : "lg:col-start-1"}`}
        >
          {identity}
          <div className="mb-7">
            <Metrics metrics={project.metrics} />
          </div>
          <p className="label mb-5">
            {project.sector} — {project.discipline}
          </p>
          {controls}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <div id={panelId}>
            <CaseStudy project={project} />
          </div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" className="movement-open relative">
      <div className="page">
        <SectionHead
          index="01"
          label="Selected work"
          title={<>Systems in production.</>}
          lead="No mockups. No 'coming soon.' Production or it didn't happen."
          aside={
            <div className="mono text-sm text-ink-3">
              <div className="text-ink">{projects.length} shown</div>
              <div className="text-ink-4">75 delivered</div>
            </div>
          }
        />

        <div className="mt-12 space-y-16 lg:mt-16 lg:space-y-24">
          {projects.map((project) => (
            <Entry key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
