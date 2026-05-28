"use client";

import Link from "next/link";
import { Activity, ArrowRight, FileCheck2, FolderKey, LockKeyhole, Share2, ShieldCheck } from "lucide-react";
import { ActionLink } from "@/components/ActionLink";
import { ContractBanner } from "@/components/ContractBanner";
import { SectionHeader } from "@/components/SectionHeader";
import { useOwnedDocuments, useOwnerRequests, useSharedPermissions } from "@/hooks/useShieldDocs";

export default function HomePage() {
  const { documents } = useOwnedDocuments();
  const { permissions } = useSharedPermissions();
  const { requests } = useOwnerRequests();
  const pending = requests.filter((request) => request.status === 0).length;

  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.86fr] lg:px-8 lg:py-16">
        <div>
          <ContractBanner />
          <div className="mt-8">
            <SectionHeader eyebrow="On-chain privacy vault" title="ShieldDocs">
              Store small encrypted documents directly on chain, pin larger ciphertexts to IPFS, share temporary
              access, revoke it, and prove only what a verifier needs with CoFHE selective disclosure.
            </SectionHeader>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ActionLink href="/vault/upload" icon={LockKeyhole}>
              Upload encrypted doc
            </ActionLink>
            <ActionLink href="/verify" icon={FileCheck2} variant="secondary">
              Create proof
            </ActionLink>
          </div>
        </div>

        <div className="surface rounded-md p-4">
          <div className="rounded-md bg-mist p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-lagoon">Vault health</p>
                <h2 className="mt-1 text-2xl font-semibold text-ink">Ready for encrypted workflows</h2>
              </div>
              <ShieldCheck className="h-9 w-9 text-lagoon" />
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Metric label="Documents" value={documents.length.toString()} icon={FolderKey} />
            <Metric label="Shared with me" value={permissions.length.toString()} icon={Share2} />
            <Metric label="Pending" value={pending.toString()} icon={Activity} />
          </div>
          <div className="mt-4 divide-y divide-sky-100 rounded-md bg-white/72">
            {[
              ["1", "Upload", "AES-GCM encrypts locally before chain or IPFS storage."],
              ["2", "Share", "Wallet-sealed key envelopes sit with expiring permissions."],
              ["3", "Prove", "CoFHE compares encrypted age without exposing birthdate."]
            ].map(([step, title, copy]) => (
              <div key={step} className="flex gap-3 p-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-sky-100 text-sm font-semibold text-lagoon">
                  {step}
                </span>
                <div>
                  <p className="font-semibold text-ink">{title}</p>
                  <p className="text-sm leading-6 text-slate-600">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="soft-band">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            ["Encrypted vault", "Payload and key envelope stay unreadable across chain and IPFS storage."],
            ["Temporary access", "Expiry and revocation are enforced by the contract."],
            ["Selective disclosure", "Encrypted comparisons create verifiable privacy claims."],
            ["Audit trail", "Requests, approvals, views, and revokes are recorded on chain."]
          ].map(([title, copy]) => (
            <div key={title} className="border-l border-sky-200 pl-4">
              <h3 className="font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/vault"
          className="group inline-flex items-center gap-2 rounded-md text-sm font-semibold text-lagoon hover:text-ink"
        >
          Open vault
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </section>
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
