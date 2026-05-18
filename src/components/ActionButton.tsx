import { Loader2, type LucideIcon } from "lucide-react";
import { cx } from "@/lib/format";

export function ActionButton({
  children,
  icon: Icon,
  loading,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: LucideIcon;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
}) {
  return (
    <button
      {...props}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition",
        variant === "primary" && "bg-ink text-white shadow-glow hover:bg-navy",
        variant === "secondary" && "border border-sky-100 bg-white text-ink hover:bg-sky-50",
        variant === "danger" && "border border-rose-100 bg-rose-50 text-rose-700 hover:bg-rose-100",
        className
      )}
      disabled={props.disabled || loading}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}
