"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { dataSite, footerData } from "@/lib/data";
import { useLanguage } from "@/lib/language";

// Composition: a four-column "letterhead block" with vertical rule
// dividers (brand+description spans two columns, quick links and contact
// each take one), closing with a gold rule and a compact bottom bar —
// distinct from a full-width brand band stacked above a separate 3-col
// grid.
export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="container mx-auto [padding:3rem_1rem] md:[padding:4rem_1.5rem]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-primary-foreground/15">
          <div className="sm:col-span-2 md:pr-8">
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-9 text-primary-foreground" />
              <span className="font-display text-xl tracking-wide">
                Consultoradmin
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-primary-foreground/70">
              {t("footerDescription")}
            </p>
            <p className="mt-4 font-mono text-[11px] leading-5 text-primary-foreground/55">
              {dataSite.address}
            </p>
          </div>

          <div className="md:px-8">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
              {t("quickLinks")}
            </h3>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-primary-foreground/80">
              <Link href="/#about" className="transition-colors hover:text-primary-foreground">
                {t("aboutUs")}
              </Link>
              <Link href="/#services" className="transition-colors hover:text-primary-foreground">
                {t("navServices")}
              </Link>
              <Link href="/#products" className="transition-colors hover:text-primary-foreground">
                {t("navProducts")}
              </Link>
              <Link href="/contact" className="transition-colors hover:text-primary-foreground">
                {t("navContact")}
              </Link>
            </nav>
          </div>

          <div className="md:px-8">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
              {t("navContact")}
            </h3>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-primary-foreground/80">
              {dataSite.telephone && (
                <a href={`tel:+52${dataSite.telephone}`} className="transition-colors hover:text-primary-foreground">
                  +52 {dataSite.telephone}
                </a>
              )}
              {dataSite.email && (
                <a href={`mailto:${dataSite.email}`} className="break-all transition-colors hover:text-primary-foreground">
                  {dataSite.email}
                </a>
              )}
            </div>
            <h3 className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
              {t("paymentMethods")}
            </h3>
            <div className="mt-3 flex items-center gap-2">
              <img
                src="/images/visaMaster.png"
                alt="Visa and MasterCard"
                className="h-7 w-auto bg-primary-foreground/95 p-1"
              />
              <img
                src="/images/openpay.jpg"
                alt="Openpay"
                className="h-7 w-auto bg-primary-foreground/95 p-1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-[2px] w-full bg-accent" />
      <div className="bg-background py-4 text-center text-xs text-muted-foreground">
        <div className="container mx-auto flex [flex-direction:column] items-center justify-between gap-2 [padding-inline:1rem] sm:[flex-direction:row] md:[padding-inline:1.5rem]">
          <span>
            © {new Date().getFullYear()} Consultoradmin. {t("allRightsReserved")}
          </span>
          <span className="flex items-center gap-3">
            {footerData.map((item, index) => (
              <span key={item.href} className="flex items-center gap-3">
                {index > 0 && <span className="text-border">|</span>}
                <Link
                  target="_blank"
                  href={item.href}
                  className="transition-colors hover:text-foreground hover:underline"
                >
                  {item.label === "Privacy" ? t("privacyPolicy") : t("termsOfService")}
                </Link>
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
