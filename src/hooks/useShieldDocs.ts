"use client";

import { useMemo } from "react";
import type { Address, Hex } from "viem";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { isContractConfigured, shieldDocsAbi, shieldDocsAddress } from "@/lib/contract";

export type DocumentSummary = {
  id: bigint;
  owner: Address;
  title: string;
  category: string;
  fileName: string;
  mimeType: string;
  storageMode: number;
  storageUri: string;
  payloadHash: Hex;
  size: bigint;
  createdAt: bigint;
  updatedAt: bigint;
  archived: boolean;
};

export type FullDocument = DocumentSummary & {
  encryptedPayload: Hex;
  iv: Hex;
  ownerKeyEnvelope: string;
};

export type SharedDocument = DocumentSummary & {
  encryptedPayload: Hex;
  iv: Hex;
  keyEnvelope: string;
  permissionId: bigint;
  scope: number;
  canDownload: boolean;
  expiresAt: bigint;
};

export type PermissionRecord = {
  id: bigint;
  documentId: bigint;
  owner: Address;
  grantee: Address;
  scope: number;
  canDownload: boolean;
  expiresAt: bigint;
  revoked: boolean;
  keyEnvelope: string;
  createdAt: bigint;
  revokedAt: bigint;
};

export type AccessRequestRecord = {
  id: bigint;
  documentId: bigint;
  owner: Address;
  requester: Address;
  scope: number;
  reason: string;
  requesterPublicKey: string;
  status: number;
  createdAt: bigint;
  respondedAt: bigint;
  permissionId: bigint;
};

export type AuditRecord = {
  id: bigint;
  documentId: bigint;
  permissionId: bigint;
  actor: Address;
  action: number;
  note: string;
  timestamp: bigint;
};

const contractBase = {
  address: shieldDocsAddress,
  abi: shieldDocsAbi
} as const;

export function useOwnedDocumentIds() {
  const { address } = useAccount();
  return useReadContract({
    ...contractBase,
    functionName: "getOwnedDocuments",
    args: address ? [address] : undefined,
    query: { enabled: isContractConfigured && Boolean(address) }
  });
}

export function useOwnedDocuments() {
  const idsQuery = useOwnedDocumentIds();
  const ids = useMemo(() => (idsQuery.data ?? []) as readonly bigint[], [idsQuery.data]);

  const contracts = useMemo(
    () =>
      ids.map((id) => ({
        ...contractBase,
        functionName: "getDocumentPublic",
        args: [id] as const
      })),
    [ids]
  );

  const docsQuery = useReadContracts({
    contracts,
    query: { enabled: isContractConfigured && contracts.length > 0 }
  });

  const documents = useMemo(
    () =>
      (docsQuery.data ?? [])
        .map((entry) => (entry.status === "success" ? publicTupleToDocument(entry.result) : undefined))
        .filter(Boolean) as DocumentSummary[],
    [docsQuery.data]
  );

  return {
    ids,
    documents,
    isLoading: idsQuery.isLoading || docsQuery.isLoading,
    refetch: async () => {
      await idsQuery.refetch();
      await docsQuery.refetch();
    }
  };
}

export function useFullDocument(documentId?: bigint) {
  const query = useReadContract({
    ...contractBase,
    functionName: "getDocument",
    args: documentId ? [documentId] : undefined,
    query: { enabled: isContractConfigured && Boolean(documentId) }
  });

  return {
    ...query,
    data: query.data ? fullTupleToDocument(query.data) : undefined
  };
}

export function useSharedDocument(permissionId?: bigint) {
  const query = useReadContract({
    ...contractBase,
    functionName: "getSharedDocument",
    args: permissionId ? [permissionId] : undefined,
    query: { enabled: isContractConfigured && Boolean(permissionId) }
  });

  return {
    ...query,
    data: query.data ? sharedTupleToDocument(query.data) : undefined
  };
}

export function useDocumentPermissions(documentId?: bigint) {
  const idsQuery = useReadContract({
    ...contractBase,
    functionName: "getDocumentPermissions",
    args: documentId ? [documentId] : undefined,
    query: { enabled: isContractConfigured && Boolean(documentId) }
  });
  const ids = useMemo(() => (idsQuery.data ?? []) as readonly bigint[], [idsQuery.data]);
  const contracts = useMemo(
    () =>
      ids.map((id) => ({
        ...contractBase,
        functionName: "getPermission",
        args: [id] as const
      })),
    [ids]
  );
  const permissionsQuery = useReadContracts({
    contracts,
    query: { enabled: isContractConfigured && contracts.length > 0 }
  });

  return {
    ids,
    permissions: (permissionsQuery.data ?? [])
      .map((entry) => (entry.status === "success" ? permissionTuple(entry.result) : undefined))
      .filter(Boolean) as PermissionRecord[],
    isLoading: idsQuery.isLoading || permissionsQuery.isLoading,
    refetch: async () => {
      await idsQuery.refetch();
      await permissionsQuery.refetch();
    }
  };
}

export function useSharedPermissions() {
  const { address } = useAccount();
  const idsQuery = useReadContract({
    ...contractBase,
    functionName: "getSharedPermissions",
    args: address ? [address] : undefined,
    query: { enabled: isContractConfigured && Boolean(address) }
  });
  const ids = useMemo(() => (idsQuery.data ?? []) as readonly bigint[], [idsQuery.data]);
  const contracts = useMemo(
    () =>
      ids.map((id) => ({
        ...contractBase,
        functionName: "getPermission",
        args: [id] as const
      })),
    [ids]
  );
  const permissionsQuery = useReadContracts({
    contracts,
    query: { enabled: isContractConfigured && contracts.length > 0 }
  });

  return {
    ids,
    permissions: (permissionsQuery.data ?? [])
      .map((entry) => (entry.status === "success" ? permissionTuple(entry.result) : undefined))
      .filter(Boolean) as PermissionRecord[],
    isLoading: idsQuery.isLoading || permissionsQuery.isLoading,
    refetch: async () => {
      await idsQuery.refetch();
      await permissionsQuery.refetch();
    }
  };
}

export function useOwnerRequests() {
  const { address } = useAccount();
  return useRequests("getOwnerRequests", address);
}

export function useRequesterRequests() {
  const { address } = useAccount();
  return useRequests("getRequesterRequests", address);
}

export function useAuditLog(documentId?: bigint) {
  const query = useReadContract({
    ...contractBase,
    functionName: "getAuditLog",
    args: documentId ? [documentId] : undefined,
    query: { enabled: isContractConfigured && Boolean(documentId) }
  });

  return {
    ...query,
    data: query.data ? ((query.data as unknown[]).map(auditTuple) as AuditRecord[]) : undefined
  };
}

function useRequests(functionName: "getOwnerRequests" | "getRequesterRequests", address?: Address) {
  const idsQuery = useReadContract({
    ...contractBase,
    functionName,
    args: address ? [address] : undefined,
    query: { enabled: isContractConfigured && Boolean(address) }
  });
  const ids = useMemo(() => (idsQuery.data ?? []) as readonly bigint[], [idsQuery.data]);
  const contracts = useMemo(
    () =>
      ids.map((id) => ({
        ...contractBase,
        functionName: "getRequest",
        args: [id] as const
      })),
    [ids]
  );
  const requestsQuery = useReadContracts({
    contracts,
    query: { enabled: isContractConfigured && contracts.length > 0 }
  });

  return {
    ids,
    requests: (requestsQuery.data ?? [])
      .map((entry) => (entry.status === "success" ? requestTuple(entry.result) : undefined))
      .filter(Boolean) as AccessRequestRecord[],
    isLoading: idsQuery.isLoading || requestsQuery.isLoading,
    refetch: async () => {
      await idsQuery.refetch();
      await requestsQuery.refetch();
    }
  };
}

function publicTupleToDocument(value: unknown): DocumentSummary {
  const tuple = value as readonly [
    bigint,
    Address,
    string,
    string,
    string,
    string,
    number,
    string,
    Hex,
    bigint,
    bigint,
    bigint,
    boolean
  ];
  return {
    id: tuple[0],
    owner: tuple[1],
    title: tuple[2],
    category: tuple[3],
    fileName: tuple[4],
    mimeType: tuple[5],
    storageMode: Number(tuple[6]),
    storageUri: tuple[7],
    payloadHash: tuple[8],
    size: tuple[9],
    createdAt: tuple[10],
    updatedAt: tuple[11],
    archived: tuple[12]
  };
}

function fullTupleToDocument(value: unknown): FullDocument {
  const record = value as {
    id: bigint;
    owner: Address;
    title: string;
    category: string;
    fileName: string;
    mimeType: string;
    storageMode: number;
    storageUri: string;
    encryptedPayload: Hex;
    iv: Hex;
    payloadHash: Hex;
    ownerKeyEnvelope: string;
    size: bigint;
    createdAt: bigint;
    updatedAt: bigint;
    archived: boolean;
  };
  return {
    ...record,
    storageMode: Number(record.storageMode)
  };
}

function sharedTupleToDocument(value: unknown): SharedDocument {
  const record = value as {
    id: bigint;
    owner: Address;
    title: string;
    category: string;
    fileName: string;
    mimeType: string;
    storageMode: number;
    storageUri: string;
    encryptedPayload: Hex;
    iv: Hex;
    payloadHash: Hex;
    keyEnvelope: string;
    size: bigint;
    createdAt: bigint;
    updatedAt: bigint;
    archived: boolean;
    permissionId: bigint;
    scope: number;
    canDownload: boolean;
    expiresAt: bigint;
  };
  return {
    ...record,
    storageMode: Number(record.storageMode),
    scope: Number(record.scope)
  };
}

function permissionTuple(value: unknown): PermissionRecord {
  const record = value as PermissionRecord;
  return {
    ...record,
    scope: Number(record.scope)
  };
}

function requestTuple(value: unknown): AccessRequestRecord {
  const record = value as AccessRequestRecord;
  return {
    ...record,
    scope: Number(record.scope),
    status: Number(record.status)
  };
}

function auditTuple(value: unknown): AuditRecord {
  const record = value as AuditRecord;
  return {
    ...record,
    action: Number(record.action)
  };
}
