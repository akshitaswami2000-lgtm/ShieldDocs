"use client";

import { useMemo, useState } from "react";
import { Check, GitPullRequest, KeyRound, Send, X } from "lucide-react";
import { useAccount, useWriteContract } from "wagmi";
import { ActionButton } from "@/components/ActionButton";
import { ContractBanner } from "@/components/ContractBanner";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeader } from "@/components/SectionHeader";
import {
  isContractConfigured,
  requestStatusLabels,
  scopeLabels,
  shieldDocsAbi,
  shieldDocsAddress
} from "@/lib/contract";
import { decryptKeyEnvelope, encryptKeyEnvelope, requestWalletEncryptionPublicKey } from "@/lib/crypto";
import { formatDate, shortAddress } from "@/lib/format";
import { AccessRequestRecord, useFullDocument, useOwnerRequests, useRequesterRequests } from "@/hooks/useShieldDocs";

export default function RequestsPage() {
  const { address, isConnected } = useAccount();
  const incoming = useOwnerRequests();
  const outgoing = useRequesterRequests();
  const [documentId, setDocumentId] = useState("");
  const [scope, setScope] = useState(2);
  const [reason, setReason] = useState("Need proof of age for onboarding");
  const [publicKey, setPublicKey] = useState("");
  const [approvalId, setApprovalId] = useState<bigint>();
  const [approvalHours, setApprovalHours] = useState(24);
  const [status, setStatus] = useState("");
  const activeRequest = useMemo(
    () => incoming.requests.find((request) => request.id === approvalId),
    [incoming.requests, approvalId]
  );
  const approvalDocument = useFullDocument(activeRequest?.documentId);
  const { writeContractAsync, isPending } = useWriteContract();

  async function loadPublicKey() {
    if (!address) return;
    setStatus("Requesting your wallet encryption public key...");
    setPublicKey(await requestWalletEncryptionPublicKey(address));
    setStatus("Public key ready for access requests.");
  }

  async function submitRequest() {
    if (!shieldDocsAddress || !documentId || !publicKey.trim()) return;
    setStatus("Writing access request on chain...");
    await writeContractAsync({
      address: shieldDocsAddress,
      abi: shieldDocsAbi,
      functionName: "requestAccess",
      args: [BigInt(documentId), scope, reason.trim(), publicKey.trim()]
    });
    await outgoing.refetch();
    setStatus("Access request submitted.");
  }

  async function approve(request: AccessRequestRecord) {
    if (!address || !shieldDocsAddress || !approvalDocument.data) return;
    setStatus("Unsealing document key and sealing it to requester...");
    const rawKey = await decryptKeyEnvelope(approvalDocument.data.ownerKeyEnvelope, address);
    const envelope = encryptKeyEnvelope(request.requesterPublicKey, rawKey);
    const expiresAt = BigInt(Math.floor(Date.now() / 1000) + approvalHours * 60 * 60);

    setStatus("Approving request on chain...");
    await writeContractAsync({
      address: shieldDocsAddress,
      abi: shieldDocsAbi,
      functionName: "approveRequest",
      args: [request.id, expiresAt, request.scope === 1, envelope]
    });
    await incoming.refetch();
    setStatus("Request approval submitted.");
  }

  async function deny(request: AccessRequestRecord) {
    if (!shieldDocsAddress) return;
    setStatus("Denying request on chain...");
    await writeContractAsync({
      address: shieldDocsAddress,
      abi: shieldDocsAbi,
      functionName: "denyRequest",
      args: [request.id, "Denied by owner"]
    });
    await incoming.refetch();
    setStatus("Deny transaction submitted.");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <ContractBanner />
          <div className="mt-8">
            <SectionHeader eyebrow="Verifier flow" title="Requests and approvals">
              Verifiers request scoped access with their wallet encryption key; owners approve by sealing a document key
              envelope back to that requester.
            </SectionHeader>
          </div>
        </div>

        <div className="surface rounded-md p-5">
          <h2 className="text-xl font-semibold text-ink">Request access</h2>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-ink">Document ID</span>
              <input className="field rounded-md px-4 py-3" value={documentId} onChange={(event) => setDocumentId(event.target.value)} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-ink">Reason</span>
              <textarea className="field min-h-24 rounded-md px-4 py-3" value={reason} onChange={(event) => setReason(event.target.value)} />
            </label>
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
            <div className="rounded-md bg-white/72 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold text-ink">Requester encryption key</p>
                <ActionButton icon={KeyRound} variant="secondary" onClick={loadPublicKey} disabled={!address}>
                  Load my key
                </ActionButton>
              </div>
              {publicKey ? <p className="mt-3 break-all rounded-md bg-sky-50 p-3 font-mono text-xs text-slate-600">{publicKey}</p> : null}
            </div>
            <ActionButton
              icon={Send}
              loading={isPending}
              disabled={!isConnected || !isContractConfigured || !documentId || !reason.trim() || !publicKey.trim()}
              onClick={submitRequest}
            >
              Submit request
            </ActionButton>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="surface rounded-md p-4">
          <h2 className="text-xl font-semibold text-ink">Incoming</h2>
          <div className="mt-4">
            {incoming.requests.length === 0 ? (
              <EmptyState icon={GitPullRequest} title="No incoming requests">
                Requests for your documents will appear here with scope, reason, and requester key.
              </EmptyState>
            ) : (
              <div className="divide-y divide-sky-100">
                {incoming.requests.map((request) => (
                  <RequestRow
                    key={request.id.toString()}
                    request={request}
                    action={
                      request.status === 0 ? (
                        <div className="flex flex-wrap gap-2">
                          <ActionButton icon={Check} variant="secondary" onClick={() => setApprovalId(request.id)}>
                            Prepare
                          </ActionButton>
                          <ActionButton icon={X} variant="danger" loading={isPending} onClick={() => deny(request)}>
                            Deny
                          </ActionButton>
                        </div>
                      ) : null
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="surface rounded-md p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-ink">Outgoing</h2>
            <label className="inline-flex items-center gap-2 text-sm text-slate-600">
              Expiry
              <input
                className="field w-24 rounded-md px-3 py-2"
                type="number"
                min={1}
                value={approvalHours}
                onChange={(event) => setApprovalHours(Number(event.target.value))}
              />
              hours
            </label>
          </div>
          <div className="mt-4">
            {outgoing.requests.length === 0 ? (
              <EmptyState icon={Send} title="No outgoing requests">
                Ask for document access as a bank, employer, hospital, or other verifier.
              </EmptyState>
            ) : (
              <div className="divide-y divide-sky-100">
                {outgoing.requests.map((request) => (
                  <RequestRow key={request.id.toString()} request={request} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {activeRequest ? (
        <section className="mt-6 surface rounded-md p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-xl font-semibold text-ink">Approve request #{activeRequest.id.toString()}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                ShieldDocs will ask your wallet to decrypt your document key, then seal that key to{" "}
                {shortAddress(activeRequest.requester)} and write the approval on chain.
              </p>
            </div>
            <ActionButton
              icon={Check}
              loading={isPending || approvalDocument.isLoading}
              disabled={!approvalDocument.data}
              onClick={() => approve(activeRequest)}
            >
              Seal and approve
            </ActionButton>
          </div>
        </section>
      ) : null}

      {status ? <p className="mt-6 rounded-md bg-sky-50 p-3 text-sm text-slate-700">{status}</p> : null}
    </div>
  );
}

function RequestRow({ request, action }: { request: AccessRequestRecord; action?: React.ReactNode }) {
  return (
    <div className="grid gap-3 px-2 py-4 md:grid-cols-[1fr_auto]">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-ink">Document #{request.documentId.toString()}</p>
          <span className="rounded-md bg-mist px-2 py-1 text-xs font-medium text-lagoon">{scopeLabels[request.scope]}</span>
          <span className="rounded-md bg-white px-2 py-1 text-xs text-slate-600">{requestStatusLabels[request.status]}</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">{request.reason}</p>
        <p className="mt-2 text-xs text-slate-500">
          {shortAddress(request.requester)} · {formatDate(request.createdAt)}
        </p>
      </div>
      {action}
    </div>
  );
}
