import { cn } from "@/lib/utils";

const STATUS_STYLES = {
  ACTIVE: "bg-brand/10 text-brand",
  نشط: "bg-brand/10 text-brand",
  SUSPENDED: "bg-red-50 text-red-500",
  موقوف: "bg-red-50 text-red-500",
  DISABLED: "bg-red-50 text-red-500",
  معطل: "bg-red-50 text-red-500",
  PENDING_VERIFICATION: "bg-amber-50 text-amber-600",
  PENDING: "bg-amber-50 text-amber-600",
  PENDING_APPROVAL: "bg-amber-50 text-amber-600",
};

export default function StatusBadge({ status, label, className }) {
  const text = label || status || "—";
  const style = STATUS_STYLES[status] || STATUS_STYLES[text] || "bg-slate-100 text-slate-600";

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-medium",
        style,
        className
      )}
    >
      {text}
    </span>
  );
}
