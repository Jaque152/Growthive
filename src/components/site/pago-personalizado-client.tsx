"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ChevronsRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useCart } from "@/lib/cart-context";
import { ProductPlan } from "@/lib/products";

type Fields = "nombre" | "correo" | "referencia" | "monto";
type FormState = Record<Fields, string>;

const EMPTY: FormState = {
  nombre: "",
  correo: "",
  referencia: "",
  monto: "",
};

export function PagoPersonalizadoClient() {
  const { t } = useLanguage();
  const { add, open } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const update = (k: Fields, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.nombre.trim()) e.nombre = t.customPayment.errName;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.correo)) e.correo = t.customPayment.errEmail;
    if (!form.referencia.trim()) e.referencia = t.customPayment.errRef;
    
    const amountVal = parseFloat(form.monto);
    if (isNaN(amountVal) || amountVal <= 0) e.monto = t.customPayment.errAmount;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    // Generamos un producto dinámico basado en los datos del formulario
    const customProduct: ProductPlan = {
      id: `custom-payment-${Date.now()}`,
      priceMXN: parseFloat(form.monto),
      taxIncluded: false,
      currency: "MXN + IVA",
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80", 
      es: {
        name: `${form.referencia}`,
        description: `Pago personalizado. Nombre: ${form.nombre} | Correo: ${form.correo}`,
        features: ["Pago personalizado", "Procesamiento seguro"],
      },
      en: {
        name: `${form.referencia}`,
        description: `Custom payment. Name: ${form.nombre} | Email: ${form.correo}`,
        features: ["Custom payment", "Secure processing"],
      },
    };

    // Añadimos al carrito y lo abrimos automáticamente
    add(customProduct);
    open();
    
    toast.success(t.customPayment.toastAdded);
    setForm(EMPTY); // Limpiamos el formulario
  };

  return (
    <section className="min-h-[calc(100vh-68px)] bg-[#1c1611] py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-12 container-px lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-20">
        
        {/* LADO IZQUIERDO: Títulos */}
        <div>
          <h1 className="display text-5xl font-black uppercase leading-[0.9] tracking-tight text-cream-paper sm:text-[5.5rem]">
            {t.customPayment.title1}
            <br />
            <span className="text-ochre">{t.customPayment.title2}</span>
          </h1>
          <p className="mt-8 max-w-sm text-lg leading-relaxed text-cream-paper/60">
            {t.customPayment.desc}
          </p>
        </div>

        {/* LADO DERECHO: Formulario (Dark Mode) */}
        <div className="rounded-[2rem] bg-[#241c16] p-7 shadow-2xl sm:p-12">
          <form onSubmit={handleSubmit} noValidate className="space-y-7">
            
            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <label className="mb-2.5 block ml-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-cream-paper/70">
                  {t.customPayment.nameLabel}
                </label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => update("nombre", e.target.value)}
                  className="h-14 w-full rounded-full border border-cream-paper/15 bg-transparent px-6 text-cream-paper outline-none transition-all focus:border-ochre focus:ring-1 focus:ring-ochre"
                />
                {errors.nombre && <p className="mt-2 ml-3 font-mono text-[0.6rem] text-clay uppercase tracking-wide">{errors.nombre}</p>}
              </div>

              <div>
                <label className="mb-2.5 block ml-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-cream-paper/70">
                  {t.customPayment.emailLabel}
                </label>
                <input
                  type="email"
                  value={form.correo}
                  onChange={(e) => update("correo", e.target.value)}
                  className="h-14 w-full rounded-full border border-cream-paper/15 bg-transparent px-6 text-cream-paper outline-none transition-all focus:border-ochre focus:ring-1 focus:ring-ochre"
                />
                {errors.correo && <p className="mt-2 ml-3 font-mono text-[0.6rem] text-clay uppercase tracking-wide">{errors.correo}</p>}
              </div>
            </div>

            <div>
              <label className="mb-2.5 block ml-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-cream-paper/70">
                {t.customPayment.refLabel}
              </label>
              <input
                type="text"
                value={form.referencia}
                onChange={(e) => update("referencia", e.target.value)}
                className="h-14 w-full rounded-full border border-cream-paper/15 bg-transparent px-6 text-cream-paper outline-none transition-all focus:border-ochre focus:ring-1 focus:ring-ochre"
              />
              {errors.referencia && <p className="mt-2 ml-3 font-mono text-[0.6rem] text-clay uppercase tracking-wide">{errors.referencia}</p>}
            </div>

            <div>
              <label className="mb-2.5 block ml-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-cream-paper/70">
                {t.customPayment.amountLabel}
              </label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-mono text-cream-paper/50">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  value={form.monto}
                  onChange={(e) => update("monto", e.target.value)}
                  className="h-14 w-full rounded-full border border-cream-paper/15 bg-transparent pl-10 pr-6 font-mono text-lg text-cream-paper outline-none transition-all focus:border-ochre focus:ring-1 focus:ring-ochre"
                />
              </div>
              {errors.monto && <p className="mt-2 ml-3 font-mono text-[0.6rem] text-clay uppercase tracking-wide">{errors.monto}</p>}
            </div>

            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                className="group flex h-14 items-center justify-center gap-2 rounded-full bg-ochre px-12 font-display text-lg font-bold tracking-widest text-ink transition-all hover:scale-105 hover:bg-[#dca13f]"
              >
                {t.customPayment.button}
                <ChevronsRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="mt-8 text-center font-mono text-[0.64rem] uppercase tracking-[0.14em] text-cream-paper/40">
              <p>{t.customPayment.note1}</p>
              <p>{t.customPayment.note2}</p>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}