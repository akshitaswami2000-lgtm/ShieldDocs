"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import type { Hex } from "viem";
import { Download, ExternalLink, Share2 } from "lucide-react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ActionButton } from "@/components/ActionButton";
import { ContractBanner } from "@/components/ContractBanner";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeader } from "@/components/SectionHeader";
import { scopeLabels, shieldDocsAbi, shieldDocsAddress, storageModeLabels } from "@/lib/contract";
import { decryptPayloadBytesFromEnvelope, downloadBytes, hexToBytes, verifyEncryptedPayloadHash } from "@/lib/crypto";
import { formatBytes, formatDate, shortAddress } from "@/lib/format";
import { fetchIpfsBytes } from "@/lib/ipfs";
import { PermissionRecord, useSharedDocument } from "@/hooks/useShieldDocs";

export default function SharedPermissionPage() {
  const params = useParams<{ permissionId: string }>();
  const { address } = useAccount();
  const [status, setStatus] = useState("");
  const permissionId = useMemo(() => {
    try {
      return BigInt(params.permissionId);
    } catch {
      return undefined;
    }
  }, [params.permissionId]);
  const { writeContractAsync, isPending } = useWriteContract();

  const permission = useReadContract({
    address: shieldDocsAddress,
    abi: shieldDocsAbi,
    functionName: "getPermission",
    args: permissionId ? [permissionId] : undefined,
    query: { enabled: Boolean(permissionId && shieldDocsAddress) }
  });
  const permissionData = permission.data as PermissionRecord | undefined;
  const document = useSharedDocument(permissionData?.id);

  async function openDocument() {
    if (!address || !permissionData || !document.data || !shieldDocsAddress) return;
    setStatus("Recording access and asking wallet to decrypt the shared key...");
    await writeContractAsync({
      address: shieldDocsAddress,
      abi: shieldDocsAbi,
      functionName: "recordAccess",
      args: [permissionData.id, "Shared permission opened"]
    });
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
    downloadBytes(bytes, document.data.fileName, document.data.mimeType);
    setStatus("Decrypted file downloaded locally.");
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
              {document.error ? (
                <p className="mt-4 font-medium text-rose-600">This permission is not currently active.</p>
              ) : null}
            </div>
            <ActionButton
              icon={permissionData.canDownload ? Download : ExternalLink}
              loading={isPending}
              disabled={!document.data || permissionData.revoked}
              onClick={openDocument}
            >
              {permissionData.canDownload ? "Decrypt download" : "Open encrypted view"}
            </ActionButton>
          </div>
        )}
        {status ? <p className="mt-5 rounded-md bg-sky-50 p-3 text-sm text-slate-700">{status}</p> : null}
      </section>
    </div>
  );
}
