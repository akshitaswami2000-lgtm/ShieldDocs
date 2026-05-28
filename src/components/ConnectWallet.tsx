"use client";

import { LogOut, Plug, Wallet } from "lucide-react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { sepolia } from "wagmi/chains";
import { shieldDocsChainId } from "@/lib/contract";
import { shortAddress } from "@/lib/format";

export function ConnectWallet() {
  const { address, chainId, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: switching } = useSwitchChain();
  const injected = connectors.find((connector) => connector.id === "injected") ?? connectors[0];

  if (!isConnected) {
    return (
      <button
        className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-navy"
        disabled={!injected || isPending}
        onClick={() => connect({ connector: injected })}
      >
        <Plug className="h-4 w-4" />
        Connect
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {chainId !== shieldDocsChainId ? (
        <button
          className="inline-flex rounded-md border border-sky-200 bg-white px-3 py-2 text-sm font-medium text-lagoon transition hover:bg-sky-50"
          disabled={switching}
          onClick={() => switchChain({ chainId: shieldDocsChainId })}
        >
          {shieldDocsChainId === sepolia.id ? "Sepolia" : "Switch network"}
        </button>
      ) : null}
      <div className="hidden items-center gap-2 rounded-md border border-sky-100 bg-white px-3 py-2 text-sm text-ink sm:inline-flex">
        <Wallet className="h-4 w-4 text-lagoon" />
        {shortAddress(address)}
      </div>
      <button
        className="grid h-10 w-10 place-items-center rounded-md border border-sky-100 bg-white text-slate-500 transition hover:bg-sky-50 hover:text-ink"
        onClick={() => disconnect()}
        aria-label="Disconnect wallet"
        title="Disconnect"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
