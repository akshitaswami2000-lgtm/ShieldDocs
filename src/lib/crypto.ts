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

export async function encryptFileForChain(file: File, ownerPublicKey: string): Promise<EncryptedDocumentPayload> {
  const data = new Uint8Array(await file.arrayBuffer());
  const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
  const rawKey = new Uint8Array(await crypto.subtle.exportKey("raw", key));
  const rawKeyBase64 = bytesToBase64(rawKey);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data));
  const encryptedPayload = bytesToHex(encrypted);

  return {
    encryptedPayload,
    encryptedBytes: encrypted,
    iv: bytesToHex(iv),
    payloadHash: keccak256(encryptedPayload),
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
