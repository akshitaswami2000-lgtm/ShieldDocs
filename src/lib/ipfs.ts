"use client";

import type { Address, Hex } from "viem";
import { shieldDocsChainId } from "@/lib/contract";
import { createUploadIntent, uploadIntentDomain, uploadIntentTypes } from "@/lib/upload-auth";

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
const directUploadLimitBytes = 100 * 1024 * 1024;
const tusChunkSizeBytes = 48 * 1024 * 1024;

export type UploadProgress = {
  mode: "direct" | "resumable";
  bytesUploaded: number;
  bytesTotal: number;
  percentage: number;
};

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
  ownerAddress,
  payloadHash,
  onProgress
}: {
  encryptedBytes: Uint8Array;
  fileName: string;
  originalMimeType: string;
  ownerAddress: Address;
  payloadHash: Hex;
  onProgress?: (progress: UploadProgress) => void;
}) {
  const encryptedFileName = `${fileName || "document"}.shielddocs.enc`;
  const signed = await requestSignedUploadUrl(encryptedFileName, encryptedBytes.byteLength, ownerAddress);
  const encryptedFile = encryptedBytesToFile(encryptedBytes, encryptedFileName);

  if (encryptedBytes.byteLength > directUploadLimitBytes) {
    return uploadEncryptedFileWithTus({
      signedUrl: signed.url,
      encryptedFile,
      encryptedBytes,
      fileName,
      encryptedFileName,
      originalMimeType,
      payloadHash,
      onProgress
    });
  }

  onProgress?.({
    mode: "direct",
    bytesUploaded: 0,
    bytesTotal: encryptedBytes.byteLength,
    percentage: 0
  });

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

  onProgress?.({
    mode: "direct",
    bytesUploaded: encryptedBytes.byteLength,
    bytesTotal: encryptedBytes.byteLength,
    percentage: 100
  });

  return {
    cid,
    storageUri: ipfsUriFromCid(cid),
    gatewayUrl: gatewayUrlFromStorageUri(ipfsUriFromCid(cid)),
    size: result.data?.size ?? encryptedBytes.byteLength
  };
}

async function requestSignedUploadUrl(filename: string, maxFileSize: number, ownerAddress: Address) {
  const intent = createUploadIntent(ownerAddress, filename, maxFileSize, shieldDocsChainId);
  const signature = await signUploadIntent(intent);
  const signResponse = await fetch("/api/pinata/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...intent,
      signature
    })
  });

  if (!signResponse.ok) {
    const details = await readError(signResponse);
    throw new Error(details || "Could not create Pinata upload URL.");
  }

  return (await signResponse.json()) as SignedUploadResponse;
}

async function signUploadIntent(intent: ReturnType<typeof createUploadIntent>) {
  if (!window.ethereum) {
    throw new Error("Wallet extension not found.");
  }

  return (await window.ethereum.request({
    method: "eth_signTypedData_v4",
    params: [
      intent.address,
      JSON.stringify({
        domain: uploadIntentDomain(intent.chainId),
        types: {
          EIP712Domain: [
            { name: "name", type: "string" },
            { name: "version", type: "string" },
            { name: "chainId", type: "uint256" }
          ],
          ...uploadIntentTypes
        },
        primaryType: "UploadIntent",
        message: {
          address: intent.address,
          filename: intent.filename,
          maxFileSize: intent.maxFileSize,
          issuedAt: intent.issuedAt,
          nonce: intent.nonce
        }
      })
    ]
  })) as Hex;
}

function encryptedBytesToFile(encryptedBytes: Uint8Array, encryptedFileName: string) {
  const payload = encryptedBytes.buffer.slice(
    encryptedBytes.byteOffset,
    encryptedBytes.byteOffset + encryptedBytes.byteLength
  ) as ArrayBuffer;
  return new File([payload], encryptedFileName, { type: "application/octet-stream" });
}

async function uploadEncryptedFileWithTus({
  signedUrl,
  encryptedFile,
  encryptedBytes,
  fileName,
  encryptedFileName,
  originalMimeType,
  payloadHash,
  onProgress
}: {
  signedUrl: string;
  encryptedFile: File;
  encryptedBytes: Uint8Array;
  fileName: string;
  encryptedFileName: string;
  originalMimeType: string;
  payloadHash: Hex;
  onProgress?: (progress: UploadProgress) => void;
}) {
  const [{ Upload, isSupported }] = await Promise.all([import("tus-js-client")]);
  if (!isSupported) {
    throw new Error("This browser does not support resumable uploads.");
  }

  const predictedCid = predictIpfsCidFromBytes(encryptedBytes);
  const responseCid = await new Promise<string | undefined>((resolve, reject) => {
    const upload = new Upload(encryptedFile, {
      endpoint: signedUrl,
      chunkSize: tusChunkSizeBytes,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      uploadSize: encryptedBytes.byteLength,
      metadata: {
        filename: encryptedFileName,
        filetype: "application/octet-stream",
        network: "public",
        keyvalues: JSON.stringify({
          app: "ShieldDocs",
          encrypted: "true",
          originalName: fileName,
          originalMimeType: originalMimeType || "application/octet-stream",
          payloadHash
        })
      },
      fingerprint: async () => `shielddocs-${payloadHash}-${encryptedBytes.byteLength}`,
      onProgress(bytesUploaded, bytesTotal) {
        onProgress?.({
          mode: "resumable",
          bytesUploaded,
          bytesTotal,
          percentage: bytesTotal > 0 ? (bytesUploaded / bytesTotal) * 100 : 0
        });
      },
      onError(error) {
        reject(error);
      },
      onSuccess({ lastResponse }) {
        resolve(cidFromPinataBody(lastResponse.getBody()) ?? cidFromPinataHeader(lastResponse.getHeader("Location")));
      }
    });

    upload
      .findPreviousUploads()
      .then((previousUploads) => {
        if (previousUploads.length > 0) {
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }
        upload.start();
      })
      .catch(reject);
  });

  const cid = responseCid || (await predictedCid);
  if (!cid) {
    throw new Error("Could not determine the uploaded IPFS CID.");
  }

  return {
    cid,
    storageUri: ipfsUriFromCid(cid),
    gatewayUrl: gatewayUrlFromStorageUri(ipfsUriFromCid(cid)),
    size: encryptedBytes.byteLength
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

async function predictIpfsCidFromBytes(bytes: Uint8Array) {
  const [{ importer }, { MemoryBlockstore }] = await Promise.all([
    import("ipfs-unixfs-importer"),
    import("blockstore-core/memory")
  ]);
  const blockstore = new MemoryBlockstore();
  let cid = "";

  for await (const entry of importer([{ content: bytes }], blockstore, {
    cidVersion: 1,
    rawLeaves: true
  })) {
    cid = entry.cid.toString();
  }

  return cid;
}

function cidFromPinataBody(body: string) {
  try {
    const parsed = JSON.parse(body) as PinataUploadResponse;
    return parsed.data?.cid;
  } catch {
    return undefined;
  }
}

function cidFromPinataHeader(value?: string) {
  if (!value) return undefined;
  const match = value.match(/(bafy[a-z0-9]+|Qm[1-9A-HJ-NP-Za-km-z]+)/);
  return match?.[1];
}
