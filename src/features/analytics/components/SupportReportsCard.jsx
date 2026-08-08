import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatNumber } from "@/lib/display";
import { cn } from "@/lib/utils";

export default function SupportReportsCard({ reports }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const items = [
    {
      key: "unread",
      value: reports?.unread ?? 0,
      valueClass: "text-red-500",
      to: "/reports?status=UNREAD",
    },
    {
      key: "inReview",
      value: reports?.in_review ?? reports?.inReview ?? 0,
      valueClass: "text-sky-600",
      to: "/reports?status=IN_REVIEW",
    },
    {
      key: "resolved",
      value: reports?.resolved ?? 0,
      valueClass: "text-brand",
      to: "/reports?status=REVIEWED",
    },
    {
      key: "total",
      value: reports?.total ?? 0,
      valueClass: "text-slate-800 dark:text-slate-100",
      to: "/reports",
    },
  ];

  return (
    <section className="flex h-full flex-col rounded-2xl bg-white dark:bg-slate-950 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h2 className="mb-3 shrink-0 text-start text-sm font-bold text-slate-800 dark:text-slate-100">
        {t("analytics.support.title")}
      </h2>

      <div className="flex min-h-0 flex-1 flex-col justify-between gap-2">
        {items.map(({ key, value, valueClass, to }) => (
          <button
            key={key}
            type="button"
            onClick={() => navigate(to)}
            className="flex flex-1 items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 px-2.5 py-2 text-start transition hover:border-brand/30 hover:bg-brand/5 dark:hover:bg-brand/10"
          >
            <span className="text-xs text-slate-500">
              {t(`analytics.support.${key}`)}
            </span>
            <span className={cn("text-xs font-bold", valueClass)}>
              {formatNumber(value, i18n.language)}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
