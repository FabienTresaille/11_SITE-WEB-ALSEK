import nodemailer from "nodemailer";
import { BRAND_CONTENT } from "@/data/content";

/**
 * API de contact — envoi SMTP via OVH (ssl0.ovh.net:465, TLS implicite).
 * Toutes les valeurs sensibles proviennent des variables d'environnement
 * (voir `.env.example`).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  offer: string;
  message: string;
  /** Champ piège invisible (honeypot) : doit rester vide */
  website: string;
}

const MAX_LENGTH = {
  name: 120,
  email: 160,
  phone: 30,
  offer: 40,
  message: 3000,
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+0-9 ().-]{6,30}$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parsePayload(raw: unknown): ContactPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as Record<string, unknown>;
  return {
    name: asString(data.name),
    email: asString(data.email),
    phone: asString(data.phone),
    offer: asString(data.offer),
    message: asString(data.message),
    website: asString(data.website),
  };
}

function validate(payload: ContactPayload): string | null {
  if (!payload.name || payload.name.length > MAX_LENGTH.name) {
    return "Merci d'indiquer votre nom.";
  }
  if (!EMAIL_REGEX.test(payload.email) || payload.email.length > MAX_LENGTH.email) {
    return "Merci d'indiquer une adresse e-mail valide.";
  }
  if (payload.phone && !PHONE_REGEX.test(payload.phone)) {
    return "Le numéro de téléphone semble invalide.";
  }
  const validOffers: readonly string[] = BRAND_CONTENT.footer.packOptions.map((o) => o.value);
  if (!validOffers.includes(payload.offer)) {
    return "Merci de sélectionner une formule.";
  }
  if (payload.message.length > MAX_LENGTH.message) {
    return "Votre message est trop long.";
  }
  return null;
}

function offerLabel(value: string): string {
  return BRAND_CONTENT.footer.packOptions.find((o) => o.value === value)?.label ?? value;
}

/* ------------------------------------------------------------------ */
/* Template HTML de l'e-mail (identité alsek : #0B0F29 / #00E676)      */
/* ------------------------------------------------------------------ */
function buildHtml(p: ContactPayload): string {
  const rows: Array<[string, string]> = [
    ["Nom", escapeHtml(p.name)],
    ["E-mail", `<a href="mailto:${escapeHtml(p.email)}" style="color:#00E676;text-decoration:none;">${escapeHtml(p.email)}</a>`],
    ["Téléphone", p.phone ? `<a href="tel:${escapeHtml(p.phone.replace(/[^+0-9]/g, ""))}" style="color:#00E676;text-decoration:none;">${escapeHtml(p.phone)}</a>` : "—"],
    ["Offre choisie", `<span style="display:inline-block;background:#1E3AFF;color:#ffffff;padding:4px 12px;border-radius:999px;font-weight:700;">${escapeHtml(offerLabel(p.offer))}</span>`],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);width:140px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.55);vertical-align:top;">${label}</td>
          <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:15px;color:#ffffff;">${value}</td>
        </tr>`
    )
    .join("");

  const messageHtml = p.message
    ? escapeHtml(p.message).replace(/\r?\n/g, "<br />")
    : "<em style=\"color:rgba(255,255,255,0.5);\">Aucun message.</em>";

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Nouvelle demande — alsek</title></head>
<body style="margin:0;padding:0;background:#05071a;font-family:Poppins,'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#05071a;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0B0F29;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
        <tr><td style="padding:28px 32px 20px;border-bottom:3px solid #00E676;">
          <div style="font-size:30px;font-weight:800;letter-spacing:-0.04em;color:#ffffff;line-height:1;">alsek</div>
          <div style="font-size:9px;font-weight:500;letter-spacing:0.25em;color:rgba(255,255,255,0.7);margin-top:4px;">MARKETING DIGITAL</div>
        </td></tr>
        <tr><td style="padding:28px 32px 8px;">
          <div style="font-size:11px;font-weight:800;letter-spacing:0.2em;color:#00E676;text-transform:uppercase;">Nouvelle demande de contact</div>
          <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#ffffff;text-transform:uppercase;">${escapeHtml(p.name)} souhaite lancer son mois de contenu</h1>
        </td></tr>
        <tr><td style="padding:12px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
        </td></tr>
        <tr><td style="padding:12px 32px 28px;">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:8px;">Message</div>
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-left:3px solid #00E676;border-radius:12px;padding:16px;font-size:14px;line-height:1.6;color:#ffffff;">${messageHtml}</div>
        </td></tr>
        <tr><td style="padding:18px 32px;background:#1E3AFF;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#ffffff;text-transform:uppercase;">
          Répondez directement à cet e-mail pour recontacter le prospect · ${escapeHtml(BRAND_CONTENT.identity.websiteDisplay)}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildText(p: ContactPayload): string {
  return [
    "Nouvelle demande de contact — alsek",
    "",
    `Nom : ${p.name}`,
    `E-mail : ${p.email}`,
    `Téléphone : ${p.phone || "—"}`,
    `Offre choisie : ${offerLabel(p.offer)}`,
    "",
    "Message :",
    p.message || "Aucun message.",
  ].join("\n");
}

function json(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, { status });
}

export async function POST(request: Request): Promise<Response> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "Requête invalide." }, 400);
  }

  const payload = parsePayload(raw);
  if (!payload) return json({ ok: false, error: "Requête invalide." }, 400);

  // Honeypot : un bot a rempli le champ invisible → on simule un succès sans rien envoyer
  if (payload.website) {
    return json({ ok: true });
  }

  const validationError = validate(payload);
  if (validationError) return json({ ok: false, error: validationError }, 422);

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_RECEIVER } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || SMTP_PASS === "change-me") {
    console.error(
      "[contact] Configuration SMTP incomplète ou mot de passe par défaut ('change-me'). Renseignez SMTP_PASS dans .env.local / .env."
    );
    return json(
      {
        ok: false,
        error:
          "Le serveur d'e-mail n'est pas encore configuré (SMTP_PASS). Appelez-nous directement au 06.14.30.88.01.",
      },
      500
    );
  }

  const port = Number(SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE ? SMTP_SECURE === "true" : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"alsek — Site web" <${SMTP_USER}>`,
      to: CONTACT_RECEIVER || BRAND_CONTENT.identity.email,
      replyTo: `"${payload.name.replace(/"/g, "")}" <${payload.email}>`,
      subject: `Nouvelle demande — ${offerLabel(payload.offer)} — ${payload.name}`,
      text: buildText(payload),
      html: buildHtml(payload),
    });
    return json({ ok: true });
  } catch (error) {
    console.error("[contact] Échec de l'envoi SMTP :", error);
    return json(
      { ok: false, error: "L'envoi a échoué. Réessayez dans un instant ou appelez-nous directement." },
      502
    );
  }
}
