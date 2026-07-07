"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

const POS = [
  "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
  "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
  "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2",
  "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
];

export function Process() {
  const { t } = useLanguage();

  return (
    <section id="proceso" className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 container-px lg:grid-cols-2">
        <div>
          <span className="eyebrow inline-flex items-center gap-2.5 text-ink/60">
            <span className="h-2 w-2 rounded-full bg-clay" />
            {t.process.eyebrow}
          </span>
          <Reveal>
            <h2 className="display mt-6 text-balance text-4xl font-semibold leading-[1.02] text-ink sm:text-6xl">
              {t.process.titlePart1}{" "}
              <span className="italic text-clay">{t.process.titlePart2}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
              {t.process.desc}
            </p>
          </Reveal>

          {/* mobile / tablet stepper */}
          <div className="mt-9 space-y-3 lg:hidden">
            {t.process.steps.map((s) => (
              <div
                key={s.n}
                className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-cream-paper p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink font-mono text-xs text-cream-paper">
                  {s.n}
                </span>
                <div>
                  <p className="display text-lg font-semibold text-ink">
                    {s.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button asChild className="mt-9">
            <Link href="/servicios">
              {t.process.ctaBtn}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* desktop orbit */}
        <div className="hidden min-w-0 lg:block">
          <div className="relative mx-auto aspect-square w-full max-w-[420px]">
            <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-ink/25" />
            <div className="absolute inset-[16%] rounded-full border border-ink/10" />

            {/* center */}
            <div className="absolute inset-[34%] grid place-items-center rounded-full bg-cream-paper shadow-[inset_0_2px_10px_rgba(33,26,19,0.08)]">
              <div className="text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-clay">
                  <span className="ml-1 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-cream-paper" />
                </span>
                <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink/50">
                  {t.process.orbitCenterText}
                </p>
              </div>
            </div>

            {/* nodes */}
            {t.process.steps.map((s, i) => (
              <div key={s.n} className={cn("absolute", POS[i])}>
                <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-4 py-2.5 text-cream-paper shadow-lg ring-4 ring-[var(--cream)]">
                  <span className="font-mono text-[0.6rem] text-clay">
                    {s.n}
                  </span>
                  <span className="display text-[0.82rem] font-semibold uppercase tracking-wide">
                    {s.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}