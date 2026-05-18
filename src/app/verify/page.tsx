"use client";

import { useState } from "react";
import type { Hex } from "viem";
import { FileCheck2, ShieldCheck } from "lucide-react";
import { useAccount, usePublicClient, useReadContract, useWalletClient, useWriteContract } from "wagmi";
import { ActionButton } from "@/components/ActionButton";
import { ContractBanner } from "@/components/ContractBanner";
import { SectionHeader } from "@/components/SectionHeader";
import { decryptBooleanProof, encryptAgeForContract } from "@/lib/cofhe";
import { isContractConfigured, shieldDocsAbi, shieldDocsAddress } from "@/lib/contract";
import { asAddress, formatDate, shortAddress } from "@/lib/format";
import { useOwnedDocuments } from "@/hooks/useShieldDocs";

export default function VerifyPage() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const walletClient = useWalletClient();
  const { documents } = useOwnedDocuments();
  const [documentId, setDocumentId] = useState<bigint>();
  const [age, setAge] = useState(22);
  const [threshold, setThreshold] = useState(18);
  const [verifier, setVerifier] = useState("");
  const [status, setStatus] = useState("");
  const [proofResult, setProofResult] = useState<boolean | null>(null);
  const { writeContractAsync, isPending } = useWriteContract();

  const proof = useReadContract({
    address: shieldDocsAddress,
    abi: shieldDocsAbi,
    functionName: "getAgeProof",
    args: documentId ? [documentId] : undefined,
    query: { enabled: isContractConfigured && Boolean(documentId) }
  });

  async function createProof() {
    if (!documentId || !publicClient || !walletClient.data || !shieldDocsAddress) return;
    setStatus("Encrypting age with CoFHE SDK...");
    const encryptedAge = await encryptAgeForContract(age, publicClient, walletClient.data);
    setStatus("Submitting encrypted comparison to ShieldDocs...");
    await writeContractAsync({
      address: shieldDocsAddress,
      abi: shieldDocsAbi,
      functionName: "createAgeProof",
      args: [
        documentId,
        encryptedAge as { ctHash: bigint; securityZone: number; utype: number; signature: Hex },
        threshold,
        asAddress(verifier)
      ]
    });
    await proof.refetch();
    setStatus("Encrypted proof transaction submitted.");
  }

  async function decryptProof() {
    if (!address || !publicClient || !walletClient.data || !proof.data) return;
    const handle = proof.data[0] as Hex;
    setStatus("Creating CoFHE permit and decrypting proof for view...");
    const result = await decryptBooleanProof(handle, address, publicClient, walletClient.data);
    setProofResult(result);

    if (shieldDocsAddress && documentId) {
      await writeContractAsync({
        address: shieldDocsAddress,
        abi: shieldDocsAbi,
        functionName: "recordProofView",
        args: [documentId]
      });
    }
    setStatus("Proof decrypted for this wallet.");
  }

  const proofExists = Boolean(proof.data?.[3]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <div>
          <ContractBanner />
          <div className="mt-8">
            <SectionHeader eyebrow="Selective disclosure" title="Prove a fact, not the file">
              Create an encrypted age threshold proof with CoFHE. The contract compares encrypted age against the
              threshold and grants proof decryption only to the owner and verifier.
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
                    <option key={doc.id.toString()} value={doc.id.toString()}>
                      {doc.title}
                    </option>
                  ))}
              </select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-ink">Private age input</span>
                <input
                  className="field rounded-md px-4 py-3"
                  type="number"
                  min={0}
                  max={120}
                  value={age}
                  onChange={(event) => setAge(Number(event.target.value))}
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-ink">Threshold</span>
                <input
                  className="field rounded-md px-4 py-3"
                  type="number"
                  min={1}
                  max={120}
                  value={threshold}
                  onChange={(event) => setThreshold(Number(event.target.value))}
                />
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-ink">Verifier wallet</span>
              <input className="field rounded-md px-4 py-3" value={verifier} onChange={(event) => setVerifier(event.target.value)} />
            </label>

            <ActionButton
              icon={FileCheck2}
              loading={isPending || walletClient.isLoading}
              disabled={!isConnected || !isContractConfigured || !documentId || !verifier.trim() || !publicClient || !walletClient.data}
              onClick={createProof}
              className="w-full py-3"
            >
              Create encrypted proof
            </ActionButton>
          </div>
        </div>
      </div>

      <section className="mt-10 surface rounded-md p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-xl font-semibold text-ink">Latest proof</h2>
            {proofExists ? (
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p>Threshold: {proof.data?.[1]?.toString()}</p>
                <p>Verifier: {shortAddress(proof.data?.[2] as string)}</p>
                <p>Updated: {formatDate(proof.data?.[4] as bigint)}</p>
                <p className="break-all font-mono text-xs">{proof.data?.[0] as string}</p>
              </div>
            ) : (
              <p className="mt-2 text-sm leading-6 text-slate-600">No proof has been created for the selected document.</p>
            )}
          </div>
          <ActionButton icon={ShieldCheck} variant="secondary" disabled={!proofExists || !walletClient.data} onClick={decryptProof}>
            Decrypt proof
          </ActionButton>
        </div>
        {proofResult !== null ? (
          <p className="mt-4 rounded-md bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
            Result: {proofResult ? "threshold satisfied" : "threshold not satisfied"}
          </p>
        ) : null}
        {status ? <p className="mt-4 rounded-md bg-sky-50 p-3 text-sm text-slate-700">{status}</p> : null}
      </section>
    </div>
  );
}
