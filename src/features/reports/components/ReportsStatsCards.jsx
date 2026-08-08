import { useTranslation } from "react-i18next";
import { formatNumber } from "@/lib/display";
import { cn } from "@/lib/utils";

export default function ReportsStatsCards({ stats }) {
  const { t, i18n } = useTranslation();

  const cards = [
    {
      key: "total",
      value: stats?.total ?? 0,
      valueClass: "text-slate-800 dark:text-slate-100",
    },
    {
      key: "inReview",
      value: stats?.inReview ?? 0,
      valueClass: "text-slate-800 dark:text-slate-100",
    },
    {
      key: "awaiting",
      value: stats?.unread ?? 0,
      valueClass: "text-red-500",
    },
    {
      key: "resolved",
      value: stats?.resolved ?? 0,
      valueClass: "text-brand",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ key, value, valueClass }) => (
        <div
          key={key}
          className="rounded-2xl bg-white dark:bg-slate-950 px-6 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
        >
          <p className="text-sm text-slate-500">
            {t(`reports.stats.${key}`)}
          </p>
          <p className={cn("mt-2 text-3xl font-bold", valueClass)}>
            {formatNumber(value, i18n.language)}
          </p>
        </div>
      ))}
    </div>
  );
}
