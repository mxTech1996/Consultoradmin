"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import { CartContext } from "ui-old-version";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { dataSite } from "@/lib/data";
import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";

// Composition: a two-tier "letterhead" header — a thin italic motto strip
// on top, then a single main row with the seal mark + wordmark on the
// left, nav items separated by section-mark dividers (§) in the center,
// and the cart/language/contact controls on the right, closed by a 2px
// gold rule. Distinct from a single sticky bar with an underline-tick nav.
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { products } = useContext(CartContext);
  const { language, setLanguage, t } = useLanguage();
  const isHome = pathname === "/";

  const navLinks = [
    { href: "#about", label: t("navAbout") },
    { href: "#services", label: t("navServices") },
    { href: "#products", label: t("navProducts") },
    { href: "#process", label: t("navProcess") },
    { href: "#testimonials", label: t("navTestimonials") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="[display:none] border-b border-border bg-primary text-primary-foreground md:[display:block]">
        <div className="container mx-auto flex h-7 items-center justify-end px-6">
          <p className="font-display text-xs italic tracking-wide text-primary-foreground/80">
            {language === "es"
              ? "Abogados y Consultores de Negocios"
              : "Attorneys & Business Consultants"}
          </p>
        </div>
      </div>

      <div className="container mx-auto flex h-[64px] items-center justify-between gap-4 [padding-inline:1rem] md:h-[68px] md:[padding-inline:1.5rem]">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-8 w-8 md:h-9 md:w-9" />
          <span className="font-display text-lg leading-none tracking-wide text-foreground md:text-xl">
            Consultoradmin
          </span>
        </Link>

        {isHome && (
          <nav className="[display:none] items-center gap-0 lg:flex">
            {navLinks.map((link, index) => (
              <span key={link.href} className="flex items-center">
                {index > 0 && (
                  <span className="mx-3 font-mono text-xs text-accent">§</span>
                )}
                <Link
                  href={link.href}
                  className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <div
            className="[display:none] items-center border border-border text-[10px] font-bold uppercase tracking-[0.06em] md:flex"
            aria-label="Language selector"
          >
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={cn(
                "px-2.5 py-1.5 transition-colors",
                language === "en"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("es")}
              className={cn(
                "border-l border-border px-2.5 py-1.5 transition-colors",
                language === "es"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              ES
            </button>
          </div>

          <button
            type="button"
            onClick={() => router.push("/my-cart")}
            className="relative flex h-10 items-center gap-1.5 border border-border px-2.5 text-xs font-bold text-foreground transition-colors hover:border-accent"
            aria-label={t("shoppingCart")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M3 4h2l2.4 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L20 8H6" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="17" cy="20" r="1" />
            </svg>
            <span className="flex h-5 min-w-5 items-center justify-center bg-accent px-1 font-mono text-[11px] text-accent-foreground">
              {products.length}
            </span>
          </button>

          <Button
            asChild
            size="sm"
            className="[display:none] rounded-none bg-primary text-primary-foreground hover:bg-primary/90 sm:inline-flex"
          >
            <Link href="/contact">{t("navContact")}</Link>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">{t("openMenu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full">
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Logo />
                    <span className="font-display text-lg">Consultoradmin</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X />
                    <span className="sr-only">{t("closeMenu")}</span>
                  </Button>
                </div>
              </SheetHeader>
              <div className="mt-8 flex flex-col space-y-5">
                <div className="flex items-center border border-border text-xs font-bold uppercase tracking-[0.06em]">
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={cn(
                      "flex-1 px-3 py-2",
                      language === "en" && "bg-primary text-primary-foreground",
                    )}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("es")}
                    className={cn(
                      "flex-1 border-l border-border px-3 py-2",
                      language === "es" && "bg-primary text-primary-foreground",
                    )}
                  >
                    ES
                  </button>
                </div>
                {isHome &&
                  navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="font-mono text-sm font-medium uppercase tracking-[0.1em] text-foreground/80 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  ))}
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/contact");
                  }}
                  className="w-full rounded-none"
                >
                  {t("navContact")}
                </Button>
                {dataSite.telephone && (
                  <a
                    href={`tel:+52${dataSite.telephone}`}
                    className="font-mono text-xs text-muted-foreground"
                  >
                    +52 {dataSite.telephone}
                  </a>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="h-[2px] w-full bg-accent" aria-hidden="true" />
    </header>
  );
}
