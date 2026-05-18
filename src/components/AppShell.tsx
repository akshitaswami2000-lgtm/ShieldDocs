"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, FileCheck2, FolderKey, GitPullRequest, LockKeyhole, Map, Shield, Share2 } from "lucide-react";
import { ConnectWallet } from "@/components/ConnectWallet";
import { cx } from "@/lib/format";

const nav = [
  { href: "/", label: "Overview", icon: Shield },
  { href: "/vault", label: "Vault", icon: FolderKey },
  { href: "/vault/upload", label: "Upload", icon: LockKeyhole },
  { href: "/sharing", label: "Sharing", icon: Share2 },
  { href: "/requests", label: "Requests", icon: GitPullRequest },
  { href: "/verify", label: "Verify", icon: FileCheck2 },
  { href: "/audit", label: "Audit", icon: Activity },
  { href: "/roadmap", label: "Roadmap", icon: Map }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-sky-100/80 bg-cloud/86 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="link-focus flex items-center gap-3 rounded-md">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-white text-lagoon shadow-glow">
              <Shield className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-base font-semibold tracking-normal text-ink">ShieldDocs</span>
              <span className="block text-xs text-slate-500">Private document vault</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 rounded-md border border-sky-100 bg-white/72 p-1 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "link-focus inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition",
                    active ? "bg-mist text-lagoon" : "text-slate-600 hover:bg-sky-50 hover:text-ink"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <ConnectWallet />
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
          {nav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "link-focus inline-flex shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-sm",
                  active ? "border-skyline bg-white text-lagoon" : "border-sky-100 bg-white/70 text-slate-600"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
