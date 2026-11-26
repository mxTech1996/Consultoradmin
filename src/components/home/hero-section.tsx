"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { dataSite } from "@/lib/data";
import { useLanguage } from "@/lib/language";

// Composition: an asymmetric "case file" split — a dark ink panel carrying
// the headline/CTA on the left, with the hero photograph on the right
// overlapping INTO that panel on large screens (negative margin, framed in
// the brief-corner bracket device) rather than sitting in its own clean
// column. A small rotated docket tab runs down the photo's right edge.
// Distinct from a centered hero or an even two-column split.
export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="home" className="w-full bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="relative z-10 flex flex-col justify-center bg-primary px-6 py-16 text-primary-foreground md:px-12 lg:py-24 lg:pr-20"
        >
          <motion.span
            variants={{
              hidden: { y: 10, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
            }}
            className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-accent"
          >
            {t("heroEyebrow")}
          </motion.span>
          <motion.h1
            variants={{
              hidden: { y: 18, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
            }}
            className="mt-5 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.2rem]"
          >
            {dataSite.subtitle}
          </motion.h1>
          <motion.p
            variants={{
              hidden: { y: 18, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
            }}
            className="mt-6 max-w-md text-sm leading-7 text-primary-foreground/80"
          >
            {dataSite.description}
          </motion.p>

          <motion.div
            variants={{
              hidden: { y: 18, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
            }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/contact"
              className="bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.04em] text-accent-foreground transition-opacity hover:opacity-90"
            >
              {t("heroCtaPrimary")}
            </Link>
            <Link
              href="#about"
              className="border border-primary-foreground/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.04em] transition-colors hover:border-primary-foreground"
            >
              {t("heroCtaSecondary")}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="brief-corner relative [order:-1] min-h-[280px] overflow-hidden lg:[order:0] lg:-ml-10 lg:min-h-full"
        >
          <img
            src={dataSite.image_hero}
            alt="Legal and business consulting team in a strategy meeting"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute right-0 top-0 flex h-full flex-col items-center justify-center bg-background/90 px-2">
            <span className="rotate-180 font-mono text-[10px] font-bold uppercase tracking-[0.2em] [writing-mode:vertical-rl] text-foreground/70">
              {dataSite.name} · File 2026
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
