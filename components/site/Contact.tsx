"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import {
  budgetRanges,
  industries,
  projectTypes,
  studio,
  timelines,
} from "@/content/site";

type FormState = {
  name: string;
  email: string;
  organization: string;
  projectType: string;
  industry: string;
  technologies: string;
  budget: string;
  timeline: string;
  description: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  organization: "",
  projectType: "",
  industry: "",
  technologies: "",
  budget: "",
  timeline: "",
  description: "",
};

/** One field row. Short fields sit two-up on wider screens so the form reads as
 *  a form rather than a nine-item questionnaire. */
function Field({
  label,
  required,
  children,
  htmlFor,
  wide,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  htmlFor: string;
  /** Span both columns — for the long-form fields. */
  wide?: boolean;
}) {
  return (
    <div className={wide ? "py-5 sm:col-span-2" : "py-5"}>
      <label htmlFor={htmlFor} className="label mb-1 block normal-case">
        {label}
        {required && <span className="text-ink-4"> (required)</span>}
      </label>
      {children}
    </div>
  );
}

function Select({
  id,
  name,
  value,
  onChange,
  placeholder,
  options,
  required,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  options: readonly string[];
  required?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="field pr-8"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-1 bottom-4 text-ink-4" aria-hidden>
        ↓
      </span>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  return (
    <section id="contact" className="movement-open relative">
      <div className="page">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Statement */}
          <div className="lg:col-span-5">
            <Reveal from="left">
              <div className="mb-8 flex items-baseline gap-3">
                <span className="index-num">08</span>
                <span className="label">Contact</span>
              </div>

              <h2 className="display text-d3 mb-8 text-ink">
                Tell us what
                <br />
                you are building.
              </h2>

              <p className="prose-lead mb-8 max-w-[40ch]">
                Send the problem, not a specification. An engineer replies within 24 hours.
              </p>

              <div className="space-y-4 border-t border-line pt-8">
                <div className="flex items-baseline justify-between gap-6">
                  <span className="label">Direct</span>
                  <a
                    href={`mailto:${studio.email}`}
                    className="mono link-underline text-sm text-ink"
                  >
                    {studio.email}
                  </a>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <span className="label">Response</span>
                  <span className="mono text-sm text-ink-2">Within 24 hours</span>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <span className="label">Status</span>
                  <span className="mono text-sm text-accent">{studio.availability}</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="glass-1 glass-edge rounded-lg p-10 lg:p-14"
                role="status"
              >
                <span className="label label-accent mb-6 block">Received</span>
                <h3 className="display mb-5 text-[2rem] text-ink">
                  Your brief is with the team.
                </h3>
                <p className="max-w-[44ch] leading-relaxed text-ink-2">
                  We read every inquiry ourselves. Expect a reply from an engineer, not a form
                  autoresponder, within 24 hours.
                </p>
                <p className="mono mt-8 border-t border-line pt-6 text-sm text-ink-4">
                  REF — {form.projectType || "GENERAL"} · {new Date().getFullYear()}
                </p>
              </motion.div>
            ) : (
              <Reveal from="right">
                <form onSubmit={submit} className="grid gap-x-10 sm:grid-cols-2">
                  <Field label="Name" required htmlFor="name">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={update}
                      className="field"
                    />
                  </Field>

                  <Field label="Email" required htmlFor="email">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={update}
                      className="field"
                    />
                  </Field>

                  <Field label="Organization or institution" htmlFor="organization" wide>
                    <input
                      id="organization"
                      type="text"
                      name="organization"
                      placeholder="Company, college or university"
                      value={form.organization}
                      onChange={update}
                      className="field"
                    />
                  </Field>

                  <Field label="Project type" required htmlFor="projectType">
                    <Select
                      id="projectType"
                      name="projectType"
                      required
                      value={form.projectType}
                      onChange={update}
                      placeholder="Select type"
                      options={projectTypes}
                    />
                  </Field>

                  <Field label="Industry" htmlFor="industry">
                    <Select
                      id="industry"
                      name="industry"
                      value={form.industry}
                      onChange={update}
                      placeholder="Select industry"
                      options={industries}
                    />
                  </Field>

                  <Field label="Required technologies" htmlFor="technologies" wide>
                    <input
                      id="technologies"
                      type="text"
                      name="technologies"
                      placeholder="e.g. React, Python, AWS — or leave blank"
                      value={form.technologies}
                      onChange={update}
                      className="field"
                    />
                  </Field>

                  <Field label="Budget range" htmlFor="budget">
                    <Select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={update}
                      placeholder="Select budget"
                      options={budgetRanges}
                    />
                  </Field>

                  <Field label="Timeline" htmlFor="timeline">
                    <Select
                      id="timeline"
                      name="timeline"
                      value={form.timeline}
                      onChange={update}
                      placeholder="Select timeline"
                      options={timelines}
                    />
                  </Field>

                  <Field label="What are you building?" required htmlFor="description" wide>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={5}
                      placeholder="What it needs to do, what it must never do, and what success looks like."
                      value={form.description}
                      onChange={update}
                      className="field"
                    />
                  </Field>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8 sm:col-span-2">
                    <p className="label max-w-[28ch] normal-case">
                      We reply to everything, including the projects we turn down.
                    </p>
                    <button type="submit" disabled={sending} className="action">
                      {sending ? "Sending…" : "Send brief"}
                      {!sending && <span aria-hidden>→</span>}
                    </button>
                  </div>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
