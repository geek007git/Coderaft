"use client";

import { footerLinks, studio } from "@/content/site";

const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

export default function Footer() {
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-line pt-20 pb-10">
      <div className="page">
        {/* Wordmark as a closing statement */}
        <div className="mb-20 overflow-hidden">
          <span
            className="display block leading-[0.8] text-ink"
            style={{ fontSize: "clamp(3.5rem, 17vw, 17rem)", letterSpacing: "-0.05em" }}
          >
            {studio.name}
          </span>
        </div>

        <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-12">
          {/* Studio */}
          <div className="lg:col-span-4">
            <p className="label mb-5">{studio.role}</p>
            <p className="mb-8 max-w-[32ch] leading-relaxed text-ink-3">
              We design, engineer, deploy, and operate software systems — and stay reachable after
              handover.
            </p>
            <a href={`mailto:${studio.email}`} className="mono link-underline text-sm text-ink">
              {studio.email}
            </a>
          </div>

          {/* Index */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <nav key={group} className="lg:col-span-2" aria-label={group}>
              <h2 className="label mb-5">{group}</h2>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => go(e, link.href)}
                      className="text-sm text-ink-3 transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Elsewhere */}
          <div className="lg:col-span-2">
            <h2 className="label mb-5">Elsewhere</h2>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-3 transition-colors hover:text-ink"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Colophon */}
        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {new Date().getFullYear()} {studio.name} — {studio.location}
          </p>
          <p className="label">
            Built with Next.js · Type set in Archivo, Instrument Serif &amp; JetBrains Mono
          </p>
        </div>
      </div>
    </footer>
  );
}
