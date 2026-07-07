"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { useLanguage } from "@/lib/language-context";

export function Services() {
  const { t } = useLanguage();

  return (
    <section
      id="servicios"
      className="border-y border-ink/10 bg-sand/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1400px] container-px">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow inline-flex items-center gap-2.5 text-ink/60">
              <span className="h-2 w-2 rounded-full bg-clay" />
              {t.services.eyebrow}
            </span>
            <Reveal>
              <h2 className="display mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
                {t.services.title}
              </h2>
            </Reveal>
          </div>
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
            {t.services.desc}
          </p>
        </div>

        <div className="mt-12">
          {t.services.items.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.04}>
              <Link
                href="/servicios"
                className="group -mx-3 grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-2xl border-t border-ink/15 px-3 py-6 transition-colors duration-300 hover:bg-cream-paper/60 sm:gap-8 sm:py-7"
              >
                <span className="display text-3xl font-black text-ink/15 transition-colors duration-300 group-hover:text-clay sm:text-5xl">
                  {item.n}
                </span>
                <div className="grid gap-1 sm:grid-cols-[1fr_1.2fr] sm:items-center sm:gap-8">
                  <h3 className="display text-2xl font-semibold text-ink transition-colors duration-300 group-hover:text-clay sm:text-[2rem]">
                    {item.title}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 text-ink transition-all duration-300 group-hover:border-clay group-hover:bg-clay group-hover:text-cream-paper">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </Link>
            </Reveal>
          ))}
          <div className="border-t border-ink/15" />
        </div>
      </div>
    </section>
  );
}