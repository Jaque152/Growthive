// src/lib/octano.ts
// Capa de integración con Octano Payments.
// Incluye: cache de token, modo simulación y normalización de fecha (año a 2 dígitos).

const OCTANO_BASE_URL =
  process.env.OCTANO_BASE_URL || "https://pagos.octanopayments.com/api/v1";

const OCTANO_EMAIL = process.env.OCTANO_EMAIL || process.env.OCTANO_USER;
const OCTANO_PASSWORD = process.env.OCTANO_PASSWORD;

const IS_DEV = process.env.NODE_ENV === "development";

// -----------------------------------------------------------------------------
// Tipos
// -----------------------------------------------------------------------------

export interface OctanoCardData {
  number: string;
  name: string;
  month: string; // "05" o "5" → se normaliza
  year: string; // "25" o "2025" → se normaliza a "25"
}

export interface TokenizedCard {
  token: string;
  last4: string;
}

export interface OctanoCustomer {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  company?: string;
}

export interface OctanoSaleInput {
  amount: number;
  orderId: string;
  redirectUrl?: string;
  customer: OctanoCustomer;
  cardToken: string;
  cvv: string;
  ip?: string;
}

export interface OctanoSaleResult {
  success: boolean;
  needsRedirect: boolean;
  redirectUrl: string | null;
  orderId: string;
  reference: string;
  status: string;
  transactionId: string | null;
  message: string;
  raw?: OctanoApiResponse;
}

/**
 * Respuesta genérica de la API de Octano.
 * No conocemos todos sus campos, así que usamos index signature.
 */
interface OctanoApiResponse {
  authToken?: string;
  cardNumberToken?: string;
  token?: string;
  status?: string;
  redirectTo?: string;
  orderId?: string;
  reference?: string;
  transactionId?: string;
  id?: string;
  message?: string;
  error?: string;
  raw?: string;
  [key: string]: unknown;
}

// -----------------------------------------------------------------------------
// Cache de token de autenticación (15 min)
// -----------------------------------------------------------------------------

let authToken: string | null = null;
let tokenExpiry: number | null = null;

/**
 * Parsea una respuesta como JSON. Si falla, la envuelve en { raw }.
 * Evita `any` tipando el retorno como OctanoApiResponse.
 */
function parseJsonSafe(text: string): OctanoApiResponse {
  try {
    return JSON.parse(text) as OctanoApiResponse;
  } catch {
    return { raw: text };
  }
}

/**
 * Autentica contra Octano. Cachea el token por 15 minutos.
 * Si no hay credenciales y estamos en dev, retorna "simulated-token".
 */
export async function octanoLogin(): Promise<string> {
  if (authToken && tokenExpiry && Date.now() < tokenExpiry) {
    return authToken;
  }

  if (!OCTANO_EMAIL || !OCTANO_PASSWORD) {
    if (IS_DEV) {
      console.warn(
        "⚠️  [Octano] Credenciales no configuradas. Modo simulación activado.",
      );
      authToken = "simulated-token";
      tokenExpiry = Date.now() + 15 * 60 * 1000;
      return authToken;
    }
    throw new Error(
      "Credenciales de Octano no configuradas (OCTANO_EMAIL / OCTANO_PASSWORD).",
    );
  }

  console.log("🔐 [Octano] Autenticando...");

  const response = await fetch(`${OCTANO_BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email: OCTANO_EMAIL,
      password: OCTANO_PASSWORD,
    }),
  });

  const responseText = await response.text();
  const data = parseJsonSafe(responseText);

  if (!response.ok) {
    const errMessage =
      data.message || data.error || data.raw || "Error de autenticación";
    throw new Error(`Octano signin (${response.status}): ${errMessage}`);
  }

  const token = data.authToken;
  if (!token) throw new Error("Octano no devolvió authToken.");

  authToken = token;
  tokenExpiry = Date.now() + 15 * 60 * 1000;
  console.log("✅ [Octano] Autenticación exitosa.");
  return token;
}

// -----------------------------------------------------------------------------
// Tokenización de tarjeta
// -----------------------------------------------------------------------------

/**
 * Normaliza mes/año para Octano:
 *   - Mes  → "5"  a "05"
 *   - Año  → "2025" a "25"  |  "25" se queda "25"
 */
function normalizeExpiration(
  monthInput: string,
  yearInput: string,
): { month: string; year: string } {
  const month = String(monthInput).replace(/\D/g, "").padStart(2, "0");
  let year = String(yearInput).replace(/\D/g, "");

  if (year.length === 4) {
    year = year.slice(-2);
  } else if (year.length !== 2) {
    throw new Error(`Año de expiración inválido: "${yearInput}"`);
  }

  const monthNum = parseInt(month, 10);
  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    throw new Error(`Mes de expiración inválido: "${monthInput}"`);
  }

  return { month, year };
}

/**
 * Tokeniza una tarjeta con Octano.
 * Si el token de sesión es "simulated-token", devuelve un token falso.
 */
export async function tokenizarTarjeta(
  sessionToken: string,
  card: OctanoCardData,
): Promise<TokenizedCard> {
  const last4 = card.number.replace(/\s/g, "").slice(-4);

  if (sessionToken === "simulated-token") {
    return {
      token: `tok_sim_${Date.now()}`,
      last4,
    };
  }

  const { month, year } = normalizeExpiration(card.month, card.year);
  console.log("📅 [Octano] Expiración normalizada (MM/YY):", {
    month,
    year,
  });

  const response = await fetch(`${OCTANO_BASE_URL}/card/tokenizer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${sessionToken}`,
    },
    body: JSON.stringify({
      cardData: {
        cardNumber: card.number.replace(/\s/g, ""),
        cardholderName: card.name,
        expirationMonth: month,
        expirationYear: year, // 👈 2 dígitos, tal como pide Octano
      },
    }),
  });

  const responseText = await response.text();
  const data = parseJsonSafe(responseText);

  if (!response.ok) {
    const errMessage =
      data.message || data.error || data.raw || "Error tokenizando tarjeta";
    throw new Error(`Octano tokenizer (${response.status}): ${errMessage}`);
  }

  const cardNumberToken = data.cardNumberToken || data.token;
  if (!cardNumberToken) throw new Error("Octano no devolvió cardNumberToken.");

  return { token: cardNumberToken, last4 };
}

// -----------------------------------------------------------------------------
// Procesamiento de venta
// -----------------------------------------------------------------------------

/**
 * Procesa el cobro en Octano.
 * Detecta automáticamente si requiere redirección 3DS.
 */
export async function procesarPago(
  sessionToken: string,
  input: OctanoSaleInput,
): Promise<OctanoSaleResult> {
  // Modo simulación
  if (sessionToken === "simulated-token") {
    await new Promise((r) => setTimeout(r, 1200));
    return {
      success: true,
      needsRedirect: false,
      redirectUrl: null,
      orderId: input.orderId,
      reference: input.orderId,
      status: "APPROVED",
      transactionId: `TXN-SIM-${Date.now()}`,
      message: "Pago simulado exitosamente.",
    };
  }

  const salePayload = {
    amount: Math.round(input.amount * 100) / 100,
    currency: "484", // MXN
    reference: input.orderId,
    ...(input.redirectUrl ? { redirectUrl: input.redirectUrl } : {}),
    customerInformation: {
      firstName: input.customer.firstName || "N/A",
      lastName: input.customer.lastName || "N/A",
      email: input.customer.email || "",
      phone1: input.customer.phone || "",
      address1: input.customer.address1 || "",
      address2: input.customer.address2 || "",
      city: input.customer.city || "",
      state: input.customer.state || "",
      postalCode: input.customer.postalCode || "",
      country: input.customer.country || "Mx",
      company: input.customer.company || "",
      ip: input.ip || "127.0.0.1",
    },
    cardData: {
      cardNumberToken: input.cardToken,
      cvv: input.cvv,
    },
  };

  console.log("📤 [Octano] Enviando /sale:", {
    ...salePayload,
    cardData: { ...salePayload.cardData, cvv: "***" },
  });

  const response = await fetch(`${OCTANO_BASE_URL}/sale`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${sessionToken}`,
    },
    body: JSON.stringify(salePayload),
  });

  const responseText = await response.text();
  const data = parseJsonSafe(responseText);

  console.log("📥 [Octano] Respuesta /sale:", data);

  if (!response.ok) {
    const errMessage =
      data.message || data.error || data.raw || "Error procesando pago";
    throw new Error(`Octano sale (${response.status}): ${errMessage}`);
  }

  const isApproved = data.status === "APPROVED";
  const needsRedirect = !!data.redirectTo && data.redirectTo !== "";

  return {
    success: isApproved,
    needsRedirect,
    redirectUrl: data.redirectTo || null,
    orderId: data.orderId || data.reference || input.orderId,
    reference: data.reference || input.orderId,
    status: data.status || "UNKNOWN",
    transactionId: data.transactionId || data.id || null,
    message:
      data.message || (isApproved ? "Pago aprobado" : "Pago rechazado"),
    raw: data,
  };
}

// -----------------------------------------------------------------------------
// Helper: parsea el string "MM/AA" o "MM/AAAA" del formulario
// -----------------------------------------------------------------------------

export function parseExpiration(exp: string): { month: string; year: string } {
  const cleaned = exp.replace(/\D/g, "");

  if (cleaned.length === 4) {
    // "0525" → mes "05", año "25"
    return { month: cleaned.slice(0, 2), year: cleaned.slice(2, 4) };
  }
  if (cleaned.length === 6) {
    // "052025" → mes "05", año "25" (se normaliza después)
    return { month: cleaned.slice(0, 2), year: cleaned.slice(4, 6) };
  }
  throw new Error(`Formato de fecha de expiración inválido: "${exp}"`);
}