"use client";

import { StoreGrid } from "@/components/site/store-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { useLanguage } from "@/lib/language-context";

export function ServiciosClient() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -left-32 top-[-20%] h-[460px] w-[460px] rounded-full bg-clay/12 blur-[120px]" />
          <div className="absolute right-[-10%] top-10 h-[420px] w-[420px] rounded-full bg-ochre/12 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-[1400px] container-px pb-10 pt-14 sm:pt-20">
          <span className="eyebrow inline-flex items-center gap-2.5 text-ink/60">
            <span className="h-2 w-2 rounded-full bg-clay" />
            {t.servicesPage.eyebrow}
          </span>
          <h1 className="display mt-6 max-w-4xl text-balance text-5xl font-black uppercase leading-[0.92] tracking-[-0.01em] text-ink sm:text-7xl">
            {t.servicesPage.titlePart1}{" "}
            <span className="italic text-clay">{t.servicesPage.titlePart2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {t.servicesPage.desc}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] container-px pb-20 sm:pb-28">
        <StoreGrid />
      </section>

      <CtaBand />
    </>
  );
}