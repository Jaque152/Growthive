"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, IVA_RATE } from "@/lib/cart-context";
import { formatMXN } from "@/lib/products";
import { useLanguage } from "@/lib/language-context";

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    iva,
    total,
    isOpen,
    close,
    setQty,
    remove,
    clear,
  } = useCart();
  const { t, lang } = useLanguage();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
      <SheetContent
        side="right"
        className="ink-panel flex w-full flex-col gap-0 border-l-0 p-0 text-cream-paper sm:max-w-md [&>button]:!text-cream-paper/70 [&>button]:hover:!text-cream-paper"
      >
        <SheetHeader className="border-b border-cream-paper/10 px-6 py-5 text-left">
          <SheetTitle className="flex items-center gap-3 text-cream-paper">
            <span className="eyebrow text-clay">{t.cart.title}</span>
            <span className="font-mono text-xs text-cream-paper/50">
              [{String(count).padStart(2, "0")}]
            </span>
          </SheetTitle>
          <p className="display text-2xl font-semibold text-cream-paper">
            {t.cart.selection}
          </p>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-cream-paper/25">
              <ShoppingBag className="h-7 w-7 text-cream-paper/50" />
            </div>
            <div className="space-y-1.5">
              <p className="display text-xl text-cream-paper">
                {t.cart.emptyTitle}
              </p>
              <p className="text-sm text-cream-paper/55">
                {t.cart.emptyDesc}
              </p>
            </div>
            <Button asChild variant="cream" onClick={close}>
              <Link href="/servicios">
                {t.cart.viewServices}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-cream-paper/10 overflow-y-auto px-6">
              {items.map(({ product, qty }) => {
                const data = product[lang];
                
                return (
                  <div key={product.id} className="flex gap-4 py-5">
                    <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-cream-paper/[0.07]">
                      <img src={product.imageUrl} alt={data.name} className="h-full w-full object-cover opacity-80" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ochre">
                        {product.currency}
                      </p>
                      <p className="display mt-1 truncate text-[1.05rem] font-semibold leading-tight text-cream-paper">
                        {data.name}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-cream-paper/15">
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty - 1)}
                            className="grid h-8 w-8 place-items-center rounded-full text-cream-paper/70 transition-colors hover:!text-clay"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center font-mono text-sm">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty + 1)}
                            className="grid h-8 w-8 place-items-center rounded-full text-cream-paper/70 transition-colors hover:!text-clay"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="font-mono text-sm text-cream-paper">
                          {formatMXN(product.priceMXN * qty)} MXN <span className="text-[0.6rem] text-cream-paper/60">+ IVA</span>
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      aria-label={t.cart.removeAria}
                      className="self-start text-cream-paper/40 transition-colors hover:!text-clay"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="space-y-4 border-t border-cream-paper/10 bg-black/20 px-6 py-6">
              <dl className="space-y-2 font-mono text-sm">
                <div className="flex justify-between text-cream-paper/60">
                  <dt>{t.cart.subtotal}</dt>
                  <dd>{formatMXN(subtotal)} MXN</dd>
                </div>
                <div className="flex justify-between text-cream-paper/60">
                  <dt>IVA ({Math.round(IVA_RATE * 100)}%)</dt>
                  <dd>{formatMXN(iva)} MXN</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-cream-paper/10 pt-3 text-cream-paper">
                  <dt className="display text-base font-semibold normal-case tracking-normal">
                    {t.cart.total}
                  </dt>
                  <dd className="display text-xl font-semibold text-clay">
                    {formatMXN(total)} MXN
                  </dd>
                </div>
              </dl>
              <Button asChild variant="cream" size="lg" className="w-full" onClick={close}>
                <Link href="/checkout">
                  {t.cart.checkoutBtn}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <button
                type="button"
                onClick={clear}
                className="block w-full text-center font-mono text-[0.7rem] uppercase tracking-[0.14em] text-cream-paper/40 transition-colors hover:!text-clay"
              >
                {t.cart.clearBtn}
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}