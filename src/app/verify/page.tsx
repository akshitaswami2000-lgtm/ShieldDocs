"use client";

import { useMemo, useState } from "react";
import type { Hex } from "viem";
import { BadgeCheck, FileCheck2, ShieldCheck, Signature } from "lucide-react";
import { useAccount, usePublicClient, useReadContract, useWalletClient, useWriteContract } from "wagmi";
import { ActionButton } from "@/components/ActionButton";
import { ContractBanner } from "@/components/ContractBanner";
import { SectionHeader } from "@/components/SectionHeader";
import { decryptBooleanProof, encryptAgeForContract } from "@/lib/cofhe";
import {
  isAttestationsConfigured,
  isContractConfigured,
  shieldDocsAbi,
  shieldDocsAddress,
  shieldDocsAttestationsAbi,
  shieldDocsAttestationsAddress,
  shieldDocsChainId
} from "@/lib/contract";
import { errorMessage } from "@/lib/errors";
import { asAddress, formatDate, isValidAddress, shortAddress } from "@/lib/format";
import { waitForTransaction } from "@/lib/transactions";
import { useDocumentProofs, useOwnedDocuments } from "@/hooks/useShieldDocs";

export default function VerifyPage() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient({ chainId: shieldDocsChainId });
  const walletClient = useWalletClient({ chainId: shieldDocsChainId });
  const { documents } = useOwnedDocuments();
  const [documentId, setDocumentId] = useState<bigint>();
  const [age, setAge] = useState(22);
  const [threshold, setThreshold] = useState(18);
  const [verifier, setVerifier] = useState("");
  const [attestationIssuer, setAttestationIssuer] = useState("");
  const [attestationResult, setAttestationResult] = useState(true);
  const [attestationHours, setAttestationHours] = useState(720);
  const [attestationIssuedAt, setAttestationIssuedAt] = useState(0);
  const [attestationExpiresAt, setAttestationExpiresAt] = useState(0);
  const [attestationSignature, setAttestationSignature] = useState("");
  const [status, setStatus] = useState("");
  const [proofResult, setProofResult] = useState<boolean | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const { writeContractAsync, isPending } = useWriteContract();
  const verifierAddressValid = useMemo(() => isValidAddress(verifier), [verifier]);
  const issuerAddress = attestationIssuer.trim() || address || "";
  const issuerAddressValid = useMemo(() => isValidAddress(issuerAddress), [issuerAddress]);

  const proof = useReadContract({
    address: shieldDocsAddress,
    abi: shieldDocsAbi,
    chainId: shieldDocsChainId,
    account: address,
    functionName: "getAgeProof",
    args: documentId ? [documentId] : undefined,
    query: { enabled: isContractConfigured && Boolean(address && documentId) }
  });
  const proofHistory = useDocumentProofs(documentId);
  const issuerTrust = useReadContract({
    address: shieldDocsAttestationsAddress,
    abi: shieldDocsAttestationsAbi,
    chainId: shieldDocsChainId,
    functionName: "trustedIssuers",
    args: issuerAddressValid ? [asAddress(issuerAddress)] : undefined,
    query: { enabled: isAttestationsConfigured && issuerAddressValid }
  });
  const attestedProof = useReadContract({
    address: shieldDocsAttestationsAddress,
    abi: shieldDocsAttestationsAbi,
    chainId: shieldDocsChainId,
    account: address,
    functionName: "getAttestedAgeProof",
    args: documentId ? [documentId] : undefined,
    query: { enabled: isAttestationsConfigured && Boolean(address && documentId), retry: false }
  });

  async function createProof() {
    if (!documentId || !publicClient || !walletClient.data || !shieldDocsAddress) return;
    if (!verifierAddressValid) {
      setStatus("Enter a valid verifier wallet address.");
      return;
    }

    try {
      setStatus("Encrypting age with CoFHE SDK...");
      const encryptedAge = await encryptAgeForContract(age, publicClient, walletClient.data);
      setStatus("Submitting encrypted comparison to ShieldDocs...");
      const txHash = await writeContractAsync({
        address: shieldDocsAddress,
        abi: shieldDocsAbi,
        chainId: shieldDocsChainId,
        functionName: "createAgeProof",
        args: [
          documentId,
          encryptedAge as { ctHash: bigint; securityZone: number; utype: number; signature: Hex },
          threshold,
          asAddress(verifier)
        ]
      });
      setIsConfirming(true);
      setStatus("Proof transaction submitted. Waiting for confirmation...");
      await waitForTransaction(publicClient, txHash);
      await proof.refetch();
      await proofHistory.refetch();
      setStatus("Encrypted proof confirmed.");
    } catch (error) {
      setStatus(`Proof failed: ${errorMessage(error)}`);
    } finally {
      setIsConfirming(false);
    }
  }

  async function signAttestation() {
    if (!address || !documentId || !publicClient || !walletClient.data || !shieldDocsAttestationsAddress) return;
    if (!verifierAddressValid) {
      setStatus("Enter a valid verifier wallet address.");
      return;
    }
    if (!issuerAddressValid) {
      setStatus("Enter a valid trusted issuer wallet address.");
      return;
    }
    if (issuerAddress.toLowerCase() !== address.toLowerCase()) {
      setStatus("Connect the issuer wallet to sign, or paste a signature created by the trusted issuer.");
      return;
    }

    try {
      const issuedAt = Math.floor(Date.now() / 1000);
      const expiresAt = issuedAt + Math.max(1, attestationHours) * 60 * 60;
      const messageHash = (await publicClient.readContract({
        address: shieldDocsAttestationsAddress,
        abi: shieldDocsAttestationsAbi,
        functionName: "ageAttestationMessageHash",
        args: [
          documentId,
          asAddress(address),
          threshold,
          asAddress(verifier),
          asAddress(issuerAddress),
          BigInt(issuedAt),
          BigInt(expiresAt),
          attestationResult
        ]
      })) as Hex;
      const signature = await walletClient.data.signMessage({
        account: asAddress(address),
        message: { raw: messageHash }
      });
      setAttestationIssuedAt(issuedAt);
      setAttestationExpiresAt(expiresAt);
      setAttestationIssuer(address);
      setAttestationSignature(signature);
      setStatus("Trusted issuer attestation signed locally. Submit it on chain to record the proof.");
    } catch (error) {
      setStatus(`Attestation signing failed: ${errorMessage(error)}`);
    }
  }

  async function submitAttestation() {
    if (!documentId || !publicClient || !shieldDocsAttestationsAddress) return;
    if (!verifierAddressValid || !issuerAddressValid || !attestationSignature.trim()) {
      setStatus("Complete verifier, trusted issuer, and signature before submitting the attestation.");
      return;
    }
    if (!attestationIssuedAt || !attestationExpiresAt) {
      setStatus("Sign an issuer attestation first so issued and expiry timestamps are fixed.");
      return;
    }

    try {
      setStatus("Recording trusted issuer age attestation on chain...");
      const txHash = await writeContractAsync({
        address: shieldDocsAttestationsAddress,
        abi: shieldDocsAttestationsAbi,
        chainId: shieldDocsChainId,
        functionName: "createAttestedAgeProof",
        args: [
          documentId,
          threshold,
          asAddress(verifier),
          asAddress(issuerAddress),
          BigInt(attestationIssuedAt),
          BigInt(attestationExpiresAt),
          attestationResult,
          attestationSignature as Hex
        ]
      });
      setIsConfirming(true);
      setStatus("Attestation transaction submitted. Waiting for confirmation...");
      await waitForTransaction(publicClient, txHash);
      await attestedProof.refetch();
      setStatus("Trusted issuer attestation confirmed.");
    } catch (error) {
      setStatus(`Attestation failed: ${errorMessage(error)}`);
    } finally {
      setIsConfirming(false);
    }
  }

  async function decryptProof() {
    if (!address || !publicClient || !walletClient.data || !proof.data) return;
    try {
      const handle = proof.data[0] as Hex;
      setStatus("Creating CoFHE permit and decrypting proof for view...");
      const result = await decryptBooleanProof(handle, publicClient, walletClient.data);
      setProofResult(result);

      if (shieldDocsAddress && documentId) {
        const txHash = await writeContractAsync({
          address: shieldDocsAddress,
          abi: shieldDocsAbi,
          chainId: shieldDocsChainId,
          functionName: "recordProofView",
          args: [documentId]
        });
        setIsConfirming(true);
        setStatus("Proof decrypted. Recording audit view on chain...");
        await waitForTransaction(publicClient, txHash);
      }
      setStatus("Proof decrypted and audit view recorded.");
    } catch (error) {
      setStatus(`Proof decrypt failed: ${errorMessage(error)}`);
    } finally {
      setIsConfirming(false);
    }
  }

  const proofExists = Boolean(proof.data?.[3]);
  const latestAttestation = attestedProof.data as
    | {
        exists: boolean;
        issuer: string;
        verifier: string;
        threshold: number;
        result: boolean;
        attestationHash: Hex;
        issuedAt: bigint;
        expiresAt: bigint;
        updatedAt: bigint;
      }
    | undefined;
  const attestationExists = Boolean(latestAttestation?.exists);

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
                      {doc.title} #{doc.id.toString()}
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
              {verifier.trim() && !verifierAddressValid ? (
                <span className="text-xs font-medium text-rose-600">Enter a valid verifier address.</span>
              ) : null}
            </label>

            <ActionButton
              icon={FileCheck2}
              loading={isPending || isConfirming || walletClient.isLoading}
              disabled={!isConnected || !isContractConfigured || !documentId || !verifierAddressValid || !publicClient || !walletClient.data}
              onClick={createProof}
              className="w-full py-3"
            >
              Create encrypted proof
            </ActionButton>

            <div className="rounded-md border border-sky-100 bg-white/72 p-4">
              <div className="flex items-start gap-3">
                <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-lagoon" />
                <div>
                  <h2 className="font-semibold text-ink">Trusted issuer attestation</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Record an issuer-signed age result when a credential issuer has checked the underlying claim. The
                    CoFHE proof remains available for private-computation demos.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-ink">Trusted issuer wallet</span>
                  <input
                    className="field rounded-md px-4 py-3"
                    value={attestationIssuer}
                    onChange={(event) => setAttestationIssuer(event.target.value)}
                    placeholder={address || "0x..."}
                  />
                  {issuerAddressValid && isAttestationsConfigured ? (
                    <span className="text-xs font-medium text-slate-500">
                      Issuer registry: {issuerTrust.data ? "trusted" : "not trusted"}
                    </span>
                  ) : null}
                </label>

                <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-ink">Attestation expiry hours</span>
                    <input
                      className="field rounded-md px-4 py-3"
                      type="number"
                      min={1}
                      max={8760}
                      value={attestationHours}
                      onChange={(event) => setAttestationHours(Number(event.target.value))}
                    />
                  </label>
                  <label className="flex items-center gap-3 self-end rounded-md border border-sky-100 bg-white px-4 py-3 text-sm font-medium text-ink">
                    <input
                      type="checkbox"
                      checked={attestationResult}
                      onChange={(event) => setAttestationResult(event.target.checked)}
                    />
                    Threshold satisfied
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-ink">Issuer signature</span>
                  <textarea
                    className="field min-h-20 rounded-md px-4 py-3 font-mono text-xs"
                    value={attestationSignature}
                    onChange={(event) => setAttestationSignature(event.target.value)}
                    placeholder="Sign with the trusted issuer wallet"
                  />
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <ActionButton
                    icon={Signature}
                    variant="secondary"
                    loading={walletClient.isLoading}
                    disabled={
                      !isConnected ||
                      !isAttestationsConfigured ||
                      !documentId ||
                      !verifierAddressValid ||
                      !issuerAddressValid ||
                      !publicClient ||
                      !walletClient.data
                    }
                    onClick={signAttestation}
                  >
                    Sign attestation
                  </ActionButton>
                  <ActionButton
                    icon={BadgeCheck}
                    loading={isPending || isConfirming}
                    disabled={
                      !isConnected ||
                      !isAttestationsConfigured ||
                      !documentId ||
                      !verifierAddressValid ||
                      !issuerAddressValid ||
                      !attestationSignature.trim()
                    }
                    onClick={submitAttestation}
                  >
                    Record attestation
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10 surface rounded-md p-5">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
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

            <div className="mt-6 rounded-md border border-sky-100 bg-white/72 p-4">
              <h3 className="font-semibold text-ink">Latest issuer attestation</h3>
              {attestationExists && latestAttestation ? (
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <p>Result: {latestAttestation.result ? "threshold satisfied" : "threshold not satisfied"}</p>
                  <p>Threshold: {latestAttestation.threshold.toString()}</p>
                  <p>Issuer: {shortAddress(latestAttestation.issuer)}</p>
                  <p>Verifier: {shortAddress(latestAttestation.verifier)}</p>
                  <p>Expires: {formatDate(latestAttestation.expiresAt)}</p>
                  <p className="break-all font-mono text-xs">{latestAttestation.attestationHash}</p>
                </div>
              ) : (
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  No trusted issuer attestation has been recorded for the selected document.
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-ink">Proof history</h2>
              <ActionButton
                icon={ShieldCheck}
                variant="secondary"
                loading={isPending || isConfirming}
                disabled={!proofExists || !walletClient.data}
                onClick={decryptProof}
              >
                Decrypt latest
              </ActionButton>
            </div>
            {proofHistory.proofs.length === 0 ? (
              <p className="mt-3 text-sm leading-6 text-slate-600">Historical proof handles appear after creation.</p>
            ) : (
              <div className="mt-3 max-h-72 divide-y divide-sky-100 overflow-auto rounded-md bg-white/72">
                {proofHistory.proofs
                  .slice()
                  .reverse()
                  .map((entry, index) => (
                    <div key={`${entry.proofHandle}-${index}`} className="p-3 text-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold text-ink">Threshold {entry.threshold}</p>
                        <span className="text-xs text-slate-500">{formatDate(entry.updatedAt)}</span>
                      </div>
                      <p className="mt-1 text-slate-600">Verifier {shortAddress(entry.verifier)}</p>
                      <p className="mt-2 break-all font-mono text-xs text-slate-500">{entry.proofHandle}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
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
