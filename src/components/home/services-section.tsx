"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { dataSite } from "@/lib/data";
import { serviceSpanish, useLanguage } from "@/lib/language";

// Composition: a two-pane "docket index" — a vertical numbered list of
// service titles on the left (click to select, active item marked with a
// gold rule), and a large image + description panel on the right that
// swaps on selection. Distinct from the legacy's hover-reveal single
// column list and from a draggable photo carousel.
export function ServicesSection() {
  const { language, t } = useLanguage();
  const services = dataSite.services;
  const [activeId, setActiveId] = useState(services[0].id);
  const active = services.find((service) => service.id === activeId) ?? services[0];
  const activeCopy = language === "es" ? serviceSpanish[active.id] : undefined;

  return (
    <section id="services" className="w-full bg-background py-20 md:py-28">
      <div className="container mx-auto [padding-inline:1rem] md:[padding-inline:1.5rem]">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {t("servicesEyebrow")}
          </span>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {t("servicesHeading")}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-0 border border-border lg:grid-cols-[0.85fr_minmax(0,1.15fr)]">
          <div className="flex flex-col divide-y divide-border border-b border-border lg:border-b-0 lg:border-r">
            {services.map((service, index) => {
              const copy = language === "es" ? serviceSpanish[service.id] : undefined;
              const isActive = service.id === activeId;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveId(service.id)}
                  className={`flex items-center gap-4 px-5 py-4 text-left transition-colors ${
                    isActive ? "bg-secondary" : "hover:bg-secondary/50"
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-base leading-snug ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {copy?.title ?? service.title}
                  </span>
                  {isActive && (
                    <span className="ml-auto h-full w-[3px] bg-accent" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex h-full [flex-direction:column] sm:[flex-direction:row]"
              >
                <div className="relative h-56 [width:100%] flex-shrink-0 overflow-hidden sm:h-auto sm:[width:40%]">
                  <img
                    src={active.image}
                    alt={activeCopy?.title ?? active.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center [padding:1.5rem] md:[padding:2.5rem]">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
                    SRV-{String(services.indexOf(active) + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-foreground">
                    {activeCopy?.title ?? active.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {activeCopy?.description ?? active.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
