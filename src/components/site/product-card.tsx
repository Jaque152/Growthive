"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart, IVA_RATE } from "@/lib/cart-context";
import { formatMXN, type ProductPlan } from "@/lib/products";
import { useLanguage } from "@/lib/language-context";

export function ProductCard({
  product,
  index,
}: {
  product: ProductPlan;
  index: number;
}) {
  const { add, open } = useCart();
  const { t, lang } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Seleccionamos los textos dinámicos según el idioma actual (es o en)
  const data = product[lang];

  const handleAdd = () => {
    add(product);
    toast(t.store.addedToastTitle, {
      description: data.name,
      action: { label: t.store.viewCartBtn, onClick: () => open() },
    });
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[1.4rem] border border-ink/10 bg-cream-paper p-4 transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-[0_24px_50px_-28px_rgba(33,26,19,0.5)] sm:p-5">
      <span className="pointer-events-none absolute right-4 top-3 z-10 display text-5xl font-black text-cream-paper/90 drop-shadow-md">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-ink/5">
        <img
          src={product.imageUrl}
          alt={data.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-cream-paper/90 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink backdrop-blur">
          {product.currency}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-5">
        <h3 className="display text-xl font-semibold leading-snug text-ink">
          {data.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {data.description}
        </p>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="display text-2xl font-semibold text-clay">
              {formatMXN(product.priceMXN)}
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink/60 transition-colors hover:text-clay"
              >
                {t.store.cardDetails}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </DialogTrigger>
            
            {/* AQUÍ ESTÁ LA MAGIA DEL RESPONSIVE Y EL SCROLL */}
            <DialogContent className="max-h-[92dvh] w-[95vw] max-w-2xl overflow-y-auto overflow-x-hidden rounded-[1.4rem] border-ink/10 bg-cream-paper p-0 sm:w-full [&>button]:right-4 [&>button]:top-4 [&>button]:z-50 [&>button]:rounded-full [&>button]:bg-cream-paper/95 [&>button]:p-1.5 [&>button]:text-ink [&>button]:shadow-sm [&>button]:backdrop-blur-sm">
              <div className="grid gap-0 md:grid-cols-2">
                <div className="bg-sand/50 p-6">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-ink/5">
                    <img
                      src={product.imageUrl}
                      alt={data.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <DialogTitle className="display mt-5 text-2xl font-semibold leading-tight text-ink">
                    {data.name}
                  </DialogTitle>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {data.description}
                  </p>
                </div>
                <div className="flex flex-col p-6">
                  <p className="eyebrow text-ink/50">{t.store.cardIncludes}</p>
                  <ul className="mt-4 flex-1 space-y-3">
                    {data.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-ink">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-clay/15 text-clay">
                          <Check className="h-3 w-3" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-ink/10 pt-5">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                        {t.store.cardTotalIva}
                      </span>
                      <span className="display text-2xl font-semibold text-clay">
                        {formatMXN(product.priceMXN * (1 + IVA_RATE))}
                      </span>
                    </div>
                    <Button
                      className="mt-4 w-full"
                      size="lg"
                      onClick={() => {
                        handleAdd();
                        setDialogOpen(false);
                      }}
                    >
                      {t.store.cardHire}
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Button onClick={handleAdd} className="mt-5 w-full">
          {t.store.cardHire}
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}