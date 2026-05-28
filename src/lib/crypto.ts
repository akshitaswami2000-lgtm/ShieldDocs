"use client";

import { encrypt } from "@metamask/eth-sig-util";
import { keccak256, type Hex } from "viem";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }
}

const encryptionVersion = "x25519-xsalsa20-poly1305";

export type EncryptedDocumentPayload = {
  encryptedPayload: Hex;
  encryptedBytes: Uint8Array;
  iv: Hex;
  payloadHash: Hex;
  keyEnvelope: string;
  rawKeyBase64: string;
  size: number;
};

export type DocumentMetadata = {
  title: string;
  category: string;
  fileName: string;
  mimeType: string;
};

export type DecryptedDocument = {
  bytes: Uint8Array;
  metadata: DocumentMetadata;
  isPackaged: boolean;
};

export type EncryptOptions = {
  inlinePayloadLimit?: number;
  metadata?: DocumentMetadata;
};

const defaultInlinePayloadLimit = 96 * 1024;
const packageMagic = new TextEncoder().encode("SHIELDDOCS1\n");
const maxMetadataBytes = 8192;

export async function requestWalletEncryptionPublicKey(address: string) {
  if (!window.ethereum) {
    throw new Error("Wallet extension not found.");
  }

  return (await window.ethereum.request({
    method: "eth_getEncryptionPublicKey",
    params: [address]
  })) as string;
}

export function encryptKeyEnvelope(publicKey: string, rawKeyBase64: string) {
  const encrypted = encrypt({
    publicKey,
    data: rawKeyBase64,
    version: encryptionVersion
  });

  return bytesToHex(new TextEncoder().encode(JSON.stringify(encrypted)));
}

export async function decryptKeyEnvelope(keyEnvelope: string, address: string) {
  if (!window.ethereum) {
    throw new Error("Wallet extension not found.");
  }

  return (await window.ethereum.request({
    method: "eth_decrypt",
    params: [keyEnvelope, address]
  })) as string;
}

export async function encryptFileForChain(
  file: File,
  ownerPublicKey: string,
  options: EncryptOptions = {}
): Promise<EncryptedDocumentPayload> {
  const data = new Uint8Array(await file.arrayBuffer());
  const payload = options.metadata ? packDocumentBytes(data, options.metadata) : data;
  return encryptBytesForChain(payload, ownerPublicKey, options);
}

export async function encryptBytesForChain(
  data: Uint8Array,
  ownerPublicKey: string,
  options: EncryptOptions = {}
): Promise<EncryptedDocumentPayload> {
  const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
  const rawKey = new Uint8Array(await crypto.subtle.exportKey("raw", key));
  const rawKeyBase64 = bytesToBase64(rawKey);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const payload = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
  const encrypted = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, payload));
  const inlinePayloadLimit = options.inlinePayloadLimit ?? defaultInlinePayloadLimit;
  const encryptedPayload = encrypted.byteLength <= inlinePayloadLimit ? bytesToHex(encrypted) : "0x";

  return {
    encryptedPayload,
    encryptedBytes: encrypted,
    iv: bytesToHex(iv),
    payloadHash: keccak256(encrypted),
    keyEnvelope: encryptKeyEnvelope(ownerPublicKey, rawKeyBase64),
    rawKeyBase64,
    size: encrypted.byteLength
  };
}

export async function decryptPayloadFromEnvelope(
  encryptedPayload: Hex,
  iv: Hex,
  keyEnvelope: string,
  address: string
) {
  const rawKeyBase64 = await decryptKeyEnvelope(keyEnvelope, address);
  return decryptPayloadWithRawKey(encryptedPayload, iv, rawKeyBase64);
}

export async function decryptPayloadBytesFromEnvelope(
  encryptedBytes: Uint8Array,
  iv: Hex,
  keyEnvelope: string,
  address: string
) {
  const rawKeyBase64 = await decryptKeyEnvelope(keyEnvelope, address);
  return decryptPayloadBytesWithRawKey(encryptedBytes, iv, rawKeyBase64);
}

export async function decryptPayloadWithRawKey(encryptedPayload: Hex, iv: Hex, rawKeyBase64: string) {
  return decryptPayloadBytesWithRawKey(hexToBytes(encryptedPayload), iv, rawKeyBase64);
}

export async function decryptPayloadBytesWithRawKey(encryptedBytes: Uint8Array, iv: Hex, rawKeyBase64: string) {
  const rawKey = base64ToBytes(rawKeyBase64);
  const key = await crypto.subtle.importKey("raw", rawKey, { name: "AES-GCM" }, false, ["decrypt"]);
  const payload = encryptedBytes.buffer.slice(
    encryptedBytes.byteOffset,
    encryptedBytes.byteOffset + encryptedBytes.byteLength
  ) as ArrayBuffer;
  return new Uint8Array(
    await crypto.subtle.decrypt({ name: "AES-GCM", iv: hexToBytes(iv) }, key, payload)
  );
}

export function packDocumentBytes(bytes: Uint8Array, metadata: DocumentMetadata) {
  const metadataBytes = new TextEncoder().encode(JSON.stringify(normalizeMetadata(metadata)));
  if (metadataBytes.byteLength > maxMetadataBytes) {
    throw new Error("Document metadata is too large.");
  }

  const header = new Uint8Array(4);
  new DataView(header.buffer).setUint32(0, metadataBytes.byteLength, false);
  const packaged = new Uint8Array(packageMagic.byteLength + header.byteLength + metadataBytes.byteLength + bytes.byteLength);
  packaged.set(packageMagic, 0);
  packaged.set(header, packageMagic.byteLength);
  packaged.set(metadataBytes, packageMagic.byteLength + header.byteLength);
  packaged.set(bytes, packageMagic.byteLength + header.byteLength + metadataBytes.byteLength);
  return packaged;
}

export function unpackDocumentBytes(bytes: Uint8Array, fallback: DocumentMetadata): DecryptedDocument {
  if (!startsWith(bytes, packageMagic) || bytes.byteLength < packageMagic.byteLength + 4) {
    return {
      bytes,
      metadata: normalizeMetadata(fallback),
      isPackaged: false
    };
  }

  const metadataLength = new DataView(
    bytes.buffer,
    bytes.byteOffset + packageMagic.byteLength,
    4
  ).getUint32(0, false);
  const metadataStart = packageMagic.byteLength + 4;
  const payloadStart = metadataStart + metadataLength;

  if (metadataLength === 0 || metadataLength > maxMetadataBytes || payloadStart > bytes.byteLength) {
    return {
      bytes,
      metadata: normalizeMetadata(fallback),
      isPackaged: false
    };
  }

  try {
    const decoded = new TextDecoder().decode(bytes.slice(metadataStart, payloadStart));
    const metadata = normalizeMetadata(JSON.parse(decoded) as Partial<DocumentMetadata>);
    return {
      bytes: bytes.slice(payloadStart),
      metadata,
      isPackaged: true
    };
  } catch {
    return {
      bytes,
      metadata: normalizeMetadata(fallback),
      isPackaged: false
    };
  }
}

export function verifyEncryptedPayloadHash(encryptedBytes: Uint8Array, expectedHash: Hex) {
  const actualHash = keccak256(bytesToHex(encryptedBytes));
  if (actualHash.toLowerCase() !== expectedHash.toLowerCase()) {
    throw new Error("Encrypted payload hash mismatch. The IPFS content does not match the on-chain hash.");
  }
}

export function downloadBytes(bytes: Uint8Array, fileName: string, mimeType: string) {
  const payload = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  const blob = new Blob([payload], { type: mimeType || "application/octet-stream" });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = fileName || "shielddocs-file";
  anchor.click();
  URL.revokeObjectURL(href);
}

export function bytesToHex(bytes: Uint8Array): Hex {
  return `0x${Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function hexToBytes(hex: Hex) {
  const clean = hex.replace(/^0x/, "");
  const bytes = new Uint8Array(clean.length / 2);
  for (let index = 0; index < bytes.length; index++) {
    bytes[index] = Number.parseInt(clean.slice(index * 2, index * 2 + 2), 16);
  }
  return bytes;
}

export function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

export function base64ToBytes(value: string) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function normalizeMetadata(metadata: Partial<DocumentMetadata>): DocumentMetadata {
  return {
    title: (metadata.title || "Private document").slice(0, 120),
    category: (metadata.category || "Private").slice(0, 80),
    fileName: (metadata.fileName || "shielddocs-file").slice(0, 180),
    mimeType: (metadata.mimeType || "application/octet-stream").slice(0, 120)
  };
}

function startsWith(bytes: Uint8Array, prefix: Uint8Array) {
  if (bytes.byteLength < prefix.byteLength) return false;
  for (let index = 0; index < prefix.byteLength; index++) {
    if (bytes[index] !== prefix[index]) return false;
  }
  return true;
}
