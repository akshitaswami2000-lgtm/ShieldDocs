"use client";

import type { PublicClient, WalletClient } from "viem";

export async function encryptAgeForContract(age: number, publicClient: PublicClient, walletClient: WalletClient) {
  const [{ Encryptable }, web, chains] = await Promise.all([
    import("@cofhe/sdk"),
    import("@cofhe/sdk/web"),
    import("@cofhe/sdk/chains")
  ]);

  const config = web.createCofheConfig({
    supportedChains: [chains.baseSepolia, chains.sepolia, chains.arbSepolia, chains.hardhat, chains.localcofhe],
    useWorkers: false
  });
  const client = web.createCofheClient(config);
  await client.connect(
    publicClient as Parameters<typeof client.connect>[0],
    walletClient as Parameters<typeof client.connect>[1]
  );
  const [encryptedAge] = await client.encryptInputs([Encryptable.uint16(BigInt(age))]).execute();
  return encryptedAge;
}

export async function decryptBooleanProof(
  handle: string,
  account: string,
  publicClient: PublicClient,
  walletClient: WalletClient
) {
  const [{ FheTypes }, web, chains] = await Promise.all([
    import("@cofhe/sdk"),
    import("@cofhe/sdk/web"),
    import("@cofhe/sdk/chains")
  ]);

  const config = web.createCofheConfig({
    supportedChains: [chains.baseSepolia, chains.sepolia, chains.arbSepolia, chains.hardhat, chains.localcofhe],
    useWorkers: false
  });
  const client = web.createCofheClient(config);
  await client.connect(
    publicClient as Parameters<typeof client.connect>[0],
    walletClient as Parameters<typeof client.connect>[1]
  );
  const permit = await client.permits.getOrCreateSelfPermit({
    issuer: account,
    name: "ShieldDocs selective disclosure"
  });
  const result = await client.decryptForView(handle, FheTypes.Bool).withPermit(permit).execute();
  return Boolean(result);
}
