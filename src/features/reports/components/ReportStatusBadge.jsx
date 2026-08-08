import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const statusStyles = {
  UNREAD: {
    wrap: "text-red-500",
    dot: "bg-red-500",
  },
  IN_REVIEW: {
    wrap: "text-sky-600",
    dot: "bg-sky-500",
  },
  REVIEWED: {
    wrap: "text-brand",
    dot: "bg-brand",
  },
  REJECTED: {
    wrap: "text-slate-500",
    dot: "bg-slate-400",
  },
};

export default function ReportStatusBadge({ status }) {
  const { t } = useTranslation();
  const style = statusStyles[status] || statusStyles.REJECTED;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium",
        style.wrap
      )}
    >
      <span className={cn("size-2 shrink-0 rounded-full", style.dot)} />
      {t(`reports.status.${status}`, { defaultValue: status })}
    </span>
  );
}
