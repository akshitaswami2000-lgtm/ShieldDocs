import { CheckCircle2, CircleDashed, Rocket, ShieldCheck } from "lucide-react";
import { ContractBanner } from "@/components/ContractBanner";
import { SectionHeader } from "@/components/SectionHeader";

const completed = [
  "On-chain and Pinata IPFS encrypted document payload storage",
  "Wallet-sealed AES key envelopes",
  "Vault creation and ownership ledger",
  "Verifier access requests with requester public keys",
  "Temporary sharing, expiry checks, and revocation",
  "Scoped verifier permissions that do not disclose document keys",
  "Owner key rotation and local re-encryption after revocation",
  "Event-backed document discovery from create/archive logs",
  "Per-document audit trail",
  "CoFHE encrypted age threshold proof",
  "Event-backed proof history",
  "Resumable TUS upload for large encrypted IPFS payloads",
  "Wallet-signed Pinata upload authorization and rate limiting",
  "Sepolia deployment block defaults for discovery and proof history",
  "Hardhat CoFHE mock tests for end-to-end contract flow",
  "Encrypted metadata packaging for new document uploads",
  "Contract-side field limits and integrity checks",
  "Requester cancellation, copy actions, and mobile network switching"
];

const next = [
  "Contract verification on the selected testnet explorer",
  "Organization roles for HR, legal, finance, and emergency trustees",
  "Notification/indexer service for request alerts",
  "More CoFHE proof templates and compliance reminders",
  "Formal security review before real user data"
];

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <ContractBanner />
      <div className="mt-8">
        <SectionHeader eyebrow="Delivery map" title="Production path">
          ShieldDocs now has a hardened on-chain testnet release. This page keeps the shipped scope and the next hardening steps
          visible for demos, judging, and follow-on work.
        </SectionHeader>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="surface rounded-md p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-lagoon" />
            <h2 className="text-xl font-semibold text-ink">Finished</h2>
          </div>
          <div className="mt-5 divide-y divide-sky-100">
            {completed.map((item) => (
              <div key={item} className="flex gap-3 py-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <span className="text-sm leading-6 text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="surface rounded-md p-5">
          <div className="flex items-center gap-3">
            <Rocket className="h-6 w-6 text-lagoon" />
            <h2 className="text-xl font-semibold text-ink">Next hardening</h2>
          </div>
          <div className="mt-5 divide-y divide-sky-100">
            {next.map((item) => (
              <div key={item} className="flex gap-3 py-3">
                <CircleDashed className="mt-0.5 h-5 w-5 shrink-0 text-skyline" />
                <span className="text-sm leading-6 text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-8 surface rounded-md p-5">
        <h2 className="text-xl font-semibold text-ink">Deployment checklist</h2>
        <div className="mt-4 grid gap-3 text-sm text-slate-700">
          <p>
            Compile and test: <span className="font-mono">npm run compile && npm test</span>
          </p>
          <p>
            Deploy locally: <span className="font-mono">npm run deploy:hardhat</span>
          </p>
          <p>
            Deploy testnet: <span className="font-mono">PRIVATE_KEY=... npm run deploy:sepolia</span>
          </p>
          <p>
            ABI export: <span className="font-mono">npm run export:abi</span>
          </p>
        </div>
      </section>
    </div>
  );
}
