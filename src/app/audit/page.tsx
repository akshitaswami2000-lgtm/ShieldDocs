"use client";

import { useState } from "react";
import { Activity, RefreshCw } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { ContractBanner } from "@/components/ContractBanner";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeader } from "@/components/SectionHeader";
import { auditLabels } from "@/lib/contract";
import { formatDate, shortAddress } from "@/lib/format";
import { useAuditLog, useOwnedDocuments } from "@/hooks/useShieldDocs";

export default function AuditPage() {
  const { documents } = useOwnedDocuments();
  const [documentId, setDocumentId] = useState<bigint>();
  const audit = useAuditLog(documentId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <ContractBanner />
          <div className="mt-8">
            <SectionHeader eyebrow="On-chain trail" title="Audit activity">
              Every upload, request, grant, revoke, access touch, and proof action is preserved by the ShieldDocs
              contract for the document owner.
            </SectionHeader>
          </div>
        </div>
        <ActionButton icon={RefreshCw} variant="secondary" onClick={() => audit.refetch()} loading={audit.isLoading}>
          Refresh
        </ActionButton>
      </div>

      <div className="mt-8 max-w-xl">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink">Document</span>
          <select
            className="field rounded-md px-4 py-3"
            value={documentId?.toString() ?? ""}
            onChange={(event) => setDocumentId(event.target.value ? BigInt(event.target.value) : undefined)}
          >
            <option value="">Select document</option>
            {documents.map((doc) => (
              <option key={doc.id.toString()} value={doc.id.toString()}>
                {doc.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className="mt-8 surface rounded-md p-4">
        {!documentId ? (
          <EmptyState icon={Activity} title="Choose a document">
            Audit records are scoped per document, so the owner can inspect exactly who touched what.
          </EmptyState>
        ) : !audit.data || audit.data.length === 0 ? (
          <EmptyState icon={Activity} title="No audit records">
            This document has no recorded activity beyond what the selected wallet can read.
          </EmptyState>
        ) : (
          <div className="divide-y divide-sky-100">
            {audit.data
              .slice()
              .reverse()
              .map((entry) => (
                <div key={entry.id.toString()} className="grid gap-3 px-3 py-4 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-ink">{auditLabels[entry.action]}</p>
                      <span className="rounded-md bg-mist px-2 py-1 text-xs text-lagoon">#{entry.id.toString()}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{entry.note || "No note"}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      Actor {shortAddress(entry.actor)} · permission #{entry.permissionId.toString()}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-slate-500">{formatDate(entry.timestamp)}</p>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}
