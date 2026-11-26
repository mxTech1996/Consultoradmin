"use client";

import { motion } from "framer-motion";

import { dataSite } from "@/lib/data";
import { infoSpanish, useLanguage } from "@/lib/language";

// Maps dataSite.info (5 real items, present in the legacy payload but
// unused by any legacy component) to a "lead statement + docket grid":
// the first item (Values) runs full-width as a pull-quote-style lead,
// the remaining four (Clients, Specialty areas, Experience, Object) sit
// in a 2x2 grid of bordered cards below it — distinct from the about
// section's image+list and from a uniform card grid.
export function InfoSection() {
  const { language, t } = useLanguage();
  const info = dataSite.info;
  const [lead, ...rest] = info;
  const leadCopy = language === "es" ? infoSpanish[0] : lead;

  return (
    <section className="w-full bg-secondary/40 py-20 md:py-28">
      <div className="container mx-auto [padding-inline:1rem] md:[padding-inline:1.5rem]">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
          {t("infoEyebrow")}
        </span>
        <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
          {t("infoHeading")}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 border-l-2 border-accent bg-card py-6 [padding-inline:1.5rem] md:[padding-inline:2.5rem]"
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
            {leadCopy.title}
          </p>
          <p className="mt-3 max-w-3xl font-display text-xl leading-relaxed text-foreground sm:text-2xl">
            {leadCopy.description}
          </p>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {rest.map((item, index) => {
            const copy = language === "es" ? infoSpanish[index + 1] : item;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="bg-card [padding:1.5rem] md:[padding:2rem]"
              >
                <h3 className="font-display text-lg text-foreground">
                  {copy.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {copy.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
