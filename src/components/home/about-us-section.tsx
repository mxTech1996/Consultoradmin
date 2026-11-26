"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { dataSite } from "@/lib/data";
import { aboutPrinciples, useLanguage } from "@/lib/language";

// Composition: content LEFT (eyebrow, headline, paragraph, CTA), image
// RIGHT framed in the brief-corner bracket with the four principles
// printed underneath it as a compact statute list (§01-§04) — the inverse
// of the legacy AboutLegalFirm.js (image left / text+principle-rows
// right), and distinct from the hero's ink-panel-overlap composition.
export function AboutUsSection() {
  const { language, t } = useLanguage();
  const principles = aboutPrinciples[language];

  return (
    <section id="about" className="w-full bg-background py-20 md:py-28">
      <div className="container mx-auto [padding-inline:1rem] md:[padding-inline:1.5rem]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              {t("aboutEyebrow")}
            </span>
            <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
              {t("aboutHeading")}
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">
              {t("aboutParagraph")}
            </p>
            <Link
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 border border-foreground px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.04em] text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              {t("aboutCta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="brief-corner relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={dataSite.image_hero2}
                alt="Professional legal team in a meeting"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 divide-y divide-dashed divide-border border-y border-dashed border-border">
              {principles.map((item) => (
                <div key={item.text} className="flex items-center gap-4 py-3">
                  <span className="font-mono text-xs font-bold text-accent">
                    §{item.number.replace(".", "")}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
