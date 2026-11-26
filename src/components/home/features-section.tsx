"use client";

import { motion } from "framer-motion";
import { Clock, Headset, UserRound, Scale } from "lucide-react";

import { featuresItems, useLanguage } from "@/lib/language";

const icons = [Clock, Headset, UserRound, Scale];

// Composition: a dark "ledger" row — four entries separated by vertical
// rules on desktop (collapsing to stacked rows with horizontal rules on
// mobile), each preceded by a small roman numeral in gold rather than a
// centered icon-above-title card grid.
export function FeaturesSection() {
  const { language, t } = useLanguage();
  const items = featuresItems[language];
  const numerals = ["I", "II", "III", "IV"];

  return (
    <section className="w-full bg-primary py-16 text-primary-foreground md:py-20">
      <div className="container mx-auto [padding-inline:1rem] md:[padding-inline:1.5rem]">
        <div className="max-w-xl border-b border-primary-foreground/20 pb-6">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {t("featuresEyebrow")}
          </span>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">
            {t("featuresHeading")}
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="mt-2 grid grid-cols-1 divide-y divide-primary-foreground/15 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x"
        >
          {items.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                }}
                className="flex flex-col gap-3 py-7 first:pt-0 lg:px-7 lg:py-0 lg:first:pl-0 lg:last:pr-0"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-xl text-accent">
                    {numerals[index]}
                  </span>
                  <Icon className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg leading-snug">{item.title}</h3>
                <p className="text-sm leading-6 text-primary-foreground/70">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
