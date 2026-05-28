"use client";

import type { Hex, PublicClient } from "viem";

export async function waitForTransaction(publicClient: PublicClient | undefined, hash: Hex) {
  if (!publicClient) return;
  await publicClient.waitForTransactionReceipt({ hash });
}
