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
  const quota = await consumeUploadQuota(rateLimitKey);
  if (!quota.ok) {
    return NextResponse.json({ error: quota.error }, { status: quota.status });
  }
  const nonce = await reserveUploadNonce(auth.address, body.nonce ?? "");
  if (!nonce.ok) {
    return NextResponse.json({ error: nonce.error }, { status: nonce.status });
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

function pruneUsedNonces() {
  const now = Date.now();
  for (const [key, timestamp] of usedUploadNonces.entries()) {
    if (now - timestamp > rateLimitWindowMs) {
      usedUploadNonces.delete(key);
    }
  }
}

async function consumeUploadQuota(key: string) {
  const redis = redisConfig();
  if (redis) {
    return consumeRedisUploadQuota(redis, key);
  }
  return consumeMemoryUploadQuota(key);
}

async function reserveUploadNonce(address: string, nonce: string) {
  const redis = redisConfig();
  if (redis) {
    return reserveRedisNonce(redis, address, nonce);
  }
  pruneUsedNonces();
  const key = `${address.toLowerCase()}:${nonce}`;
  if (usedUploadNonces.has(key)) {
    return { ok: false as const, status: 409, error: "Upload authorization nonce was already used." };
  }
  usedUploadNonces.set(key, Date.now());
  return { ok: true as const };
}

function consumeMemoryUploadQuota(key: string) {
  const now = Date.now();
  const attempts = (signedUploadAttempts.get(key) ?? []).filter((timestamp) => now - timestamp < rateLimitWindowMs);
  if (attempts.length >= maxSignedUrlsPerWindow) {
    signedUploadAttempts.set(key, attempts);
    return { ok: false as const, status: 429, error: "Upload signing limit reached. Try again later." };
  }
  attempts.push(now);
  signedUploadAttempts.set(key, attempts);
  return { ok: true as const };
}

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : undefined;
}

async function consumeRedisUploadQuota(redis: { url: string; token: string }, key: string) {
  const redisKey = namespacedRedisKey("rate", key);
  const increment = await redisCommand(redis, ["INCR", redisKey]);
  if (!increment.ok) return increment;

  const count = Number(increment.result);
  if (!Number.isFinite(count)) {
    return { ok: false as const, status: 503, error: "Upload rate-limit store returned an invalid response." };
  }
  if (count === 1) {
    const expiry = await redisCommand(redis, ["PEXPIRE", redisKey, rateLimitWindowMs.toString()]);
    if (!expiry.ok) return expiry;
  }
  if (count > maxSignedUrlsPerWindow) {
    return { ok: false as const, status: 429, error: "Upload signing limit reached. Try again later." };
  }
  return { ok: true as const };
}

async function reserveRedisNonce(redis: { url: string; token: string }, address: string, nonce: string) {
  const redisKey = namespacedRedisKey("nonce", `${address.toLowerCase()}:${nonce}`);
  const response = await redisCommand(redis, ["SET", redisKey, "1", "NX", "PX", rateLimitWindowMs.toString()]);
  if (!response.ok) return response;
  if (response.result !== "OK") {
    return { ok: false as const, status: 409, error: "Upload authorization nonce was already used." };
  }
  return { ok: true as const };
}

async function redisCommand(redis: { url: string; token: string }, command: string[]) {
  const response = await fetch(redis.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redis.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command),
    cache: "no-store"
  }).catch(() => undefined);

  if (!response) {
    return { ok: false as const, status: 503, error: "Upload rate-limit store is unavailable." };
  }
  const body = (await response.json().catch(() => ({}))) as { result?: unknown; error?: string };
  if (!response.ok || body.error) {
    return { ok: false as const, status: 503, error: body.error || "Upload rate-limit store rejected the request." };
  }
  return { ok: true as const, result: body.result };
}

function namespacedRedisKey(kind: "rate" | "nonce", value: string) {
  return `shielddocs:pinata:${kind}:${value.replace(/[^a-zA-Z0-9:._-]/g, "_")}`;
}
