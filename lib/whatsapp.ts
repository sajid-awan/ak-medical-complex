import { CONTACT } from "./site-data";

function formatWhatsAppBody(title: string, fields: Record<string, string>) {
  return (
    `*${title}*\n\n` +
    Object.entries(fields)
      .filter(([, value]) => value.trim().length > 0)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")
  );
}

export function openWhatsApp(title: string, fields: Record<string, string>) {
  const body = formatWhatsAppBody(title, fields);
  const url = `https://wa.me/${CONTACT.whatsAppNumber}?text=${encodeURIComponent(body)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export const whatsAppLink = `https://wa.me/${CONTACT.whatsAppNumber}`;

async function uploadCv(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("cv", file);

  const response = await fetch("/api/upload-cv", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;
    throw new Error(data?.error ?? "CV upload failed");
  }

  const data = (await response.json()) as { url: string };
  return data.url;
}

export async function openWhatsAppWithCv(
  title: string,
  fields: Record<string, string>,
  cv: File,
) {
  const cvUrl = await uploadCv(cv);

  openWhatsApp(title, {
    ...fields,
    "CV Link": cvUrl,
  });
}
