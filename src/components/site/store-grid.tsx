"use client";

import { webPlans } from "@/lib/products";
import { ProductCard } from "./product-card";
import { useLanguage } from "@/lib/language-context";

export function StoreGrid() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="flex items-center justify-between border-y border-ink/10 py-5">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
          {String(webPlans.length).padStart(2, "0")} {t.store.plansCountLabel}
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {webPlans.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}