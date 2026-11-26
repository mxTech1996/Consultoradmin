"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { dataSite } from "@/lib/data";
import { referenceSpanish, useLanguage } from "@/lib/language";

const getInitials = (name: string) => {
  const words = name.split(" ");
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// Composition: a row of clickable "witness" initials chips (all 5 visible
// at once) above a single large pull-quote with an oversized quotation
// glyph — distinct from the legacy's single-card slide carousel with
// prev/next arrows, and from a ticket/stamp card.
export function TestimonialsSection() {
  const { language, t } = useLanguage();
  const references = dataSite.references;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = references[activeIndex];
  const localized =
    language === "es" ? referenceSpanish[activeIndex] : undefined;
  const [authorName, authorTitle] = active.name.split(/, | from /);

  return (
    <section id="testimonials" className="w-full bg-secondary/40 py-20 md:py-28">
      <div className="container mx-auto [padding-inline:1rem] md:[padding-inline:1.5rem]">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
          {t("testimonialsEyebrow")}
        </span>
        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
          {t("testimonialsHeading")}
        </h2>

        <div className="mt-10 flex flex-wrap gap-3">
          {references.map((reference, index) => {
            const isActive = index === activeIndex;
            const [name] = reference.name.split(/, | from /);
            return (
              <button
                key={reference.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={name}
                className={`flex h-12 w-12 items-center justify-center border font-mono text-sm font-bold transition-colors ${
                  isActive
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/40"
                }`}
              >
                {getInitials(name)}
              </button>
            );
          })}
        </div>

        <div className="relative mt-10 max-w-3xl">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-2 -top-10 font-display text-[7rem] leading-none text-accent/15 sm:text-[9rem]"
          >
            &rdquo;
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="relative"
            >
              <blockquote className="font-display text-xl leading-relaxed text-foreground sm:text-2xl">
                {localized?.description ?? active.description}
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <span className="font-mono text-sm font-bold uppercase tracking-[0.06em] text-foreground">
                  {authorName}
                </span>
                {authorTitle && (
                  <span className="text-sm text-muted-foreground">
                    · {authorTitle}
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
