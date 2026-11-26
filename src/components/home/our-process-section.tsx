"use client";

import { motion } from "framer-motion";

import { dataSite } from "@/lib/data";
import { processSteps, useLanguage } from "@/lib/language";

// Composition: a vertical docket timeline — a single connecting rule down
// the left with a numbered gold marker at each step and the step content
// running to its right, rather than a 3-column grid of cards with giant
// ghost numerals. Step 1's copy replaces the legacy's generic placeholder
// phone number "(316) 555-0116" with the real dataSite.telephone.
export function OurProcessSection() {
  const { language, t } = useLanguage();
  const steps = processSteps[language];

  return (
    <section id="process" className="w-full bg-background py-20 md:py-28">
      <div className="container mx-auto [padding-inline:1rem] md:[padding-inline:1.5rem]">
        <div className="max-w-2xl border-b-2 border-foreground pb-6">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {t("processHeading")}
          </span>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {t("processEyebrow")}
          </p>
        </div>

        <div className="relative mt-4">
          <div
            className="absolute bottom-6 left-[15px] top-6 w-px bg-border md:left-[19px]"
            aria-hidden="true"
          />
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="relative flex [gap:1.25rem] py-6 md:[gap:1.75rem]"
            >
              <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center bg-accent font-mono text-xs font-bold text-accent-foreground md:h-10 md:w-10">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 pt-0.5">
                <h3 className="font-display text-xl text-foreground md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {index === 0
                    ? step.description.replace(
                        language === "es" ? "Llámanos" : "Call us",
                        language === "es"
                          ? `Llama al +52 ${dataSite.telephone}`
                          : `Call +52 ${dataSite.telephone}`,
                      )
                    : step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
