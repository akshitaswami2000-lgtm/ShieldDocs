"use client";

import { QueryClient } from "@tanstack/react-query";
import { injected } from "@wagmi/core";
import { createConfig, http } from "wagmi";
import { arbitrumSepolia, baseSepolia, sepolia } from "wagmi/chains";
import { defineChain } from "viem";

export const localHardhat = defineChain({
  id: 31337,
  name: "Hardhat Local",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"]
    }
  }
});

export const config = createConfig({
  chains: [sepolia, baseSepolia, arbitrumSepolia, localHardhat],
  connectors: [injected({ shimDisconnect: true })],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL ?? "https://sepolia.base.org"),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL ?? "https://ethereum-sepolia-rpc.publicnode.com"),
    [arbitrumSepolia.id]: http(
      process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC_URL ?? "https://sepolia-rollup.arbitrum.io/rpc"
    ),
    [localHardhat.id]: http()
  }
});

export const queryClient = new QueryClient();
