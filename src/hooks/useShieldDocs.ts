"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Address, Hex, PublicClient } from "viem";
import { useAccount, usePublicClient, useReadContract, useReadContracts } from "wagmi";
import { isContractConfigured, shieldDocsAbi, shieldDocsAddress, shieldDocsChainId } from "@/lib/contract";

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

export type DiscoverableDocument = {
  documentId: bigint;
  owner: Address;
  title: string;
  category: string;
  requestNote: string;
  active: boolean;
  updatedAt: bigint;
};

export type ProofRecord = {
  proofHandle: Hex;
  documentId: bigint;
  threshold: number;
  verifier: Address;
  exists: boolean;
  updatedAt: bigint;
};

const contractBase = {
  address: shieldDocsAddress,
  abi: shieldDocsAbi,
  chainId: shieldDocsChainId
} as const;

export function useOwnedDocumentIds() {
  const { address } = useAccount();
  return useReadContract({
    ...contractBase,
    account: address,
    functionName: "getOwnedDocuments",
    args: address ? [address] : undefined,
    query: { enabled: isContractConfigured && Boolean(address) }
  });
}

export function useOwnedDocuments() {
  const { address } = useAccount();
  const idsQuery = useOwnedDocumentIds();
  const ids = useMemo(() => (idsQuery.data ?? []) as readonly bigint[], [idsQuery.data]);

  const contracts = useMemo(
    () =>
      ids.map((id) => ({
        ...contractBase,
        account: address,
        functionName: "getDocumentPublic",
        args: [id] as const
      })),
    [address, ids]
  );

  const docsQuery = useReadContracts({
    contracts,
    query: { enabled: isContractConfigured && Boolean(address) && contracts.length > 0 }
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
  const { address } = useAccount();
  const query = useReadContract({
    ...contractBase,
    account: address,
    functionName: "getDocument",
    args: documentId ? [documentId] : undefined,
    query: { enabled: isContractConfigured && Boolean(address && documentId) }
  });

  return {
    ...query,
    data: query.data ? fullTupleToDocument(query.data) : undefined
  };
}

export function useSharedDocument(permissionId?: bigint) {
  const { address } = useAccount();
  const query = useReadContract({
    ...contractBase,
    account: address,
    functionName: "getSharedDocument",
    args: permissionId ? [permissionId] : undefined,
    query: { enabled: isContractConfigured && Boolean(address && permissionId) }
  });

  return {
    ...query,
    data: query.data ? sharedTupleToDocument(query.data) : undefined
  };
}

export function useDocumentPermissions(documentId?: bigint) {
  const { address } = useAccount();
  const idsQuery = useReadContract({
    ...contractBase,
    account: address,
    functionName: "getDocumentPermissions",
    args: documentId ? [documentId] : undefined,
    query: { enabled: isContractConfigured && Boolean(address && documentId) }
  });
  const ids = useMemo(() => (idsQuery.data ?? []) as readonly bigint[], [idsQuery.data]);
  const contracts = useMemo(
    () =>
      ids.map((id) => ({
        ...contractBase,
        account: address,
        functionName: "getPermission",
        args: [id] as const
      })),
    [address, ids]
  );
  const permissionsQuery = useReadContracts({
    contracts,
    query: { enabled: isContractConfigured && Boolean(address) && contracts.length > 0 }
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
    account: address,
    functionName: "getSharedPermissions",
    args: address ? [address] : undefined,
    query: { enabled: isContractConfigured && Boolean(address) }
  });
  const ids = useMemo(() => (idsQuery.data ?? []) as readonly bigint[], [idsQuery.data]);
  const contracts = useMemo(
    () =>
      ids.map((id) => ({
        ...contractBase,
        account: address,
        functionName: "getPermission",
        args: [id] as const
      })),
    [address, ids]
  );
  const permissionsQuery = useReadContracts({
    contracts,
    query: { enabled: isContractConfigured && Boolean(address) && contracts.length > 0 }
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
  const { address } = useAccount();
  const query = useReadContract({
    ...contractBase,
    account: address,
    functionName: "getAuditLog",
    args: documentId ? [documentId] : undefined,
    query: { enabled: isContractConfigured && Boolean(address && documentId) }
  });

  return {
    ...query,
    data: query.data ? ((query.data as unknown[]).map(auditTuple) as AuditRecord[]) : undefined
  };
}

export function useDiscoverableDocuments() {
  const publicClient = usePublicClient({ chainId: shieldDocsChainId });
  const query = useQuery({
    queryKey: ["shielddocs", "discoverable-documents", publicClient?.chain?.id, shieldDocsAddress],
    enabled: isContractConfigured && Boolean(shieldDocsAddress && publicClient),
    queryFn: async () => {
      if (!shieldDocsAddress || !publicClient) return [];
      const fromBlock = configuredFromBlock(process.env.NEXT_PUBLIC_DISCOVERY_FROM_BLOCK);
      const logs = await publicClient.getContractEvents({
        address: shieldDocsAddress,
        abi: shieldDocsAbi,
        eventName: "DocumentCreated",
        fromBlock,
        toBlock: "latest"
      });
      const archivedLogs = await publicClient.getContractEvents({
        address: shieldDocsAddress,
        abi: shieldDocsAbi,
        eventName: "DocumentArchived",
        fromBlock,
        toBlock: "latest"
      });
      const timestampByBlock = await getBlockTimestamps(
        publicClient,
        logs.map((log) => log.blockNumber)
      );
      const latest = new Map<string, DiscoverableDocument>();

      logs.forEach((log) => {
        const args = log.args as {
          documentId?: bigint;
          owner?: Address;
          title?: string;
        };
        if (!args.documentId || !args.owner) return;
        const key = args.documentId.toString();
        latest.set(key, {
          documentId: args.documentId,
          owner: args.owner,
          title: args.title || `Document #${args.documentId.toString()}`,
          category: "Private document",
          requestNote: `Request scoped access to document #${args.documentId.toString()}. The owner can approve proof-only or file access.`,
          active: true,
          updatedAt: getLogTimestamp(timestampByBlock, log.blockNumber)
        });
      });

      archivedLogs.forEach((log) => {
        const args = log.args as { documentId?: bigint };
        if (args.documentId) latest.delete(args.documentId.toString());
      });

      return Array.from(latest.values()).sort(sortByUpdatedAtDesc);
    }
  });

  const documents = query.data ?? [];
  return {
    ids: documents.map((doc) => doc.documentId),
    documents,
    isLoading: query.isLoading,
    refetch: async () => {
      await query.refetch();
    }
  };
}

export function useDocumentProofs(documentId?: bigint) {
  const publicClient = usePublicClient({ chainId: shieldDocsChainId });
  const query = useQuery({
    queryKey: ["shielddocs", "proof-history", publicClient?.chain?.id, shieldDocsAddress, documentId?.toString()],
    enabled: isContractConfigured && Boolean(shieldDocsAddress && publicClient && documentId),
    queryFn: async () => {
      if (!shieldDocsAddress || !publicClient || !documentId) return [];
      const fromBlock = configuredFromBlock(process.env.NEXT_PUBLIC_PROOF_HISTORY_FROM_BLOCK);
      const logs = await publicClient.getContractEvents({
        address: shieldDocsAddress,
        abi: shieldDocsAbi,
        eventName: "AgeProofCreated",
        args: { documentId },
        fromBlock,
        toBlock: "latest"
      });
      const timestampByBlock = await getBlockTimestamps(
        publicClient,
        logs.map((log) => log.blockNumber)
      );

      return logs.map((log) => {
        const args = log.args as {
          documentId?: bigint;
          verifier?: Address;
          threshold?: number;
          proofHandle?: Hex;
        };
        return {
          proofHandle: args.proofHandle ?? "0x",
          documentId: args.documentId ?? documentId,
          threshold: Number(args.threshold ?? 0),
          verifier: args.verifier ?? "0x0000000000000000000000000000000000000000",
          exists: Boolean(args.proofHandle),
          updatedAt: getLogTimestamp(timestampByBlock, log.blockNumber)
        };
      });
    }
  });

  const proofs = query.data ?? [];
  return {
    ids: proofs.map((_, index) => BigInt(index + 1)),
    proofs,
    isLoading: query.isLoading,
    refetch: async () => {
      await query.refetch();
    }
  };
}

function useRequests(functionName: "getOwnerRequests" | "getRequesterRequests", address?: Address) {
  const idsQuery = useReadContract({
    ...contractBase,
    account: address,
    functionName,
    args: address ? [address] : undefined,
    query: { enabled: isContractConfigured && Boolean(address) }
  });
  const ids = useMemo(() => (idsQuery.data ?? []) as readonly bigint[], [idsQuery.data]);
  const contracts = useMemo(
    () =>
      ids.map((id) => ({
        ...contractBase,
        account: address,
        functionName: "getRequest",
        args: [id] as const
      })),
    [address, ids]
  );
  const requestsQuery = useReadContracts({
    contracts,
    query: { enabled: isContractConfigured && Boolean(address) && contracts.length > 0 }
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

async function getBlockTimestamps(publicClient: PublicClient, blockNumbers: readonly (bigint | null | undefined)[]) {
  const uniqueBlockNumbers = Array.from(
    new Set(blockNumbers.filter((blockNumber): blockNumber is bigint => typeof blockNumber === "bigint"))
  );

  const entries = await Promise.all(
    uniqueBlockNumbers.map(async (blockNumber) => {
      const block = await publicClient.getBlock({ blockNumber });
      return [blockNumber.toString(), block.timestamp] as const;
    })
  );

  return new Map(entries);
}

function getLogTimestamp(timestampByBlock: Map<string, bigint>, blockNumber?: bigint | null) {
  return blockNumber ? timestampByBlock.get(blockNumber.toString()) ?? 0n : 0n;
}

function sortByUpdatedAtDesc(left: { updatedAt: bigint }, right: { updatedAt: bigint }) {
  if (right.updatedAt > left.updatedAt) return 1;
  if (right.updatedAt < left.updatedAt) return -1;
  return 0;
}

function configuredFromBlock(value?: string) {
  const block = value ?? process.env.NEXT_PUBLIC_SHIELDDOCS_DEPLOYMENT_BLOCK ?? "0";
  return /^\d+$/.test(block) ? BigInt(block) : 0n;
}
