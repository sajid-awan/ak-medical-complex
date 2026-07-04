import { CONTACT } from "./site-data";

export function openWhatsApp(title: string, fields: Record<string, string>) {
  const body =
    `*${title}*\n\n` +
    Object.entries(fields)
      .filter(([, v]) => v.trim().length > 0)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
  const url = `https://wa.me/${CONTACT.whatsAppNumber}?text=${encodeURIComponent(body)}`;
  window.open(url, "_blank");
}

export const whatsAppLink = `https://wa.me/${CONTACT.whatsAppNumber}`;
