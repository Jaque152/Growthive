"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { useLanguage } from "@/lib/language-context";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="nosotros" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-14 container-px lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
        <div>
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2.5 text-ink/60">
              <span className="h-2 w-2 rounded-full bg-clay" />
              {t.about.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-6 text-balance text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              {t.about.titlePart1}{" "}
              <span className="italic text-clay">{t.about.titlePart2}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-7 max-w-xl space-y-5 text-pretty text-[1.02rem] leading-relaxed text-muted-foreground">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <Button asChild className="mt-9">
              <Link href="/servicios">
                {t.about.ctaBtn}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="ink-panel relative rounded-[1.6rem] p-8 text-cream-paper sm:p-10">
            <p className="eyebrow text-clay">{t.about.servicesIncludedEyebrow}</p>
            <ul className="mt-7 divide-y divide-cream-paper/10">
              {t.about.servicesList.map((s, i) => (
                <li
                  key={s}
                  className="flex items-center gap-5 py-4 first:pt-0 last:pb-0"
                >
                  <span className="font-mono text-xs text-cream-paper/40">
                    0{i + 1}
                  </span>
                  <span className="display text-lg font-medium text-cream-paper">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-float-soft absolute -right-4 -top-6 grid h-24 w-24 place-items-center rounded-full bg-ochre text-center text-ink shadow-lg">
            <span className="font-mono text-[0.62rem] font-bold uppercase leading-tight tracking-[0.1em]">
              {t.about.onlineBadgeLine1}
              <br />
              {t.about.onlineBadgeLine2}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}