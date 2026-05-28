"use client";

import { useState } from "react";
import type { Hex } from "viem";
import { Archive, Download, FileLock2, FileUp, FolderKey, KeyRound, RefreshCw, Search } from "lucide-react";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { ActionLink } from "@/components/ActionLink";
import { ActionButton } from "@/components/ActionButton";
import { ContractBanner } from "@/components/ContractBanner";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeader } from "@/components/SectionHeader";
import {
  isContractConfigured,
  maxPayloadBytes,
  privateDocumentChainMetadata,
  shieldDocsAbi,
  shieldDocsAddress,
  shieldDocsChainId,
  storageModeLabels
} from "@/lib/contract";
import {
  decryptPayloadBytesFromEnvelope,
  downloadBytes,
  encryptBytesForChain,
  hexToBytes,
  packDocumentBytes,
  requestWalletEncryptionPublicKey,
  unpackDocumentBytes,
  verifyEncryptedPayloadHash
} from "@/lib/crypto";
import { errorMessage } from "@/lib/errors";
import { formatBytes, formatDate } from "@/lib/format";
import { fetchIpfsBytes, uploadEncryptedBytesToPinata } from "@/lib/ipfs";
import { waitForTransaction } from "@/lib/transactions";
import { useFullDocument, useOwnedDocuments } from "@/hooks/useShieldDocs";

export default function VaultPage() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient({ chainId: shieldDocsChainId });
  const { documents, isLoading, refetch } = useOwnedDocuments();
  const [selectedId, setSelectedId] = useState<bigint>();
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [rotationProgress, setRotationProgress] = useState<number | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const fullDocument = useFullDocument(selectedId);
  const { writeContractAsync, isPending } = useWriteContract();
  const categories = ["All", ...Array.from(new Set(documents.map((doc) => doc.category)))];
  const visibleDocuments = documents.filter((doc) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery =
      !normalizedQuery ||
      doc.title.toLowerCase().includes(normalizedQuery) ||
      doc.fileName.toLowerCase().includes(normalizedQuery) ||
      doc.payloadHash.toLowerCase().includes(normalizedQuery);
    const matchesCategory = category === "All" || doc.category === category;
    return matchesQuery && matchesCategory;
  });

  async function decryptSelected() {
    if (!address || !fullDocument.data) return;
    try {
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
      const opened = unpackDocumentBytes(bytes, documentMetadataFallback(fullDocument.data));
      downloadBytes(opened.bytes, opened.metadata.fileName, opened.metadata.mimeType);
      setStatus("Downloaded decrypted file locally.");
    } catch (error) {
      setStatus(`Decrypt failed: ${errorMessage(error)}`);
    }
  }

  async function rotateSelectedKey() {
    if (!address || !fullDocument.data || !shieldDocsAddress) return;
    try {
      setRotationProgress(null);
      setStatus("Fetching current ciphertext for key rotation...");
      const encryptedBytes =
        fullDocument.data.storageMode === 1
          ? await fetchIpfsBytes(fullDocument.data.storageUri)
          : hexToBytes(fullDocument.data.encryptedPayload as Hex);
      verifyEncryptedPayloadHash(encryptedBytes, fullDocument.data.payloadHash);

      setStatus("Decrypting locally so a fresh AES key can be generated...");
      const plaintext = await decryptPayloadBytesFromEnvelope(
        encryptedBytes,
        fullDocument.data.iv as Hex,
        fullDocument.data.ownerKeyEnvelope,
        address
      );
      const opened = unpackDocumentBytes(plaintext, documentMetadataFallback(fullDocument.data));
      const payloadToRotate = opened.isPackaged ? plaintext : packDocumentBytes(opened.bytes, opened.metadata);
      const ownerPublicKey = await requestWalletEncryptionPublicKey(address);
      const rotated = await encryptBytesForChain(payloadToRotate, ownerPublicKey, { inlinePayloadLimit: maxPayloadBytes });
      const shouldUseIpfs = rotated.size > maxPayloadBytes;
      let storageMode = 0;
      let encryptedPayload: Hex = rotated.encryptedPayload;
      let storageUri = "";

      if (shouldUseIpfs) {
        setStatus("Uploading rotated ciphertext to Pinata IPFS...");
        const ipfs = await uploadEncryptedBytesToPinata({
          encryptedBytes: rotated.encryptedBytes,
          ownerAddress: address,
          payloadHash: rotated.payloadHash,
          onProgress: (progress) => setRotationProgress(progress.percentage)
        });
        storageMode = 1;
        encryptedPayload = "0x";
        storageUri = ipfs.storageUri;
      }

      setStatus(shouldUseIpfs ? "Writing rotated IPFS reference and hash on chain..." : "Writing rotated encrypted payload on chain...");
      const txHash = await writeContractAsync({
        address: shieldDocsAddress,
        abi: shieldDocsAbi,
        chainId: shieldDocsChainId,
        functionName: "updateDocumentPayload",
        args: [
          fullDocument.data.id,
          {
            title: privateDocumentChainMetadata.title,
            category: privateDocumentChainMetadata.category,
            fileName: privateDocumentChainMetadata.fileName,
            mimeType: privateDocumentChainMetadata.mimeType,
            storageMode,
            encryptedPayload,
            storageUri,
            iv: rotated.iv,
            payloadHash: rotated.payloadHash,
            ownerKeyEnvelope: rotated.keyEnvelope,
            size: BigInt(rotated.size)
          }
        ]
      });
      setIsConfirming(true);
      setStatus("Key rotation submitted. Waiting for confirmation...");
      await waitForTransaction(publicClient, txHash);
      await fullDocument.refetch();
      await refetch();
      setStatus("Key rotation confirmed. Chain metadata is private and old shared keys cannot open the rotated payload.");
    } catch (error) {
      setStatus(`Key rotation failed: ${errorMessage(error)}`);
    } finally {
      setIsConfirming(false);
    }
  }

  async function archiveSelected() {
    if (!selectedId || !shieldDocsAddress) return;
    try {
      setStatus("Archiving document on chain...");
      const txHash = await writeContractAsync({
        address: shieldDocsAddress,
        abi: shieldDocsAbi,
        chainId: shieldDocsChainId,
        functionName: "archiveDocument",
        args: [selectedId]
      });
      setIsConfirming(true);
      setStatus("Archive submitted. Waiting for confirmation...");
      await waitForTransaction(publicClient, txHash);
      await refetch();
      setStatus("Document archived.");
    } catch (error) {
      setStatus(`Archive failed: ${errorMessage(error)}`);
    } finally {
      setIsConfirming(false);
    }
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
          <ActionLink href="/vault/upload" icon={FileUp}>
            Upload
          </ActionLink>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="surface rounded-md p-3">
          {documents.length > 0 ? (
            <div className="grid gap-3 border-b border-sky-100 p-3 md:grid-cols-[1fr_180px]">
              <label className="relative">
                <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  className="field w-full rounded-md py-3 pl-10 pr-4"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search title, filename, or hash"
                />
              </label>
              <select className="field rounded-md px-4 py-3" value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          ) : null}
          {!isConnected ? (
            <EmptyState icon={FolderKey} title="Connect a wallet">
              Your vault is keyed by wallet ownership, so the document list appears after connection.
            </EmptyState>
          ) : documents.length === 0 ? (
            <EmptyState icon={FileLock2} title="No documents yet">
              Upload a small encrypted file and it will appear here with ownership and integrity metadata from chain.
            </EmptyState>
          ) : visibleDocuments.length === 0 ? (
            <EmptyState icon={Search} title="No matching documents">
              Adjust the search or category filter to inspect the rest of your vault.
            </EmptyState>
          ) : (
            <div className="divide-y divide-sky-100">
              {visibleDocuments.map((doc) => (
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
                  icon={KeyRound}
                  variant="secondary"
                  onClick={rotateSelectedKey}
                  loading={isPending || isConfirming}
                  disabled={!address || !isContractConfigured || fullDocument.data.archived}
                >
                  Rotate document key
                </ActionButton>
                <ActionButton
                  icon={Archive}
                  variant="danger"
                  onClick={archiveSelected}
                  loading={isPending || isConfirming}
                  disabled={!isContractConfigured || fullDocument.data.archived}
                >
                  Archive on chain
                </ActionButton>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm leading-6 text-slate-600">Choose a document to decrypt, archive, or inspect.</p>
          )}
          {rotationProgress !== null ? (
            <div className="mt-4 rounded-md bg-white p-3">
              <div className="h-2 overflow-hidden rounded-md bg-sky-100">
                <div className="h-full bg-lagoon" style={{ width: `${Math.min(100, rotationProgress)}%` }} />
              </div>
              <p className="mt-2 text-xs font-medium text-slate-600">{Math.round(rotationProgress)}% uploaded</p>
            </div>
          ) : null}
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

function documentMetadataFallback(record: {
  title: string;
  category: string;
  fileName: string;
  mimeType: string;
}) {
  return {
    title: record.title,
    category: record.category,
    fileName: record.fileName,
    mimeType: record.mimeType
  };
}
