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

/** A numbered field row. The index keeps the form reading as a document. */
function Field({
  index,
  label,
  required,
  children,
  htmlFor,
}: {
  index: string;
  label: string;
  required?: boolean;
  children: ReactNode;
  htmlFor: string;
}) {
  return (
    <div className="grid gap-2 py-5 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
      <label htmlFor={htmlFor} className="label pt-4">
        {index}
      </label>
      <div>
        <label htmlFor={htmlFor} className="label mb-1 block normal-case">
          {label}
          {required && <span className="text-accent"> *</span>}
        </label>
        {children}
      </div>
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
    <section id="contact" className="relative py-16 lg:py-24">
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
                  <span className="mono flex items-center gap-2 text-sm text-accent">
                    <span className="bg-accent pulse-dot h-1.5 w-1.5 rounded-full" />
                    {studio.availability}
                  </span>
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
                <form onSubmit={submit} className="divide-y divide-[var(--color-line)]">
                  <Field index="01" label="Name" required htmlFor="name">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={update}
                      className="field"
                    />
                  </Field>

                  <Field index="02" label="Email" required htmlFor="email">
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

                  <Field index="03" label="Organization or institution" htmlFor="organization">
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

                  <Field index="04" label="Project type" required htmlFor="projectType">
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

                  <Field index="05" label="Industry" htmlFor="industry">
                    <Select
                      id="industry"
                      name="industry"
                      value={form.industry}
                      onChange={update}
                      placeholder="Select industry"
                      options={industries}
                    />
                  </Field>

                  <Field index="06" label="Required technologies" htmlFor="technologies">
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

                  <Field index="07" label="Budget range" htmlFor="budget">
                    <Select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={update}
                      placeholder="Select budget"
                      options={budgetRanges}
                    />
                  </Field>

                  <Field index="08" label="Timeline" htmlFor="timeline">
                    <Select
                      id="timeline"
                      name="timeline"
                      value={form.timeline}
                      onChange={update}
                      placeholder="Select timeline"
                      options={timelines}
                    />
                  </Field>

                  <Field index="09" label="What are you building?" required htmlFor="description">
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

                  <div className="flex flex-wrap items-center justify-between gap-6 pt-8">
                    <p className="label max-w-[28ch] normal-case">
                      No newsletter. No sales call. One engineer, one reply.
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
