"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { Logo } from "./logo";
import { Marquee } from "./marquee";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { count, toggle, hydrated } = useCart();
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* announcement ticker */}
      <div className="bg-ink py-2 text-cream-paper">
        <Marquee duration={32} gap="3rem">
          {t.header.ticker.map((text, i) => (
            <span
              key={i}
              className="flex items-center gap-12 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-cream-paper/80"
            >
              {text}
              <span className="text-clay">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* nav */}
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "border-b border-ink/10 bg-cream/85 backdrop-blur-md"
            : "border-b border-transparent bg-cream/40 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-6 container-px">
          <Link href="/" aria-label="Growthive inicio">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {t.header.nav.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "link-underline font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors",
                    active ? "text-clay" : "text-ink hover:text-clay"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Selector de Idioma ES | EN */}
            <div className="flex items-center rounded-full border-[1.5px] border-ink/15 bg-cream-paper p-0.5 font-mono text-[0.68rem] font-bold tracking-wider">
              <button
                type="button"
                onClick={() => setLang("es")}
                className={cn(
                  "rounded-full px-2.5 py-1 transition-colors",
                  lang === "es"
                    ? "bg-clay text-cream-paper"
                    : "text-ink/70 hover:text-ink"
                )}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={cn(
                  "rounded-full px-2.5 py-1 transition-colors",
                  lang === "en"
                    ? "bg-clay text-cream-paper"
                    : "text-ink/70 hover:text-ink"
                )}
              >
                EN
              </button>
            </div>

            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/contacto">{t.header.cta}</Link>
            </Button>

            <button
              type="button"
              onClick={toggle}
              aria-label={t.header.cartAria}
              className="relative grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-ink/15 bg-cream-paper text-ink transition-colors hover:border-clay hover:text-clay"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {hydrated && count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 font-mono text-[0.62rem] font-bold text-cream-paper">
                  {count}
                </span>
              )}
            </button>

            {/* mobile menu */}
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label={t.header.menuAria}
                  className="grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-ink/15 bg-cream-paper text-ink transition-colors hover:border-clay hover:text-clay md:hidden"
                >
                  <Menu className="h-[18px] w-[18px]" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="ink-panel w-full border-l-0 p-0 text-cream-paper sm:max-w-sm [&>button]:text-cream-paper/70"
              >
                <div className="flex h-full flex-col">
                  <div className="border-b border-cream-paper/10 px-7 py-6">
                    <Logo variant="cream" />
                  </div>
                  <nav className="flex flex-1 flex-col justify-center gap-1 px-7">
                    {t.header.nav.map((l, i) => (
                      <SheetClose asChild key={l.href}>
                        <Link
                          href={l.href}
                          className="group flex items-center gap-4 border-b border-cream-paper/10 py-5"
                        >
                          <span className="font-mono text-xs text-clay">
                            0{i + 1}
                          </span>
                          <span className="display text-3xl font-semibold text-cream-paper transition-colors group-hover:text-clay">
                            {l.label}
                          </span>
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="px-7 py-7">
                    <SheetClose asChild>
                      <Button asChild variant="cream" size="lg" className="w-full">
                        <Link href="/contacto">{t.header.cta}</Link>
                      </Button>
                    </SheetClose>
                    <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cream-paper/40">
                      {t.header.contactEmail}
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}