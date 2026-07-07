"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/site/marquee";
import { useLanguage } from "@/lib/language-context";

function Word({ text }: { text: string }) {
  return (
    <span className="display text-[13vw] font-black uppercase leading-none text-stroke-cream">
      {text}
    </span>
  );
}

export function CtaBand() {
  const { t } = useLanguage();

  return (
    <section className="ink-panel relative overflow-hidden py-24 sm:py-36">
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-2">
        <Marquee duration={34} gap="3rem">
          <Word text={t.ctaBand.word} />
          <span className="text-[6vw] text-clay">✦</span>
          <Word text={t.ctaBand.word} />
          <span className="text-[6vw] text-clay">✦</span>
        </Marquee>
        <Marquee duration={34} reverse gap="3rem">
          <Word text={t.ctaBand.word} />
          <span className="text-[6vw] text-ochre">✦</span>
          <Word text={t.ctaBand.word} />
          <span className="text-[6vw] text-ochre">✦</span>
        </Marquee>
      </div>

      <div className="relative z-10 grid place-items-center px-6">
        <Button asChild variant="cream" size="xl" className="shadow-2xl">
          <Link href="/contacto">
            {t.ctaBand.btnText}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}