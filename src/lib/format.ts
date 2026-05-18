import type { Address } from "viem";

export function shortAddress(address?: string) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatDate(seconds?: bigint | number) {
  if (!seconds) return "Never";
  const value = typeof seconds === "bigint" ? Number(seconds) : seconds;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value * 1000));
}

export function formatBytes(bytes?: bigint | number) {
  const size = typeof bytes === "bigint" ? Number(bytes) : bytes ?? 0;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function asAddress(value: string) {
  return value.trim() as Address;
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
