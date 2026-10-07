// src/app/actions/checkout.ts
"use server";

import { Resend } from "resend";
import {
  octanoLogin,
  tokenizarTarjeta,
  procesarPago,
  parseExpiration,
} from "@/lib/octano";

const resend = new Resend(process.env.RESEND_API_KEY);

// -----------------------------------------------------------------------------
// Tipos públicos (usados por checkout-client.tsx)
// -----------------------------------------------------------------------------

export interface CheckoutFormState {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  empresa?: string;
  rfc?: string;
  direccion: string;
  ciudad: string;
  estado: string;
  cp: string;
  pais: string;
  card: string;
  cardName: string;
  exp: string;
  cvc: string;
  notas?: string;
}

export interface CheckoutItem {
  product: {
    id: string | number;
    priceMXN: number;
    es: { name: string };
    en: { name: string };
  };
  qty: number;
}

export interface CheckoutPayload {
  form: CheckoutFormState;
  items: CheckoutItem[];
  totals: {
    subtotal: number;
    iva: number;
    total: number;
  };
  lang: "es" | "en";
}

export interface CheckoutResult {
  success: boolean;
  orderId?: string;
  redirectTo?: string;
  error?: string;
}

// -----------------------------------------------------------------------------
// Server Action principal
// -----------------------------------------------------------------------------

export async function processCheckout(
  payload: CheckoutPayload,
): Promise<CheckoutResult> {
  try {
    const { form, items, totals, lang } = payload;
    const currentLang = lang || "es";
    const orderId = `GV-${Date.now().toString(36).toUpperCase()}`;

    // -------------------------------------------------------------------------
    // 1. Autenticación en Octano
    // -------------------------------------------------------------------------
    const sessionToken = await octanoLogin();

    // -------------------------------------------------------------------------
    // 2. Tokenización de la tarjeta
    // -------------------------------------------------------------------------
    const { month, year } = parseExpiration(form.exp); // "MM/AA" → { "05", "25" }

    const { token: cardToken, last4 } = await tokenizarTarjeta(sessionToken, {
      number: form.card.replace(/\s/g, ""),
      name: form.cardName,
      month,
      year, // 👈 2 dígitos
    });

    console.log("💳 [Checkout] Tarjeta tokenizada. Últimos 4:", last4);

    // -------------------------------------------------------------------------
    // 3. Procesar el cobro
    // -------------------------------------------------------------------------
    const resultado = await procesarPago(sessionToken, {
      amount: totals.total,
      orderId,
      customer: {
        firstName: form.nombre,
        lastName: form.apellidos,
        email: form.email,
        phone: form.telefono,
        address1: form.direccion,
        city: form.ciudad,
        state: form.estado,
        postalCode: form.cp,
        country: form.pais === "México" ? "Mx" : form.pais,
        company: form.empresa || "",
      },
      cardToken,
      cvv: form.cvc.replace(/\s/g, ""),
    });

    console.log("💰 [Checkout] Resultado Octano:", resultado.status);

    // -------------------------------------------------------------------------
    // 4. Si Octano requiere 3DS redirect
    // -------------------------------------------------------------------------
    if (resultado.needsRedirect && resultado.redirectUrl) {
      return {
        success: true,
        redirectTo: resultado.redirectUrl,
      };
    }

    // -------------------------------------------------------------------------
    // 5. Si fue declinado / rechazado
    // -------------------------------------------------------------------------
    if (!resultado.success) {
      const msg =
        resultado.status === "DECLINED"
          ? currentLang === "es"
            ? "Pago declinado. Revisa los fondos o intenta con otra tarjeta."
            : "Payment declined. Check funds or try another card."
          : currentLang === "es"
            ? "La transacción falló o fue rechazada por el banco."
            : "The transaction failed or was rejected by the bank.";

      return { success: false, error: msg };
    }

    // -------------------------------------------------------------------------
    // 6. Enviar correos (cliente + admin)
    // -------------------------------------------------------------------------
    await enviarCorreos(
      resultado.orderId || orderId,
      last4,
      form,
      items,
      totals,
      currentLang,
    );

    return { success: true, orderId: resultado.orderId || orderId };
  } catch (error: unknown) {
    console.error("❌ [Checkout] Error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al procesar el pago.";
    return { success: false, error: errorMessage };
  }
}

// -----------------------------------------------------------------------------
// Emails con Resend (copy ES/EN manteniendo branding Growthive)
// -----------------------------------------------------------------------------

async function enviarCorreos(
  orderId: string,
  last4: string,
  form: CheckoutFormState,
  items: CheckoutItem[],
  totals: { subtotal: number; iva: number; total: number },
  lang: "es" | "en",
) {
  const adminEmail = process.env.ADMIN_EMAIL || "hola@growthive.com.mx";
  const senderEmail =
    process.env.EMAIL_FROM || "Growthive <hola@growthive.com.mx>";

  const texts = {
    es: {
      subjectClient: `¡Gracias por tu pedido! Folio: ${orderId}`,
      subjectAdmin: `💰 NUEVA VENTA: ${orderId} - ${form.nombre}`,
      title: `Confirmación de Pedido: ${orderId}`,
      hello: `Hola`,
      intro: `Tu pago ha sido procesado exitosamente. Hemos recibido tu solicitud para iniciar tu proyecto digital.`,
      orderSummary: "Resumen del pedido",
      cardLabel: "Tarjeta",
      totalPaid: `Total Pagado:`,
      clientData: `Datos del Cliente`,
      emailLabel: `Email:`,
      phoneLabel: `Teléfono:`,
      companyLabel: `Empresa/RFC:`,
      footer: `Growthive — Estudio Digital CDMX.`,
    },
    en: {
      subjectClient: `Thank you for your order! Folio: ${orderId}`,
      subjectAdmin: `💰 NEW SALE: ${orderId} - ${form.nombre}`,
      title: `Order Confirmation: ${orderId}`,
      hello: `Hello`,
      intro: `Your payment has been successfully processed. We have received your request to start your digital project.`,
      orderSummary: "Order Summary",
      cardLabel: "Card",
      totalPaid: `Total Paid:`,
      clientData: `Customer Information`,
      emailLabel: `Email:`,
      phoneLabel: `Phone:`,
      companyLabel: `Company/Tax ID:`,
      footer: `Growthive — Digital Studio CDMX.`,
    },
  };

  const t = texts[lang] || texts.es;

  const itemsListHtml = items
    .map(
      (i) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${i.qty}x ${i.product[lang].name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(i.product.priceMXN * i.qty).toFixed(2)} MXN</td>
    </tr>
  `,
    )
    .join("");

  const emailBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #ce4b2a;">${t.title}</h2>
      <p>${t.hello} <strong>${form.nombre}</strong>,</p>
      <p>${t.intro}</p>

      <p style="margin: 8px 0;"><strong>${t.cardLabel}:</strong> **** **** **** ${last4}</p>

      <h3 style="margin-top: 24px;">${t.orderSummary}</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        ${itemsListHtml}
        <tr>
          <td style="padding: 10px; font-weight: bold; text-align: right;">${t.totalPaid}</td>
          <td style="padding: 10px; font-weight: bold; text-align: right; color: #ce4b2a;">$${totals.total.toFixed(2)} MXN</td>
        </tr>
      </table>

      <h3 style="margin-top: 30px;">${t.clientData}</h3>
      <p><strong>${t.emailLabel}</strong> ${form.email}<br/>
      <strong>${t.phoneLabel}</strong> ${form.telefono}<br/>
      <strong>${t.companyLabel}</strong> ${form.empresa || "N/A"} / ${form.rfc || "N/A"}</p>

      <p style="margin-top: 30px; font-size: 12px; color: #888;">${t.footer}</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: senderEmail,
      to: form.email,
      subject: t.subjectClient,
      html: emailBody,
    });

    await resend.emails.send({
      from: senderEmail,
      to: adminEmail,
      subject: t.subjectAdmin,
      html: `<div style="background-color: #f4ede0; padding: 20px;">${emailBody}</div>`,
    });

    console.log("📧 [Checkout] Correos enviados.");
  } catch (err) {
    console.error("❌ [Checkout] Error enviando Resend:", err);
  }
}