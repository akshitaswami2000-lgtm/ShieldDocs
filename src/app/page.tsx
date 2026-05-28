"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock,
  DatabaseZap,
  FileCheck2,
  FolderKey,
  GitPullRequest,
  KeyRound,
  LockKeyhole,
  RotateCcwKey,
  ScanSearch,
  Share2,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { ActionLink } from "@/components/ActionLink";
import { ContractBanner } from "@/components/ContractBanner";
import { useOwnedDocuments, useOwnerRequests, useSharedPermissions } from "@/hooks/useShieldDocs";
import { explorerAddressUrl } from "@/lib/contract";

export default function HomePage() {
  const { documents } = useOwnedDocuments();
  const { permissions } = useSharedPermissions();
  const { requests } = useOwnerRequests();
  const pending = requests.filter((request) => request.status === 0).length;
  const explorerUrl = explorerAddressUrl();

  return (
    <div>
      <section className="hero-grid overflow-hidden border-b border-sky-100/80">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-16">
          <div className="min-w-0">
            <ContractBanner />
            <div className="mt-8 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-normal text-lagoon">Private document control</p>
              <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-normal text-ink sm:text-6xl">
                Store, share, revoke, and prove without exposing the file.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                ShieldDocs encrypts documents in the browser, stores ciphertext on chain or IPFS, seals keys to wallet
                encryption, and records every access decision in a Sepolia smart contract.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href="/vault/upload" icon={LockKeyhole} className="py-3">
                Upload encrypted doc
              </ActionLink>
              <ActionLink href="/requests" icon={GitPullRequest} variant="secondary" className="py-3">
                Request access
              </ActionLink>
              <ActionLink href="/verify" icon={FileCheck2} variant="secondary" className="py-3">
                Create proof
              </ActionLink>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Signal label="Metadata sealed" value="Encrypted" />
              <Signal label="Live network" value="Sepolia" />
              <Signal label="Storage" value="Chain + IPFS" />
            </div>
          </div>

          <div className="surface vault-visual rounded-md p-4">
            <div className="rounded-md bg-mist p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-lagoon">Vault health</p>
                  <h2 className="mt-1 text-2xl font-semibold text-ink">Ready for encrypted workflows</h2>
                </div>
                <ShieldCheck className="h-9 w-9 shrink-0 text-lagoon" />
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Metric label="Documents" value={documents.length.toString()} icon={FolderKey} />
              <Metric label="Shared with me" value={permissions.length.toString()} icon={Share2} />
              <Metric label="Pending" value={pending.toString()} icon={Activity} />
            </div>
            <div className="relative mt-4 overflow-hidden rounded-md border border-sky-100 bg-white/80 p-4">
              <div className="scan-sweep" />
              <div className="grid gap-3">
                {[
                  ["Local AES-GCM", "File encrypted before upload", LockKeyhole],
                  ["Wallet envelope", "Document key sealed to wallet", KeyRound],
                  ["Permission ledger", "Expiry, revoke, and audit on chain", Clock]
                ].map(([title, copy, Icon]) => (
                  <div key={title as string} className="pipeline-row flex items-center gap-3 rounded-md bg-sky-50/80 p-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-white text-lagoon shadow-sm">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{title as string}</span>
                      <span className="block text-sm text-slate-600">{copy as string}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-normal text-lagoon">What the app does</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">A real document workflow, not a file dump.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              The app separates encrypted storage, wallet-controlled access, on-chain permissions, and selective
              disclosure so users can share the minimum useful proof instead of sending full private documents.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Encrypted vault", "New uploads package real metadata inside the encrypted payload.", DatabaseZap],
              ["Temporary sharing", "Owners approve expiring grants and can revoke access later.", Share2],
              ["Key rotation", "After revocation, owners can rotate the AES key and payload.", RotateCcwKey],
              ["Selective proof", "CoFHE compares encrypted age inputs for verifier-facing proofs.", ScanSearch]
            ].map(([title, copy, Icon]) => (
              <Feature key={title as string} title={title as string} copy={copy as string} icon={Icon} />
            ))}
          </div>
        </div>
      </section>

      <section className="soft-band">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-normal text-lagoon">End-to-end flow</p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">Four steps from private file to controlled access.</h2>
            </div>
            <div className="grid gap-3">
              {[
                ["01", "Encrypt locally", "The file and its real metadata are packaged and encrypted in the browser."],
                ["02", "Store ciphertext", "Small ciphertext goes on chain; larger ciphertext is uploaded to Pinata IPFS."],
                ["03", "Grant access", "Owners seal the document key to a recipient wallet with expiry and scope."],
                ["04", "Prove facts", "CoFHE produces verifier-readable threshold proofs without raw age disclosure."]
              ].map(([step, title, copy]) => (
                <div key={step} className="grid gap-3 rounded-md border border-sky-100 bg-white/72 p-4 sm:grid-cols-[64px_1fr]">
                  <span className="font-mono text-sm font-semibold text-lagoon">{step}</span>
                  <span>
                    <span className="block font-semibold text-ink">{title}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">{copy}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        {[
          ["For owners", "Keep documents encrypted, inspect activity, revoke grants, and rotate keys after sharing."],
          ["For verifiers", "Request scoped access, receive permission links, and validate only the fact you need."],
          ["For demos", "Show upload, request, approval, decrypt, revoke, rotate, and proof flows on a live Sepolia contract."]
        ].map(([title, copy]) => (
          <div key={title} className="surface rounded-md p-5">
            <CheckCircle2 className="h-5 w-5 text-lagoon" />
            <h3 className="mt-4 text-xl font-semibold text-ink">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="surface grid gap-6 rounded-md p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-mist px-3 py-2 text-sm font-semibold text-lagoon">
              <Sparkles className="h-4 w-4" />
              Hardened Sepolia release
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-ink">Open the vault and run the full flow.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              The live build points at the redeployed contract and includes encrypted metadata packaging, typed upload
              signing, request cancellation, permission copying, and production smoke checks.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vault"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-navy"
            >
              Open vault
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            {explorerUrl ? (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-sky-100 bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:bg-sky-50"
              >
                View contract
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

function Signal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-sky-100 bg-white/74 p-3">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}

function Feature({
  title,
  copy,
  icon: Icon
}: {
  title: string;
  copy: string;
  icon: typeof FolderKey;
}) {
  return (
    <div className="surface rounded-md p-5">
      <div className="grid h-11 w-11 place-items-center rounded-md bg-mist text-lagoon">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{copy}</p>
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon
}: {
  label: string;
  value: string;
  icon: typeof FolderKey;
}) {
  return (
    <div className="rounded-md bg-white p-4">
      <Icon className="h-5 w-5 text-lagoon" />
      <p className="mt-4 text-3xl font-semibold text-ink">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}
