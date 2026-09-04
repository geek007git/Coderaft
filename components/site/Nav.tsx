"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { nav, studio } from "@/content/site";

export default function Nav() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setCondensed(y > 24));

  // Track which section currently owns the viewport.
  useEffect(() => {
    const targets = nav
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: [0.02, 0.2, 0.5] }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  // Hold the page still behind the mobile overlay.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-60"
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="border-b"
          animate={{
            backgroundColor: condensed ? "rgba(17,19,22,0.6)" : "rgba(17,19,22,0)",
            borderBottomColor: condensed ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            backdropFilter: condensed ? "blur(22px) saturate(140%)" : "none",
            WebkitBackdropFilter: condensed ? "blur(22px) saturate(140%)" : "none",
          }}
        >
          <div className="page">
            <motion.div
              className="flex items-center justify-between"
              animate={{ height: condensed ? 62 : 86 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Wordmark */}
              <a
                href="#top"
                onClick={(e) => go(e, "#top")}
                className="group flex items-baseline gap-3"
                aria-label="Coderaft — back to top"
              >
                <span className="display text-[1.05rem] tracking-[-0.03em] text-ink">
                  {studio.name}
                </span>
                <motion.span
                  className="label hidden lg:inline"
                  animate={{ opacity: condensed ? 0 : 1 }}
                  transition={{ duration: 0.25 }}
                >
                  {studio.role}
                </motion.span>
              </a>

              {/* Primary navigation */}
              <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
                {nav.map((link) => {
                  const on = active === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => go(e, link.href)}
                      aria-current={on ? "true" : undefined}
                      className="label relative py-1 transition-colors duration-200 hover:text-ink"
                      style={{ color: on ? "var(--color-ink)" : undefined }}
                    >
                      {link.label}
                      {on && (
                        <motion.span
                          layoutId="nav-marker"
                          className="bg-accent absolute -bottom-0.5 left-0 h-px w-full"
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        />
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* Availability + contact */}
              <div className="flex items-center gap-6">
                <a
                  href="#contact"
                  onClick={(e) => go(e, "#contact")}
                  className="label hidden text-ink transition-colors hover:text-accent sm:inline-flex"
                >
                  Start a project
                </a>

                <button
                  className="label flex items-center gap-2 text-ink md:hidden"
                  onClick={() => setOpen(!open)}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                >
                  {open ? "Close" : "Menu"}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile menu — recomposed as an editorial index, not a shrunken navbar */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-50 md:hidden"
            style={{ background: "rgba(11,12,14,0.97)", backdropFilter: "blur(20px)" }}
          >
            <div className="page flex h-full flex-col justify-center gap-2 pt-20 pb-16">
              {nav.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className="group flex items-baseline gap-5 border-b border-line py-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="index-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-[2.4rem] text-ink group-hover:text-accent">
                    {link.label}
                  </span>
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={(e) => go(e, "#contact")}
                className="action mt-10 self-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Start a project
              </motion.a>

              <p className="label mt-8">{studio.email}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
