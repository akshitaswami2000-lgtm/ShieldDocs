"use client";

import { useState } from "react";
import Link from "next/link";
import type { Hex } from "viem";
import { Archive, Download, FileLock2, FileUp, FolderKey, RefreshCw } from "lucide-react";
import { useAccount, useWriteContract } from "wagmi";
import { ActionButton } from "@/components/ActionButton";
import { ContractBanner } from "@/components/ContractBanner";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeader } from "@/components/SectionHeader";
import { isContractConfigured, shieldDocsAbi, shieldDocsAddress, storageModeLabels } from "@/lib/contract";
import { decryptPayloadBytesFromEnvelope, downloadBytes, hexToBytes, verifyEncryptedPayloadHash } from "@/lib/crypto";
import { formatBytes, formatDate } from "@/lib/format";
import { fetchIpfsBytes } from "@/lib/ipfs";
import { useFullDocument, useOwnedDocuments } from "@/hooks/useShieldDocs";

export default function VaultPage() {
  const { address, isConnected } = useAccount();
  const { documents, isLoading, refetch } = useOwnedDocuments();
  const [selectedId, setSelectedId] = useState<bigint>();
  const [status, setStatus] = useState("");
  const fullDocument = useFullDocument(selectedId);
  const { writeContractAsync, isPending } = useWriteContract();

  async function decryptSelected() {
    if (!address || !fullDocument.data) return;
    setStatus("Asking wallet to unseal the document key...");
    const encryptedBytes =
      fullDocument.data.storageMode === 1
        ? await fetchIpfsBytes(fullDocument.data.storageUri)
        : hexToBytes(fullDocument.data.encryptedPayload as Hex);
    verifyEncryptedPayloadHash(encryptedBytes, fullDocument.data.payloadHash);
    const bytes = await decryptPayloadBytesFromEnvelope(
      encryptedBytes,
      fullDocument.data.iv as Hex,
      fullDocument.data.ownerKeyEnvelope,
      address
    );
    downloadBytes(bytes, fullDocument.data.fileName, fullDocument.data.mimeType);
    setStatus("Downloaded decrypted file locally.");
  }

  async function archiveSelected() {
    if (!selectedId || !shieldDocsAddress) return;
    setStatus("Archiving document on chain...");
    await writeContractAsync({
      address: shieldDocsAddress,
      abi: shieldDocsAbi,
      functionName: "archiveDocument",
      args: [selectedId]
    });
    await refetch();
    setStatus("Archive transaction submitted.");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <ContractBanner />
          <div className="mt-8">
            <SectionHeader eyebrow="Personal vault" title="Encrypted documents">
              Manage your on-chain ciphertexts, decrypt them through your wallet, and open sharing controls without
              exposing plaintext to the app contract.
            </SectionHeader>
          </div>
        </div>
        <div className="flex gap-3">
          <ActionButton icon={RefreshCw} variant="secondary" onClick={() => refetch()} loading={isLoading}>
            Refresh
          </ActionButton>
          <Link href="/vault/upload">
            <ActionButton icon={FileUp}>Upload</ActionButton>
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="surface rounded-md p-3">
          {!isConnected ? (
            <EmptyState icon={FolderKey} title="Connect a wallet">
              Your vault is keyed by wallet ownership, so the document list appears after connection.
            </EmptyState>
          ) : documents.length === 0 ? (
            <EmptyState icon={FileLock2} title="No documents yet">
              Upload a small encrypted file and it will appear here with ownership and integrity metadata from chain.
            </EmptyState>
          ) : (
            <div className="divide-y divide-sky-100">
              {documents.map((doc) => (
                <button
                  key={doc.id.toString()}
                  className="grid w-full gap-3 rounded-md px-4 py-4 text-left transition hover:bg-sky-50 sm:grid-cols-[1fr_auto]"
                  onClick={() => setSelectedId(doc.id)}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold text-ink">{doc.title}</h2>
                      <span className="rounded-md bg-mist px-2 py-1 text-xs font-medium text-lagoon">{doc.category}</span>
                      {doc.archived ? (
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">Archived</span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {doc.fileName} · {formatBytes(doc.size)} · sealed {formatDate(doc.createdAt)}
                    </p>
                    <p className="mt-2 break-all font-mono text-xs text-slate-500">{doc.payloadHash}</p>
                  </div>
                  <span className="self-center text-sm font-semibold text-lagoon">Open</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="surface rounded-md p-5">
          <h2 className="text-lg font-semibold text-ink">Selected document</h2>
          {selectedId && fullDocument.data ? (
            <div className="mt-4 space-y-4">
              <div className="rounded-md bg-mist p-4">
                <p className="text-xl font-semibold text-ink">{fullDocument.data.title}</p>
                <p className="mt-1 text-sm text-slate-600">{fullDocument.data.mimeType}</p>
              </div>
              <dl className="grid gap-3 text-sm">
                <Info label="File" value={fullDocument.data.fileName} />
                <Info label="Storage" value={storageModeLabels[fullDocument.data.storageMode] ?? "Unknown"} />
                <Info label="Size" value={formatBytes(fullDocument.data.size)} />
                <Info label="Updated" value={formatDate(fullDocument.data.updatedAt)} />
              </dl>
              <div className="grid gap-2">
                <ActionButton icon={Download} onClick={decryptSelected} disabled={!address || fullDocument.data.archived}>
                  Decrypt download
                </ActionButton>
                <ActionButton
                  icon={Archive}
                  variant="danger"
                  onClick={archiveSelected}
                  loading={isPending}
                  disabled={!isContractConfigured || fullDocument.data.archived}
                >
                  Archive on chain
                </ActionButton>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm leading-6 text-slate-600">Choose a document to decrypt, archive, or inspect.</p>
          )}
          {status ? <p className="mt-4 rounded-md bg-sky-50 p-3 text-sm text-slate-700">{status}</p> : null}
        </aside>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-sky-100 pb-2">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
