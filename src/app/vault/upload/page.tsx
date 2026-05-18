"use client";

import { useMemo, useState } from "react";
import type { Hex } from "viem";
import { FileUp, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { ActionButton } from "@/components/ActionButton";
import { ContractBanner } from "@/components/ContractBanner";
import { SectionHeader } from "@/components/SectionHeader";
import {
  isContractConfigured,
  maxPayloadBytes,
  pinataDirectUploadLimitBytes,
  shieldDocsAbi,
  shieldDocsAddress
} from "@/lib/contract";
import { encryptFileForChain, requestWalletEncryptionPublicKey } from "@/lib/crypto";
import { formatBytes } from "@/lib/format";
import { uploadEncryptedBytesToPinata } from "@/lib/ipfs";

const categories = ["Identity", "Legal", "Financial", "Medical", "Education", "Crypto", "Personal"];

export default function UploadPage() {
  const { address, isConnected } = useAccount();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [file, setFile] = useState<File | null>(null);
  const [publicKey, setPublicKey] = useState("");
  const [status, setStatus] = useState("");
  const [hash, setHash] = useState<Hex>();
  const { writeContractAsync, isPending } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  const encryptedLimit = maxPayloadBytes - 64;
  const fileTooLarge = useMemo(() => Boolean(file && file.size > encryptedLimit), [file, encryptedLimit]);
  const ipfsLimit = pinataDirectUploadLimitBytes - 64;
  const fileAboveIpfsLimit = useMemo(() => Boolean(file && file.size > ipfsLimit), [file, ipfsLimit]);

  async function loadPublicKey() {
    if (!address) return;
    setStatus("Requesting wallet encryption public key...");
    const key = await requestWalletEncryptionPublicKey(address);
    setPublicKey(key);
    setStatus("Encryption public key ready.");
  }

  async function upload() {
    if (!file || !address || !shieldDocsAddress) return;
    if (fileAboveIpfsLimit) {
      setStatus(`File is too large for direct Pinata upload. Keep it below ${formatBytes(ipfsLimit)}.`);
      return;
    }

    setStatus("Encrypting locally...");
    const key = publicKey || (await requestWalletEncryptionPublicKey(address));
    setPublicKey(key);
    const encrypted = await encryptFileForChain(file, key);
    const shouldUseIpfs = encrypted.size > maxPayloadBytes;

    let storageMode = 0;
    let encryptedPayload: Hex = encrypted.encryptedPayload;
    let storageUri = "";

    if (shouldUseIpfs) {
      setStatus("Encrypted payload is large. Uploading ciphertext to Pinata IPFS...");
      const ipfs = await uploadEncryptedBytesToPinata({
        encryptedBytes: encrypted.encryptedBytes,
        fileName: file.name,
        originalMimeType: file.type || "application/octet-stream",
        payloadHash: encrypted.payloadHash
      });
      storageMode = 1;
      encryptedPayload = "0x";
      storageUri = ipfs.storageUri;
    }

    setStatus(shouldUseIpfs ? "Writing IPFS reference and hash to chain..." : "Sending encrypted payload to chain...");
    const txHash = await writeContractAsync({
      address: shieldDocsAddress,
      abi: shieldDocsAbi,
      functionName: "createDocument",
      args: [
        {
          title: title.trim(),
          category,
          fileName: file.name,
          mimeType: file.type || "application/octet-stream",
          storageMode,
          encryptedPayload,
          storageUri,
          iv: encrypted.iv,
          payloadHash: encrypted.payloadHash,
          ownerKeyEnvelope: encrypted.keyEnvelope,
          size: BigInt(encrypted.size)
        }
      ]
    });

    setHash(txHash);
    setStatus("Transaction submitted. Waiting for confirmation...");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <ContractBanner />
          <div className="mt-8">
            <SectionHeader eyebrow="Local encryption" title="Upload to the vault">
              The browser encrypts your file first, seals the AES key to your wallet encryption key, then stores small
              ciphertexts on chain or larger ciphertexts on Pinata IPFS.
            </SectionHeader>
          </div>
          <div className="mt-8 space-y-3 text-sm text-slate-600">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-lagoon" />
              <span>Small encrypted payloads stay on chain; larger encrypted payloads are pinned to IPFS.</span>
            </div>
            <div className="flex gap-3">
              <KeyRound className="mt-0.5 h-5 w-5 text-lagoon" />
              <span>The document key is wallet-sealed, so the contract never sees plaintext.</span>
            </div>
          </div>
        </div>

        <div className="surface rounded-md p-5">
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-ink">Document title</span>
              <input
                className="field rounded-md px-4 py-3"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Passport, employment contract, medical report"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-ink">Category</span>
              <select className="field rounded-md px-4 py-3" value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-ink">Encrypted file source</span>
              <input
                className="field rounded-md px-4 py-3"
                type="file"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              />
              <span className="text-xs text-slate-500">
                Files above about {formatBytes(encryptedLimit)} use Pinata IPFS. Direct upload limit:{" "}
                {formatBytes(ipfsLimit)}.
              </span>
            </label>

            {file ? (
              <div className="rounded-md bg-mist p-4 text-sm text-slate-700">
                <p className="font-semibold text-ink">{file.name}</p>
                <p className="mt-1">
                  {formatBytes(file.size)} · {file.type || "application/octet-stream"}
                </p>
                {fileTooLarge ? (
                  <p className="mt-2 font-medium text-lagoon">This will use Pinata IPFS, with the CID stored on chain.</p>
                ) : (
                  <p className="mt-2 font-medium text-lagoon">This will be stored directly on chain as ciphertext.</p>
                )}
                {fileAboveIpfsLimit ? (
                  <p className="mt-2 font-medium text-rose-600">This file needs resumable upload support from Wave 5.</p>
                ) : null}
              </div>
            ) : null}

            <div className="grid gap-3 rounded-md bg-white/72 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">Wallet encryption key</p>
                  <p className="text-sm text-slate-600">Used for document key recovery and future sharing.</p>
                </div>
                <ActionButton icon={KeyRound} variant="secondary" onClick={loadPublicKey} disabled={!isConnected}>
                  Load key
                </ActionButton>
              </div>
              {publicKey ? <p className="break-all rounded-md bg-sky-50 p-3 font-mono text-xs text-slate-600">{publicKey}</p> : null}
            </div>

            <ActionButton
              icon={FileUp}
              loading={isPending || receipt.isLoading}
              disabled={!isConnected || !isContractConfigured || !file || !title.trim() || fileAboveIpfsLimit}
              onClick={upload}
              className="w-full py-3"
            >
              Encrypt and seal document
            </ActionButton>

            {status ? <p className="rounded-md bg-sky-50 p-3 text-sm text-slate-700">{status}</p> : null}
            {receipt.isSuccess ? (
              <p className="rounded-md bg-emerald-50 p-3 text-sm font-medium text-emerald-700">
                Confirmed. Your encrypted document is now in the vault.
              </p>
            ) : null}
            {receipt.isError ? (
              <p className="rounded-md bg-rose-50 p-3 text-sm font-medium text-rose-700">
                Transaction failed: {receipt.error.message}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
