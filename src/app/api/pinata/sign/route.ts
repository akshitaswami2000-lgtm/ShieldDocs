import { NextResponse } from "next/server";
import { isAddress, verifyTypedData, type Hex } from "viem";
import { uploadIntentDomain, uploadIntentTypes, type SignedUploadIntent } from "@/lib/upload-auth";

export const dynamic = "force-dynamic";

const productionMaxUploadBytes = 1024 * 1024 * 1024;
const uploadIntentMaxAgeSeconds = 5 * 60;
const rateLimitWindowMs = 10 * 60 * 1000;
const maxSignedUrlsPerWindow = 8;
const signedUploadAttempts = new Map<string, number[]>();
const usedUploadNonces = new Map<string, number>();
const zeroAddress = "0x0000000000000000000000000000000000000000";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Partial<SignedUploadIntent>;
  const requestedSize = Number(body.maxFileSize ?? 0);
  const configuredMaxUploadBytes = Number(process.env.PINATA_MAX_UPLOAD_BYTES ?? productionMaxUploadBytes);
  const maxUploadBytes =
    Number.isFinite(configuredMaxUploadBytes) && configuredMaxUploadBytes > 0
      ? configuredMaxUploadBytes
      : productionMaxUploadBytes;

  if (!Number.isFinite(requestedSize) || requestedSize <= 0) {
    return NextResponse.json({ error: "Invalid encrypted file size." }, { status: 400 });
  }

  if (requestedSize > maxUploadBytes) {
    return NextResponse.json(
      { error: `Encrypted file is above the configured Pinata limit of ${maxUploadBytes} bytes.` },
      { status: 413 }
    );
  }

  const auth = await validateUploadIntent(body, requestedSize);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const token = process.env.PINATA_JWT;
  if (!token) {
    return NextResponse.json({ error: "PINATA_JWT is not configured." }, { status: 500 });
  }

  const rateLimitKey = `${auth.address}:${clientIp(request)}`;
  if (!consumeRateLimit(rateLimitKey)) {
    return NextResponse.json({ error: "Upload signing limit reached. Try again later." }, { status: 429 });
  }
  if (isReplay(auth.address, body.nonce ?? "")) {
    return NextResponse.json({ error: "Upload authorization nonce was already used." }, { status: 409 });
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
  }).catch((error: unknown) => ({ ok: false, status: 502, json: async () => ({ error: pinataError(error) }) }) as Response);

  const result = (await response.json().catch(() => ({}))) as { data?: string; error?: string; message?: string };
  if (!response.ok || !result.data) {
    return NextResponse.json(
      { error: result.error || result.message || "Pinata could not create a signed upload URL." },
      { status: response.status || 502 }
    );
  }
  rememberNonce(auth.address, body.nonce ?? "");

  return NextResponse.json({
    url: result.data,
    expiresAt: now + 300,
    maxFileSize: requestedSize
  });
}

function sanitizeFileName(value: string) {
  return value.replace(/[^\w.\-() ]+/g, "_").slice(0, 160) || "shielddocs.encrypted";
}

function pinataError(error: unknown) {
  return error instanceof Error ? error.message : "Pinata signing request failed.";
}

async function validateUploadIntent(body: Partial<SignedUploadIntent>, requestedSize: number) {
  const issuedAt = Number(body.issuedAt ?? 0);
  const filename = sanitizeFileName(body.filename ?? "");
  const chainId = Number(body.chainId ?? 0);
  const expectedChainId = Number(process.env.NEXT_PUBLIC_SHIELDDOCS_CHAIN_ID ?? 11155111);
  const now = Math.floor(Date.now() / 1000);

  if (!body.address || !isAddress(body.address)) {
    return { ok: false as const, status: 401, error: "A valid wallet address is required." };
  }
  if (body.address.toLowerCase() === zeroAddress) {
    return { ok: false as const, status: 401, error: "A non-zero wallet address is required." };
  }
  if (!body.signature || !/^0x[0-9a-fA-F]+$/.test(body.signature)) {
    return { ok: false as const, status: 401, error: "A wallet signature is required." };
  }
  if (!filename || filename !== body.filename) {
    return { ok: false as const, status: 400, error: "Invalid encrypted filename." };
  }
  if (!Number.isInteger(issuedAt) || Math.abs(now - issuedAt) > uploadIntentMaxAgeSeconds) {
    return { ok: false as const, status: 401, error: "Upload authorization expired." };
  }
  if (!Number.isInteger(chainId) || chainId !== expectedChainId) {
    return { ok: false as const, status: 401, error: "Upload authorization chain does not match this app." };
  }
  if (!body.nonce || !/^[0-9a-fA-F-]{16,80}$/.test(body.nonce)) {
    return { ok: false as const, status: 400, error: "Invalid upload nonce." };
  }

  const valid = await verifyTypedData({
    address: body.address,
    domain: uploadIntentDomain(chainId),
    types: uploadIntentTypes,
    primaryType: "UploadIntent",
    message: {
      address: body.address,
      filename,
      maxFileSize: BigInt(requestedSize),
      issuedAt: BigInt(issuedAt),
      nonce: body.nonce
    },
    signature: body.signature as Hex
  }).catch(() => false);

  if (!valid) {
    return { ok: false as const, status: 401, error: "Upload authorization signature is invalid." };
  }

  return { ok: true as const, address: body.address };
}

function isReplay(address: string, nonce: string) {
  pruneUsedNonces();
  return usedUploadNonces.has(`${address.toLowerCase()}:${nonce}`);
}

function rememberNonce(address: string, nonce: string) {
  pruneUsedNonces();
  usedUploadNonces.set(`${address.toLowerCase()}:${nonce}`, Date.now());
}

function pruneUsedNonces() {
  const now = Date.now();
  for (const [key, timestamp] of usedUploadNonces.entries()) {
    if (now - timestamp > rateLimitWindowMs) {
      usedUploadNonces.delete(key);
    }
  }
}

function consumeRateLimit(key: string) {
  const now = Date.now();
  const attempts = (signedUploadAttempts.get(key) ?? []).filter((timestamp) => now - timestamp < rateLimitWindowMs);
  if (attempts.length >= maxSignedUrlsPerWindow) {
    signedUploadAttempts.set(key, attempts);
    return false;
  }
  attempts.push(now);
  signedUploadAttempts.set(key, attempts);
  return true;
}

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
