import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const defaultMaxUploadBytes = 100 * 1024 * 1024;

export async function POST(request: Request) {
  const token = process.env.PINATA_JWT;
  if (!token) {
    return NextResponse.json({ error: "PINATA_JWT is not configured." }, { status: 500 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    filename?: string;
    maxFileSize?: number;
  };
  const requestedSize = Number(body.maxFileSize ?? 0);
  const maxUploadBytes = Number(process.env.PINATA_MAX_UPLOAD_BYTES ?? defaultMaxUploadBytes);

  if (!Number.isFinite(requestedSize) || requestedSize <= 0) {
    return NextResponse.json({ error: "Invalid encrypted file size." }, { status: 400 });
  }

  if (requestedSize > maxUploadBytes) {
    return NextResponse.json(
      { error: `Encrypted file is above the configured Pinata limit of ${maxUploadBytes} bytes.` },
      { status: 413 }
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const response = await fetch("https://uploads.pinata.cloud/v3/files/sign", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: now,
      expires: 300,
      max_file_size: requestedSize,
      filename: sanitizeFileName(body.filename ?? "shielddocs.encrypted"),
      keyvalues: {
        app: "ShieldDocs",
        encrypted: "true"
      }
    })
  });

  const result = (await response.json().catch(() => ({}))) as { data?: string; error?: string; message?: string };
  if (!response.ok || !result.data) {
    return NextResponse.json(
      { error: result.error || result.message || "Pinata could not create a signed upload URL." },
      { status: response.status || 502 }
    );
  }

  return NextResponse.json({
    url: result.data,
    expiresAt: now + 300,
    maxFileSize: requestedSize
  });
}

function sanitizeFileName(value: string) {
  return value.replace(/[^\w.\-() ]+/g, "_").slice(0, 160) || "shielddocs.encrypted";
}
