import type { Address } from "viem";
import { shieldDocsAbi } from "@/lib/contracts/ShieldDocs";

export { shieldDocsAbi };

export const shieldDocsAddress = process.env.NEXT_PUBLIC_SHIELDDOCS_ADDRESS as Address | undefined;
export const shieldDocsChainId = Number(process.env.NEXT_PUBLIC_SHIELDDOCS_CHAIN_ID ?? 11155111);
export const zeroAddress = "0x0000000000000000000000000000000000000000" as const;
export const isContractConfigured =
  Boolean(shieldDocsAddress) && shieldDocsAddress !== zeroAddress && /^0x[a-fA-F0-9]{40}$/.test(shieldDocsAddress ?? "");
const explorerAddressBaseUrls: Record<number, string> = {
  84532: "https://sepolia.basescan.org/address",
  11155111: "https://sepolia.etherscan.io/address",
  421614: "https://sepolia.arbiscan.io/address"
};

export const scopeLabels = ["View", "Download", "Verify age", "Medical emergency", "Legal review"] as const;
export const storageModeLabels = ["On chain", "Pinata IPFS"] as const;
export const requestStatusLabels = ["Pending", "Approved", "Denied", "Cancelled"] as const;
export const auditLabels = [
  "Vault created",
  "Document created",
  "Document updated",
  "Access requested",
  "Access approved",
  "Access denied",
  "Access revoked",
  "Access used",
  "Proof created",
  "Proof viewed",
  "Document archived",
  "Discovery updated"
] as const;

export const maxPayloadBytes = 96 * 1024;
export const pinataDirectUploadLimitBytes = 100 * 1024 * 1024;
const configuredPinataMaxUploadBytes = Number(process.env.NEXT_PUBLIC_PINATA_MAX_UPLOAD_BYTES ?? 1024 * 1024 * 1024);
export const pinataMaxUploadBytes =
  Number.isFinite(configuredPinataMaxUploadBytes) && configuredPinataMaxUploadBytes > 0
    ? configuredPinataMaxUploadBytes
    : 1024 * 1024 * 1024;
export const privateDocumentChainMetadata = {
  title: "Private document",
  category: "Private",
  fileName: "shielddocs-private.bin",
  mimeType: "application/octet-stream"
} as const;

export function scopeAllowsPayload(scope: number, canDownload = false) {
  return canDownload || scope === 1;
}

export function explorerAddressUrl(address = shieldDocsAddress, chainId = shieldDocsChainId) {
  const baseUrl = explorerAddressBaseUrls[chainId];
  return address && baseUrl ? `${baseUrl}/${address}` : undefined;
}
