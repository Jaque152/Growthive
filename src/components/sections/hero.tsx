"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % words.length), 2300);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-semibold text-clay"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-[-12%] h-[520px] w-[520px] rounded-full bg-clay/15 blur-[120px]" />
        <div className="absolute right-[-10%] top-1/3 h-[480px] w-[480px] rounded-full bg-ochre/15 blur-[130px]" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-180px] top-1/2 -z-10 hidden h-[680px] w-[680px] -translate-y-1/2 rounded-full border border-dashed border-ink/15 animate-spin-slow lg:block"
      >
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay" />
        <span className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ochre" />
      </div>

      <div className="mx-auto max-w-[1400px] container-px pb-14 pt-14 sm:pt-20 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <span className="eyebrow inline-flex items-center gap-2.5 text-ink/70">
            <span className="h-2 w-2 animate-pulse rounded-full bg-clay" />
            {t.hero.eyebrow}
          </span>
          <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink/40 sm:block">
            {t.hero.est}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 flex flex-wrap items-baseline gap-x-3 font-mono text-sm uppercase tracking-[0.16em] text-ink/55 sm:mt-14"
        >
          {t.hero.weCreate} <RotatingWord words={t.hero.rotatingWords} />
        </motion.div>

        <h1 className="display mt-2 font-black uppercase leading-[0.8] tracking-[-0.02em] text-ink">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="block text-[clamp(3.2rem,14vw,12rem)]"
          >
            {t.hero.titlePart1}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="block text-[clamp(3.2rem,14vw,12rem)] italic text-clay"
          >
            {t.hero.titlePart2}
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 grid gap-6 border-t border-ink/15 pt-8 sm:grid-cols-3 sm:items-center lg:mt-14"
        >
          <p className="text-center font-mono text-[0.72rem] uppercase leading-relaxed tracking-[0.16em] text-ink/60 whitespace-pre-line">
            {t.hero.deliveryText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}