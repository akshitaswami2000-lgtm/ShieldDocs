import type { Address } from "viem";
import { shieldDocsAbi } from "@/lib/contracts/ShieldDocs";

export { shieldDocsAbi };

export const shieldDocsAddress = process.env.NEXT_PUBLIC_SHIELDDOCS_ADDRESS as Address | undefined;
export const zeroAddress = "0x0000000000000000000000000000000000000000" as const;
export const isContractConfigured =
  Boolean(shieldDocsAddress) && shieldDocsAddress !== zeroAddress && /^0x[a-fA-F0-9]{40}$/.test(shieldDocsAddress ?? "");

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
  "Document archived"
] as const;

export const maxPayloadBytes = 96 * 1024;
export const pinataDirectUploadLimitBytes = 100 * 1024 * 1024;
