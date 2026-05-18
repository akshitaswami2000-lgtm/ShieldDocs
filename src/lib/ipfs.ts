"use client";

import type { Hex } from "viem";

type SignedUploadResponse = {
  url: string;
  expiresAt: number;
  maxFileSize: number;
};

type PinataUploadResponse = {
  data?: {
    cid?: string;
    size?: number;
    name?: string;
  };
};

const defaultGateway = "https://gateway.pinata.cloud";

export function ipfsUriFromCid(cid: string) {
  return `ipfs://${cid}`;
}

export function gatewayUrlFromStorageUri(storageUri: string) {
  const cid = storageUri.replace(/^ipfs:\/\//, "").replace(/^\/ipfs\//, "");
  const gateway = (process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL || defaultGateway).replace(/\/$/, "");
  return `${gateway}/ipfs/${cid}`;
}

export async function uploadEncryptedBytesToPinata({
  encryptedBytes,
  fileName,
  originalMimeType,
  payloadHash
}: {
  encryptedBytes: Uint8Array;
  fileName: string;
  originalMimeType: string;
  payloadHash: Hex;
}) {
  const encryptedFileName = `${fileName || "document"}.shielddocs.enc`;
  const signResponse = await fetch("/api/pinata/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: encryptedFileName,
      maxFileSize: encryptedBytes.byteLength
    })
  });

  if (!signResponse.ok) {
    const details = await readError(signResponse);
    throw new Error(details || "Could not create Pinata upload URL.");
  }

  const signed = (await signResponse.json()) as SignedUploadResponse;
  const payload = encryptedBytes.buffer.slice(
    encryptedBytes.byteOffset,
    encryptedBytes.byteOffset + encryptedBytes.byteLength
  ) as ArrayBuffer;
  const encryptedFile = new File([payload], encryptedFileName, { type: "application/octet-stream" });
  const formData = new FormData();
  formData.set("network", "public");
  formData.set("file", encryptedFile);
  formData.set("name", encryptedFileName);
  formData.set(
    "keyvalues",
    JSON.stringify({
      app: "ShieldDocs",
      encrypted: "true",
      originalName: fileName,
      originalMimeType: originalMimeType || "application/octet-stream",
      payloadHash
    })
  );

  const uploadResponse = await fetch(signed.url, {
    method: "POST",
    body: formData
  });

  if (!uploadResponse.ok) {
    const details = await readError(uploadResponse);
    throw new Error(details || "Pinata upload failed.");
  }

  const result = (await uploadResponse.json()) as PinataUploadResponse;
  const cid = result.data?.cid;
  if (!cid) {
    throw new Error("Pinata did not return a CID.");
  }

  return {
    cid,
    storageUri: ipfsUriFromCid(cid),
    gatewayUrl: gatewayUrlFromStorageUri(ipfsUriFromCid(cid)),
    size: result.data?.size ?? encryptedBytes.byteLength
  };
}

export async function fetchIpfsBytes(storageUri: string) {
  const response = await fetch(gatewayUrlFromStorageUri(storageUri));
  if (!response.ok) {
    throw new Error(`Could not fetch encrypted IPFS payload (${response.status}).`);
  }
  return new Uint8Array(await response.arrayBuffer());
}

async function readError(response: Response) {
  try {
    const body = (await response.json()) as { error?: string; text?: string; message?: string };
    return body.error || body.text || body.message || "";
  } catch {
    return response.statusText;
  }
}
