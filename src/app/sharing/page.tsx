"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Ban, Clock, Copy, ExternalLink, KeyRound, RotateCcwKey, Send, Share2 } from "lucide-react";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { ActionButton } from "@/components/ActionButton";
import { ContractBanner } from "@/components/ContractBanner";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeader } from "@/components/SectionHeader";
import {
  isContractConfigured,
  scopeAllowsPayload,
  scopeLabels,
  shieldDocsAbi,
  shieldDocsAddress,
  shieldDocsChainId
} from "@/lib/contract";
import { errorMessage } from "@/lib/errors";
import { asAddress, formatDate, isValidAddress, shortAddress } from "@/lib/format";
import { waitForTransaction } from "@/lib/transactions";
import { decryptKeyEnvelope, encryptKeyEnvelope } from "@/lib/crypto";
import { useDocumentPermissions, useFullDocument, useOwnedDocuments } from "@/hooks/useShieldDocs";

export default function SharingPage() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient({ chainId: shieldDocsChainId });
  const { documents } = useOwnedDocuments();
  const [documentId, setDocumentId] = useState<bigint>();
  const [grantee, setGrantee] = useState("");
  const [recipientPublicKey, setRecipientPublicKey] = useState("");
  const [scope, setScope] = useState(0);
  const [hours, setHours] = useState(24);
  const [canDownload, setCanDownload] = useState(false);
  const [status, setStatus] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const fullDocument = useFullDocument(documentId);
  const permissions = useDocumentPermissions(documentId);
  const { writeContractAsync, isPending } = useWriteContract();

  const selectedDoc = useMemo(() => documents.find((doc) => doc.id === documentId), [documents, documentId]);
  const granteeAddressValid = useMemo(() => isValidAddress(grantee), [grantee]);
  const grantsPayload = useMemo(() => scopeAllowsPayload(scope, canDownload), [canDownload, scope]);

  async function grant() {
    if (!address || !documentId || !fullDocument.data || !shieldDocsAddress) return;
    if (!granteeAddressValid) {
      setStatus("Enter a valid recipient wallet address.");
      return;
    }

    try {
      const grantsPayload = scopeAllowsPayload(scope, canDownload);
      setStatus(grantsPayload ? "Unsealing your document key locally..." : "Preparing scoped permission without a document key...");
      const rawKey = grantsPayload ? await decryptKeyEnvelope(fullDocument.data.ownerKeyEnvelope, address) : "";
      const envelope = grantsPayload ? encryptKeyEnvelope(recipientPublicKey.trim(), rawKey) : "";
      const expiresAt = BigInt(Math.floor(Date.now() / 1000) + Math.max(1, hours) * 60 * 60);

      setStatus("Writing permission and sealed key envelope on chain...");
      const txHash = await writeContractAsync({
        address: shieldDocsAddress,
        abi: shieldDocsAbi,
        chainId: shieldDocsChainId,
        functionName: "grantAccess",
        args: [documentId, asAddress(grantee), scope, grantsPayload, expiresAt, grantsPayload ? envelope : ""]
      });
      setIsConfirming(true);
      setStatus("Transaction submitted. Waiting for confirmation...");
      await waitForTransaction(publicClient, txHash);
      await permissions.refetch();
      setStatus("Access grant confirmed.");
    } catch (error) {
      setStatus(`Grant failed: ${errorMessage(error)}`);
    } finally {
      setIsConfirming(false);
    }
  }

  async function revoke(permissionId: bigint) {
    if (!shieldDocsAddress) return;
    try {
      setStatus("Revoking permission on chain...");
      const txHash = await writeContractAsync({
        address: shieldDocsAddress,
        abi: shieldDocsAbi,
        chainId: shieldDocsChainId,
        functionName: "revokeAccess",
        args: [permissionId]
      });
      setIsConfirming(true);
      setStatus("Revoke submitted. Waiting for confirmation...");
      await waitForTransaction(publicClient, txHash);
      await permissions.refetch();
      setStatus("Permission revoked. Rotate the document key in Vault if this grant ever allowed file download.");
    } catch (error) {
      setStatus(`Revoke failed: ${errorMessage(error)}`);
    } finally {
      setIsConfirming(false);
    }
  }

  async function copyPermissionLink(permissionId: bigint) {
    const link = `${window.location.origin}/share/${permissionId.toString()}`;
    await navigator.clipboard.writeText(link);
    setStatus("Permission link copied.");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <ContractBanner />
          <div className="mt-8">
            <SectionHeader eyebrow="Temporary access" title="Share without losing control">
              Create expiring permissions, seal the AES document key to a recipient wallet, and revoke access from the
              same contract surface.
            </SectionHeader>
          </div>
        </div>

        <div className="surface rounded-md p-5">
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-ink">Document</span>
              <select
                className="field rounded-md px-4 py-3"
                value={documentId?.toString() ?? ""}
                onChange={(event) => {
                  const nextDocumentId = event.target.value ? BigInt(event.target.value) : undefined;
                  setDocumentId(nextDocumentId);
                }}
              >
                <option value="">Select document</option>
                {documents
                  .filter((doc) => !doc.archived)
                  .map((doc) => (
                    <option value={doc.id.toString()} key={doc.id.toString()}>
                      {doc.title}
                    </option>
                  ))}
              </select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-ink">Recipient address</span>
                <input className="field rounded-md px-4 py-3" value={grantee} onChange={(event) => setGrantee(event.target.value)} />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-ink">Expiry hours</span>
                <input
                  className="field rounded-md px-4 py-3"
                  type="number"
                  min={1}
                  max={720}
                  value={hours}
                  onChange={(event) => setHours(Number(event.target.value))}
                />
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-ink">Recipient encryption public key</span>
              <textarea
                className="field min-h-24 rounded-md px-4 py-3"
                value={recipientPublicKey}
                onChange={(event) => setRecipientPublicKey(event.target.value)}
                placeholder="Recipient can copy this from Requests page"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-ink">Scope</span>
                <select className="field rounded-md px-4 py-3" value={scope} onChange={(event) => setScope(Number(event.target.value))}>
                  {scopeLabels.map((label, index) => (
                    <option value={index} key={label}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-3 self-end rounded-md border border-sky-100 bg-white px-4 py-3 text-sm font-medium text-ink">
                <input type="checkbox" checked={canDownload} onChange={(event) => setCanDownload(event.target.checked)} />
                Download
              </label>
            </div>

            <ActionButton
              icon={Send}
              loading={isPending || isConfirming}
              disabled={
                !isConnected ||
                !isContractConfigured ||
                !selectedDoc ||
                !granteeAddressValid ||
                (grantsPayload && !recipientPublicKey.trim()) ||
                !fullDocument.data
              }
              onClick={grant}
              className="w-full py-3"
            >
              Grant temporary access
            </ActionButton>
            {status ? <p className="rounded-md bg-sky-50 p-3 text-sm text-slate-700">{status}</p> : null}
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-ink">Active permission ledger</h2>
        <div className="mt-4 surface rounded-md p-3">
          {!documentId ? (
            <EmptyState icon={Share2} title="Select a document">
              Permissions are shown per document so revocation stays precise.
            </EmptyState>
          ) : permissions.permissions.length === 0 ? (
            <EmptyState icon={KeyRound} title="No permissions yet">
              Create a direct grant or approve a verifier request to populate this ledger.
            </EmptyState>
          ) : (
            <div className="divide-y divide-sky-100">
              {permissions.permissions.map((permission) => (
                <div key={permission.id.toString()} className="grid gap-3 px-4 py-4 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-ink">{shortAddress(permission.grantee)}</p>
                      <span className="rounded-md bg-mist px-2 py-1 text-xs font-medium text-lagoon">
                        {scopeLabels[permission.scope]}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs text-slate-600">
                        <Clock className="h-3 w-3" />
                        {formatDate(permission.expiresAt)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {permission.revoked ? "Revoked" : "Usable until expiry"} · download{" "}
                      {scopeAllowsPayload(permission.scope, permission.canDownload) ? "allowed" : "blocked"}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {!permission.revoked ? (
                        <>
                        <Link
                          href={`/share/${permission.id.toString()}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-lagoon hover:text-ink"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Permission link
                        </Link>
                        <button
                          className="inline-flex items-center gap-1 text-sm font-semibold text-lagoon hover:text-ink"
                          onClick={() => copyPermissionLink(permission.id)}
                        >
                          <Copy className="h-4 w-4" />
                          Copy link
                        </button>
                        </>
                      ) : scopeAllowsPayload(permission.scope, permission.canDownload) ? (
                        <Link href="/vault" className="inline-flex items-center gap-1 text-sm font-semibold text-lagoon hover:text-ink">
                          <RotateCcwKey className="h-4 w-4" />
                          Rotate key in Vault
                        </Link>
                      ) : null}
                    </div>
                  </div>
                  <ActionButton
                    icon={Ban}
                    variant="danger"
                    loading={isPending || isConfirming}
                    disabled={permission.revoked}
                    onClick={() => revoke(permission.id)}
                  >
                    Revoke
                  </ActionButton>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
