import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { CV_MAX_BYTES, isAllowedCvFile } from "@/lib/schemas";

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "CV upload is not configured on the server." },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("cv");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No CV file provided." }, { status: 400 });
  }

  if (!isAllowedCvFile(file) || file.size > CV_MAX_BYTES) {
    return NextResponse.json({ error: "Invalid CV file." }, { status: 400 });
  }

  const safeName = file.name.replace(/[^\w.\-() ]+/g, "_");
  const blob = await put(`cvs/${Date.now()}-${safeName}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url });
}
