import type { Address, Hex } from "viem";

export type UploadIntent = {
  address: Address;
  chainId: number;
  filename: string;
  maxFileSize: number;
  issuedAt: number;
  nonce: string;
};

export type SignedUploadIntent = UploadIntent & {
  signature: Hex;
};

export const uploadIntentTypes = {
  UploadIntent: [
    { name: "address", type: "address" },
    { name: "filename", type: "string" },
    { name: "maxFileSize", type: "uint256" },
    { name: "issuedAt", type: "uint256" },
    { name: "nonce", type: "string" }
  ]
} as const;

export function uploadIntentDomain(chainId: number) {
  return {
    name: "ShieldDocs Pinata Upload",
    version: "1",
    chainId
  } as const;
}

export function createUploadIntent(address: Address, filename: string, maxFileSize: number, chainId: number): UploadIntent {
  return {
    address,
    chainId,
    filename,
    maxFileSize,
    issuedAt: Math.floor(Date.now() / 1000),
    nonce: crypto.randomUUID()
  };
}
