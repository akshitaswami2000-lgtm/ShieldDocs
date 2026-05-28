"use client";

import Link from "next/link";
import { AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";
import { explorerAddressUrl, isContractConfigured, shieldDocsAddress } from "@/lib/contract";
import { shortAddress } from "@/lib/format";

export function ContractBanner() {
  const explorerUrl = explorerAddressUrl();

  if (isContractConfigured) {
    return (
      <div className="inline-flex flex-wrap items-center gap-2 rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
        <CheckCircle2 className="h-4 w-4" />
        Contract ready at {shortAddress(shieldDocsAddress)}
        {explorerUrl ? (
          <a
            href={explorerUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold hover:text-emerald-900"
          >
            Explorer
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className="surface rounded-md p-4 text-sm text-slate-700">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-lagoon" />
        <div>
          <p className="font-semibold text-ink">Contract address is not configured yet.</p>
          <p className="mt-1">
            Deploy with <span className="font-mono">npm run deploy:sepolia</span> or local Hardhat, then the app will
            read <span className="font-mono">NEXT_PUBLIC_SHIELDDOCS_ADDRESS</span>.
          </p>
          <Link href="/roadmap" className="mt-2 inline-flex text-lagoon hover:text-ink">
            View deployment notes
          </Link>
        </div>
      </div>
    </div>
  );
}
