"use client";

import { useMemo, useState } from "react";
import { Ban, Clock, KeyRound, Send, Share2 } from "lucide-react";
import { useAccount, useWriteContract } from "wagmi";
import { ActionButton } from "@/components/ActionButton";
import { ContractBanner } from "@/components/ContractBanner";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeader } from "@/components/SectionHeader";
import { isContractConfigured, scopeLabels, shieldDocsAbi, shieldDocsAddress } from "@/lib/contract";
import { asAddress, formatDate, shortAddress } from "@/lib/format";
import { decryptKeyEnvelope, encryptKeyEnvelope } from "@/lib/crypto";
import { useDocumentPermissions, useFullDocument, useOwnedDocuments } from "@/hooks/useShieldDocs";

export default function SharingPage() {
  const { address, isConnected } = useAccount();
  const { documents } = useOwnedDocuments();
  const [documentId, setDocumentId] = useState<bigint>();
  const [grantee, setGrantee] = useState("");
  const [recipientPublicKey, setRecipientPublicKey] = useState("");
  const [scope, setScope] = useState(0);
  const [hours, setHours] = useState(24);
  const [canDownload, setCanDownload] = useState(false);
  const [status, setStatus] = useState("");
  const fullDocument = useFullDocument(documentId);
  const permissions = useDocumentPermissions(documentId);
  const { writeContractAsync, isPending } = useWriteContract();

  const selectedDoc = useMemo(() => documents.find((doc) => doc.id === documentId), [documents, documentId]);

  async function grant() {
    if (!address || !documentId || !fullDocument.data || !shieldDocsAddress) return;
    setStatus("Unsealing your document key locally...");
    const rawKey = await decryptKeyEnvelope(fullDocument.data.ownerKeyEnvelope, address);
    const envelope = encryptKeyEnvelope(recipientPublicKey.trim(), rawKey);
    const expiresAt = BigInt(Math.floor(Date.now() / 1000) + hours * 60 * 60);

    setStatus("Writing permission and sealed key envelope on chain...");
    await writeContractAsync({
      address: shieldDocsAddress,
      abi: shieldDocsAbi,
      functionName: "grantAccess",
      args: [documentId, asAddress(grantee), scope, canDownload, expiresAt, envelope]
    });
    await permissions.refetch();
    setStatus("Access grant submitted.");
  }

  async function revoke(permissionId: bigint) {
    if (!shieldDocsAddress) return;
    setStatus("Revoking permission on chain...");
    await writeContractAsync({
      address: shieldDocsAddress,
      abi: shieldDocsAbi,
      functionName: "revokeAccess",
      args: [permissionId]
    });
    await permissions.refetch();
    setStatus("Revoke transaction submitted.");
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
                onChange={(event) => setDocumentId(event.target.value ? BigInt(event.target.value) : undefined)}
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
              loading={isPending}
              disabled={
                !isConnected ||
                !isContractConfigured ||
                !selectedDoc ||
                !grantee.trim() ||
                !recipientPublicKey.trim() ||
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
                      {permission.canDownload ? "allowed" : "blocked"}
                    </p>
                  </div>
                  <ActionButton
                    icon={Ban}
                    variant="danger"
                    loading={isPending}
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
