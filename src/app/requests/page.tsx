"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Compass, Copy, ExternalLink, GitPullRequest, KeyRound, Send, X } from "lucide-react";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { ActionButton } from "@/components/ActionButton";
import { ContractBanner } from "@/components/ContractBanner";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeader } from "@/components/SectionHeader";
import {
  isContractConfigured,
  requestStatusLabels,
  scopeAllowsPayload,
  scopeLabels,
  shieldDocsAbi,
  shieldDocsAddress,
  shieldDocsChainId
} from "@/lib/contract";
import { decryptKeyEnvelope, encryptKeyEnvelope, requestWalletEncryptionPublicKey } from "@/lib/crypto";
import { errorMessage } from "@/lib/errors";
import { formatDate, shortAddress } from "@/lib/format";
import { waitForTransaction } from "@/lib/transactions";
import {
  AccessRequestRecord,
  useDiscoverableDocuments,
  useFullDocument,
  useOwnerRequests,
  useRequesterRequests
} from "@/hooks/useShieldDocs";

export default function RequestsPage() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient({ chainId: shieldDocsChainId });
  const incoming = useOwnerRequests();
  const outgoing = useRequesterRequests();
  const discoverable = useDiscoverableDocuments();
  const [documentId, setDocumentId] = useState("");
  const [scope, setScope] = useState(2);
  const [reason, setReason] = useState("Need proof of age for onboarding");
  const [publicKey, setPublicKey] = useState("");
  const [approvalId, setApprovalId] = useState<bigint>();
  const [approvalCanDownload, setApprovalCanDownload] = useState(false);
  const [approvalHours, setApprovalHours] = useState(24);
  const [status, setStatus] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const activeRequest = useMemo(
    () => incoming.requests.find((request) => request.id === approvalId),
    [incoming.requests, approvalId]
  );
  const approvalDocument = useFullDocument(activeRequest?.documentId);
  const { writeContractAsync, isPending } = useWriteContract();
  const requestedDocumentId = useMemo(() => parsePositiveBigInt(documentId), [documentId]);
  const documentIdInvalid = Boolean(documentId.trim() && !requestedDocumentId);

  async function loadPublicKey() {
    if (!address) return;
    try {
      setStatus("Requesting your wallet encryption public key...");
      setPublicKey(await requestWalletEncryptionPublicKey(address));
      setStatus("Public key ready for access requests.");
    } catch (error) {
      setStatus(`Could not load wallet encryption key: ${errorMessage(error)}`);
    }
  }

  async function copyPublicKey() {
    if (!publicKey) return;
    await navigator.clipboard.writeText(publicKey);
    setStatus("Requester encryption public key copied.");
  }

  async function submitRequest() {
    if (!shieldDocsAddress || !requestedDocumentId || !publicKey.trim()) return;
    try {
      setStatus("Writing access request on chain...");
      const txHash = await writeContractAsync({
        address: shieldDocsAddress,
        abi: shieldDocsAbi,
        chainId: shieldDocsChainId,
        functionName: "requestAccess",
        args: [requestedDocumentId, scope, reason.trim(), publicKey.trim()]
      });
      setIsConfirming(true);
      setStatus("Request submitted. Waiting for confirmation...");
      await waitForTransaction(publicClient, txHash);
      await outgoing.refetch();
      setStatus("Access request confirmed.");
    } catch (error) {
      setStatus(`Request failed: ${errorMessage(error)}`);
    } finally {
      setIsConfirming(false);
    }
  }

  async function approve(request: AccessRequestRecord) {
    if (!address || !shieldDocsAddress || !approvalDocument.data) return;
    try {
      const canOpenPayload = scopeAllowsPayload(request.scope, approvalCanDownload);
      setStatus(
        canOpenPayload
          ? "Unsealing document key and sealing it to requester..."
          : "Approving scoped verifier access without disclosing the document key..."
      );
      const rawKey = canOpenPayload ? await decryptKeyEnvelope(approvalDocument.data.ownerKeyEnvelope, address) : "";
      const envelope = canOpenPayload ? encryptKeyEnvelope(request.requesterPublicKey, rawKey) : "";
      const expiresAt = BigInt(Math.floor(Date.now() / 1000) + Math.max(1, approvalHours) * 60 * 60);

      setStatus("Approving request on chain...");
      const txHash = await writeContractAsync({
        address: shieldDocsAddress,
        abi: shieldDocsAbi,
        chainId: shieldDocsChainId,
        functionName: "approveRequest",
        args: [request.id, expiresAt, canOpenPayload, envelope]
      });
      setIsConfirming(true);
      setStatus("Approval submitted. Waiting for confirmation...");
      await waitForTransaction(publicClient, txHash);
      await incoming.refetch();
      setStatus("Request approval confirmed.");
    } catch (error) {
      setStatus(`Approval failed: ${errorMessage(error)}`);
    } finally {
      setIsConfirming(false);
    }
  }

  async function deny(request: AccessRequestRecord) {
    if (!shieldDocsAddress) return;
    try {
      setStatus("Denying request on chain...");
      const txHash = await writeContractAsync({
        address: shieldDocsAddress,
        abi: shieldDocsAbi,
        chainId: shieldDocsChainId,
        functionName: "denyRequest",
        args: [request.id, "Denied by owner"]
      });
      setIsConfirming(true);
      setStatus("Deny transaction submitted. Waiting for confirmation...");
      await waitForTransaction(publicClient, txHash);
      await incoming.refetch();
      setStatus("Request denied.");
    } catch (error) {
      setStatus(`Deny failed: ${errorMessage(error)}`);
    } finally {
      setIsConfirming(false);
    }
  }

  async function cancel(request: AccessRequestRecord) {
    if (!shieldDocsAddress) return;
    try {
      setStatus("Cancelling request on chain...");
      const txHash = await writeContractAsync({
        address: shieldDocsAddress,
        abi: shieldDocsAbi,
        chainId: shieldDocsChainId,
        functionName: "cancelRequest",
        args: [request.id]
      });
      setIsConfirming(true);
      setStatus("Cancel transaction submitted. Waiting for confirmation...");
      await waitForTransaction(publicClient, txHash);
      await outgoing.refetch();
      setStatus("Request cancelled.");
    } catch (error) {
      setStatus(`Cancel failed: ${errorMessage(error)}`);
    } finally {
      setIsConfirming(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <ContractBanner />
          <div className="mt-8">
            <SectionHeader eyebrow="Verifier flow" title="Requests and approvals">
              Verifiers request scoped access with their wallet encryption key; owners approve either verifier-only access
              or a wallet-sealed document key for file access.
            </SectionHeader>
          </div>
        </div>

        <div className="surface rounded-md p-5">
          <h2 className="text-xl font-semibold text-ink">Request access</h2>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-ink">Document ID</span>
              <input className="field rounded-md px-4 py-3" value={documentId} onChange={(event) => setDocumentId(event.target.value)} />
              {documentIdInvalid ? <span className="text-xs font-medium text-rose-600">Enter a positive document ID.</span> : null}
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
                <div className="flex gap-2">
                  {publicKey ? (
                    <ActionButton icon={Copy} variant="secondary" onClick={copyPublicKey}>
                      Copy
                    </ActionButton>
                  ) : null}
                  <ActionButton icon={KeyRound} variant="secondary" onClick={loadPublicKey} disabled={!address}>
                    Load my key
                  </ActionButton>
                </div>
              </div>
              {publicKey ? <p className="mt-3 break-all rounded-md bg-sky-50 p-3 font-mono text-xs text-slate-600">{publicKey}</p> : null}
            </div>
            <ActionButton
              icon={Send}
              loading={isPending || isConfirming}
              disabled={!isConnected || !isContractConfigured || !requestedDocumentId || !reason.trim() || !publicKey.trim()}
              onClick={submitRequest}
            >
              Submit request
            </ActionButton>
          </div>
        </div>
      </div>

      <section className="mt-8 surface rounded-md p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-ink">Discover requestable documents</h2>
          <ActionButton icon={Compass} variant="secondary" onClick={() => discoverable.refetch()} loading={discoverable.isLoading}>
            Refresh
          </ActionButton>
        </div>
        <div className="mt-4">
          {discoverable.documents.length === 0 ? (
            <EmptyState icon={Compass} title="No public request cards">
              Upload events from the connected contract will appear here so verifiers do not need to guess document IDs.
            </EmptyState>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {discoverable.documents.map((item) => (
                <div key={item.documentId.toString()} className="rounded-md border border-sky-100 bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        #{item.documentId.toString()} · {item.category} · owner {shortAddress(item.owner)}
                      </p>
                    </div>
                    <ActionButton
                      icon={Send}
                      variant="secondary"
                      onClick={() => {
                        setDocumentId(item.documentId.toString());
                        setReason(item.requestNote);
                      }}
                    >
                      Use ID
                    </ActionButton>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.requestNote}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

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
                          <ActionButton
                            icon={Check}
                            variant="secondary"
                            onClick={() => {
                              setApprovalId(request.id);
                              setApprovalCanDownload(request.scope === 1);
                            }}
                          >
                            Prepare
                          </ActionButton>
                          <ActionButton icon={X} variant="danger" loading={isPending || isConfirming} onClick={() => deny(request)}>
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
                  <RequestRow
                    key={request.id.toString()}
                    request={request}
                    action={
                      request.status === 0 ? (
                        <ActionButton
                          icon={X}
                          variant="danger"
                          loading={isPending || isConfirming}
                          onClick={() => cancel(request)}
                        >
                          Cancel
                        </ActionButton>
                      ) : null
                    }
                  />
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
                Choose whether this approval should include encrypted file access. Verifier-only approvals stay on chain
                without disclosing the document key.
              </p>
              <label className="mt-4 inline-flex items-center gap-3 rounded-md border border-sky-100 bg-white px-4 py-3 text-sm font-medium text-ink">
                <input
                  type="checkbox"
                  checked={scopeAllowsPayload(activeRequest.scope, approvalCanDownload)}
                  disabled={activeRequest.scope === 1}
                  onChange={(event) => setApprovalCanDownload(event.target.checked)}
                />
                Include file access for {shortAddress(activeRequest.requester)}
              </label>
            </div>
            <ActionButton
              icon={Check}
              loading={isPending || isConfirming || approvalDocument.isLoading}
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
        {request.permissionId > 0n ? (
          <Link
            href={`/share/${request.permissionId.toString()}`}
            className="mt-3 inline-flex items-center gap-1 rounded-md text-sm font-semibold text-lagoon hover:text-ink"
          >
            <ExternalLink className="h-4 w-4" />
            Open permission #{request.permissionId.toString()}
          </Link>
        ) : null}
      </div>
      {action}
    </div>
  );
}

function parsePositiveBigInt(value: string) {
  const trimmed = value.trim();
  if (!/^[1-9]\d*$/.test(trimmed)) return undefined;
  return BigInt(trimmed);
}
