"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const OCTANO_BASE_URL = "https://pagos.octanopayments.com/api/v1";

export async function processCheckout(payload: any) {
  try {
    const { form, items, totals, lang } = payload;
    const orderId = `PC-${Math.floor(100000 + Math.random() * 899999)}`;
    const currentLang = lang || "es";

    // 1. AUTENTICACIÓN EN OCTANO
    const authRes = await fetch(`${OCTANO_BASE_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        email: process.env.OCTANO_EMAIL!,
        password: process.env.OCTANO_PASSWORD!,
      }),
    });
    const authData = await authRes.json();
    if (!authData.authToken) throw new Error("Error de autenticación con la pasarela.");
    const token = authData.authToken;

    // 2. TOKENIZACIÓN DE LA TARJETA
    const expParts = form.exp.split("/");
    const cardData = {
      cardNumber: form.card.replace(/\s/g, ""),
      cardholderName: form.cardName,
      expirationMonth: expParts[0],
      expirationYear: `20${expParts[1]}`,
    };

    const tokenRes = await fetch(`${OCTANO_BASE_URL}/card/tokenizer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cardData }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.cardNumberToken) throw new Error("Error al procesar la tarjeta.");

    // 3. PROCESAR LA VENTA
    const salePayload = {
      amount: Math.round(totals.total * 100) / 100,
      currency: 484, // MXN
      reference: orderId,
      customerInformation: {
        firstName: form.nombre,
        lastName: form.apellidos,
        email: form.email,
        phone1: form.telefono,
        city: form.ciudad,
        address1: form.direccion,
        postalCode: form.cp,
        state: form.estado,
        country: form.pais === "México" ? "Mx" : form.pais,
      },
      cardData: {
        cardNumberToken: tokenData.cardNumberToken,
        cvv: form.cvc,
      },
      items: items.map((i: any) => ({
        title: i.product[currentLang].name, // <-- Usa el idioma activo
        amount: Math.round(i.product.priceMXN * 100) / 100,
        quantity: i.qty,
        id: String(i.product.id),
      })),
      redirectUrl: "https://growthive.com.mx/checkout",
    };

    const saleRes = await fetch(`${OCTANO_BASE_URL}/sale`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salePayload),
    });
    const saleData = await saleRes.json();

    // 4. MANEJO DE RESPUESTA DE OCTANO
    if (saleData.status === "DECLINED") {
      return { success: false, error: "Pago declinado. Intenta con otra tarjeta." };
    }
    
    if (saleData.status === "PENDING" && saleData.redirectTo) {
      return { success: true, redirectTo: saleData.redirectTo };
    }

    if (saleData.status !== "APPROVED") {
      return { success: false, error: "Respuesta inesperada del procesador de pago." };
    }

    // 5. ENVÍO DE CORREOS BILINGÜES
    await enviarCorreos(orderId, form, items, totals, currentLang);

    return { success: true, orderId };
  } catch (error: any) {
    console.error("Checkout Error:", error);
    return { success: false, error: error.message || "Ocurrió un error al procesar el pago." };
  }
}

async function enviarCorreos(orderId: string, form: any, items: any, totals: any, lang: string) {
  const adminEmail = process.env.ADMIN_EMAIL || "hola@growthive.com.mx";
  const senderEmail = "Growthive <hola@growthive.com.mx>"; 

  // Diccionario del correo
  const texts: Record<string, any> = {
    es: {
      subjectClient: `¡Gracias por tu pedido! Folio: ${orderId}`,
      subjectAdmin: `💰 NUEVA VENTA: ${orderId} - ${form.nombre}`,
      title: `Confirmación de Pedido: ${orderId}`,
      hello: `Hola`,
      intro: `Tu pago ha sido procesado exitosamente mediante Octano Payments. Hemos recibido tu solicitud para iniciar tu proyecto digital.`,
      totalPaid: `Total Pagado:`,
      clientData: `Datos del Cliente`,
      emailLabel: `Email:`,
      phoneLabel: `Teléfono:`,
      companyLabel: `Empresa/RFC:`,
      footer: `Growthive — Estudio Digital CDMX.`
    },
    en: {
      subjectClient: `Thank you for your order! Folio: ${orderId}`,
      subjectAdmin: `💰 NEW SALE: ${orderId} - ${form.nombre}`,
      title: `Order Confirmation: ${orderId}`,
      hello: `Hello`,
      intro: `Your payment has been successfully processed via Octano Payments. We have received your request to start your digital project.`,
      totalPaid: `Total Paid:`,
      clientData: `Customer Information`,
      emailLabel: `Email:`,
      phoneLabel: `Phone:`,
      companyLabel: `Company/Tax ID:`,
      footer: `Growthive — Digital Studio CDMX.`
    }
  };

  const t = texts[lang] || texts["es"];
  
  const itemsListHtml = items.map((i: any) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${i.qty}x ${i.product[lang].name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(i.product.priceMXN * i.qty).toFixed(2)} MXN</td>
    </tr>
  `).join("");

  const emailBody = `
    <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #ce4b2a;">${t.title}</h2>
      <p>${t.hello} <strong>${form.nombre}</strong>,</p>
      <p>${t.intro}</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
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
  } catch (err) {
    console.error("❌ Error ejecutando Resend (Checkout):", err);
  }
}