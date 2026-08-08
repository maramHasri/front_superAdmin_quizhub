import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const categoryStyles = {
  TECHNICAL: "bg-emerald-50 text-emerald-600",
  ACCOUNT: "bg-teal-50 text-teal-600",
  CONTENT: "bg-sky-50 text-sky-600",
  CHEATING: "bg-amber-50 text-amber-600",
  OTHER: "bg-slate-100 text-slate-600",
};

export default function ReportCategoryBadge({ category }) {
  const { t } = useTranslation();

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-medium",
        categoryStyles[category] || categoryStyles.OTHER
      )}
    >
      {t(`reports.categories.${category}`, { defaultValue: category })}
    </span>
  );
}
