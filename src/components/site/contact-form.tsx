"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { processContact } from "@/app/actions/contact";

type Fields = "nombre" | "correo" | "telefono" | "asunto" | "mensaje";
type FormState = Record<Fields, string>;

const EMPTY: FormState = {
  nombre: "",
  correo: "",
  telefono: "",
  asunto: "",
  mensaje: "",
};

function Field({
  label,
  children,
  error,
  className,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink/60">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 font-mono text-[0.66rem] uppercase tracking-wide text-clay">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k: Fields, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.nombre.trim()) e.nombre = t.contact.errName;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.correo))
      e.correo = t.contact.errEmail;
    if (!form.mensaje.trim() || form.mensaje.trim().length < 5)
      e.mensaje = t.contact.errMsg;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast(t.contact.toastTitle, {
        description: t.contact.toastDesc,
      });
      return;
    }
    
    setLoading(true);
    
    const result = await processContact({ form, lang });
    
    setLoading(false);

    if (result.success) {
      setSent(true);
      toast(t.contact.sentToastTitle, {
        description: t.contact.sentToastDesc,
      });
    } else {
      toast.error("Error", {
        description: "Ocurrió un problema al enviar el mensaje. Intenta de nuevo.",
      });
    }
  };

  if (sent) {
    return (
      <div className="flex min-h-[440px] flex-col items-center justify-center rounded-[1.6rem] border border-ink/10 bg-cream-paper p-10 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-clay text-cream-paper">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="display mt-6 text-3xl font-semibold text-ink">
          {t.contact.successTitle}
        </h3>
        <p className="mt-3 max-w-sm text-muted-foreground">
          {t.contact.successDesc}
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setForm(EMPTY);
            setSent(false);
          }}
        >
          {t.contact.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[1.6rem] border border-ink/10 bg-cream-paper p-6 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.contact.fullName} error={errors.nombre}>
          <Input
            value={form.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            placeholder={t.contact.namePlaceholder}
          />
        </Field>
        <Field label={t.contact.email} error={errors.correo}>
          <Input
            type="email"
            value={form.correo}
            onChange={(e) => update("correo", e.target.value)}
            placeholder={t.contact.emailPlaceholder}
          />
        </Field>
        <Field label={t.contact.phone}>
          <Input
            value={form.telefono}
            onChange={(e) => update("telefono", e.target.value)}
            placeholder={t.contact.phonePlaceholder}
          />
        </Field>
        <Field label={t.contact.subject}>
          <Input
            value={form.asunto}
            onChange={(e) => update("asunto", e.target.value)}
            placeholder={t.contact.subjectPlaceholder}
          />
        </Field>
        <Field label={t.contact.message} error={errors.mensaje} className="sm:col-span-2">
          <Textarea
            value={form.mensaje}
            onChange={(e) => update("mensaje", e.target.value)}
            placeholder={t.contact.msgPlaceholder}
            rows={6}
          />
        </Field>
      </div>

      <Button type="submit" size="lg" className="mt-7 w-full" disabled={loading}>
        {loading ? (
          <>
            {t.contact.sending}
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            {t.contact.submitBtn}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}