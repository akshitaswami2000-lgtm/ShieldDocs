"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import type { Hex } from "viem";
import { Download, ExternalLink, Share2 } from "lucide-react";
import { useAccount, usePublicClient, useReadContract, useWriteContract } from "wagmi";
import { ActionButton } from "@/components/ActionButton";
import { ContractBanner } from "@/components/ContractBanner";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeader } from "@/components/SectionHeader";
import {
  scopeAllowsPayload,
  scopeLabels,
  shieldDocsAbi,
  shieldDocsAddress,
  shieldDocsChainId,
  storageModeLabels
} from "@/lib/contract";
import { decryptPayloadBytesFromEnvelope, downloadBytes, hexToBytes, unpackDocumentBytes, verifyEncryptedPayloadHash } from "@/lib/crypto";
import { errorMessage } from "@/lib/errors";
import { formatBytes, formatDate, shortAddress } from "@/lib/format";
import { fetchIpfsBytes } from "@/lib/ipfs";
import { waitForTransaction } from "@/lib/transactions";
import { PermissionRecord, useSharedDocument } from "@/hooks/useShieldDocs";

export default function SharedPermissionPage() {
  const params = useParams<{ permissionId: string }>();
  const { address } = useAccount();
  const publicClient = usePublicClient({ chainId: shieldDocsChainId });
  const [status, setStatus] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const permissionId = useMemo(() => parsePositiveBigInt(params.permissionId), [params.permissionId]);
  const { writeContractAsync, isPending } = useWriteContract();

  const permission = useReadContract({
    address: shieldDocsAddress,
    abi: shieldDocsAbi,
    chainId: shieldDocsChainId,
    functionName: "getPermission",
    args: permissionId ? [permissionId] : undefined,
    query: { enabled: Boolean(permissionId && shieldDocsAddress) }
  });
  const permissionData = permission.data as PermissionRecord | undefined;
  const payloadAllowed = permissionData ? scopeAllowsPayload(Number(permissionData.scope), permissionData.canDownload) : false;
  const document = useSharedDocument(payloadAllowed ? permissionData?.id : undefined);

  async function openDocument() {
    if (!address || !permissionData || !document.data || !shieldDocsAddress) return;
    try {
      setStatus("Asking wallet to decrypt the shared key...");
      const encryptedBytes =
        document.data.storageMode === 1
          ? await fetchIpfsBytes(document.data.storageUri)
          : hexToBytes(document.data.encryptedPayload as Hex);
      verifyEncryptedPayloadHash(encryptedBytes, document.data.payloadHash);
      const bytes = await decryptPayloadBytesFromEnvelope(
        encryptedBytes,
        document.data.iv as Hex,
        document.data.keyEnvelope,
        address
      );
      const opened = unpackDocumentBytes(bytes, {
        title: document.data.title,
        category: document.data.category,
        fileName: document.data.fileName,
        mimeType: document.data.mimeType
      });
      downloadBytes(opened.bytes, opened.metadata.fileName, opened.metadata.mimeType);

      setStatus("File decrypted. Recording successful access on chain...");
      const txHash = await writeContractAsync({
        address: shieldDocsAddress,
        abi: shieldDocsAbi,
        chainId: shieldDocsChainId,
        functionName: "recordAccess",
        args: [permissionData.id, "Shared permission decrypted"]
      });
      setIsConfirming(true);
      await waitForTransaction(publicClient, txHash);
      setStatus("Decrypted file downloaded locally and access audit recorded.");
    } catch (error) {
      setStatus(`Shared access failed: ${errorMessage(error)}`);
    } finally {
      setIsConfirming(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <ContractBanner />
      <div className="mt-8">
        <SectionHeader eyebrow="Shared access" title="Permission link">
          This route opens a specific on-chain permission. The connected wallet must be the grantee or owner to read the
          sealed payload.
        </SectionHeader>
      </div>

      <section className="mt-8 surface rounded-md p-5">
        {!permissionData ? (
          <EmptyState icon={Share2} title="Permission not loaded">
            Connect the grantee wallet and confirm the permission ID in the URL.
          </EmptyState>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-semibold text-ink">{document.data?.title ?? "Encrypted document"}</h2>
              <div className="mt-4 grid gap-2 text-sm text-slate-600">
                <p>Scope: {scopeLabels[Number(permissionData.scope)]}</p>
                <p>Owner: {shortAddress(permissionData.owner)}</p>
                <p>Grantee: {shortAddress(permissionData.grantee)}</p>
                <p>Expires: {formatDate(permissionData.expiresAt)}</p>
                {document.data ? (
                  <>
                    <p>
                      File: {document.data.fileName} · {formatBytes(document.data.size)}
                    </p>
                    <p>Storage: {storageModeLabels[document.data.storageMode] ?? "Unknown"}</p>
                  </>
                ) : null}
              </div>
              {permissionData.revoked ? <p className="mt-4 font-medium text-rose-600">This permission was revoked.</p> : null}
              {permissionData && !payloadAllowed ? (
                <p className="mt-4 font-medium text-slate-600">
                  This scoped permission does not include decrypted document access.
                </p>
              ) : document.error ? (
                <p className="mt-4 font-medium text-rose-600">This permission is not currently active.</p>
              ) : null}
            </div>
            <ActionButton
              icon={permissionData.canDownload ? Download : ExternalLink}
              loading={isPending || isConfirming}
              disabled={!payloadAllowed || !document.data || permissionData.revoked}
              onClick={openDocument}
            >
              {payloadAllowed ? "Decrypt download" : "No file access"}
            </ActionButton>
          </div>
        )}
        {status ? <p className="mt-5 rounded-md bg-sky-50 p-3 text-sm text-slate-700">{status}</p> : null}
      </section>
    </div>
  );
}

function parsePositiveBigInt(value: string) {
  if (!/^[1-9]\d*$/.test(value)) return undefined;
  return BigInt(value);
}
