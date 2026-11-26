"use client";

import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { dataSite } from "@/lib/data";
import { useLanguage } from "@/lib/language";

// Composition: a dark band split into a headline/CTA panel and a bordered
// "intake docket" card listing phone/email/address as labeled rows with a
// seal-gold corner tab — distinct from Montero's graph-paper full-width
// band and from a single centered CTA strip.
export function ContactSection() {
  const { t } = useLanguage();

  const rows = [
    { icon: Phone, label: t("phoneLabel"), value: `+52 ${dataSite.telephone}`, href: `tel:+52${dataSite.telephone}` },
    { icon: Mail, label: t("emailLabel"), value: dataSite.email, href: `mailto:${dataSite.email}` },
    { icon: MapPin, label: t("addressLabel"), value: dataSite.address },
  ];

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="w-full bg-primary text-primary-foreground"
    >
      <div className="container mx-auto grid grid-cols-1 gap-10 py-16 [padding-inline:1rem] md:py-20 md:[padding-inline:1.5rem] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            {t("contactTitle")}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-primary-foreground/75">
            {t("contactDescription")}
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="group mt-7 h-12 w-fit rounded-none px-7"
          >
            <Link href="/contact">
              {t("discussSituation")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="relative border border-primary-foreground/25 bg-primary-foreground/5 [padding:1.5rem] md:[padding:2rem]">
          <span className="absolute -top-3 right-6 bg-accent px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent-foreground">
            {dataSite.name}
          </span>
          <dl className="flex flex-col gap-5">
            {rows.map((row) => (
              <div key={row.label} className="flex items-start gap-3">
                <row.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-primary-foreground/55">
                    {row.label}
                  </dt>
                  <dd className="mt-0.5 text-sm text-primary-foreground/90">
                    {row.href ? (
                      <a href={row.href} className="transition-colors hover:text-accent">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </motion.section>
  );
}
