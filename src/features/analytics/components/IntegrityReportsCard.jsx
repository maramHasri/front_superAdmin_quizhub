import { useTranslation } from "react-i18next";
import { formatNumber } from "@/lib/display";

export default function IntegrityReportsCard({ reports }) {
  const { t, i18n } = useTranslation();

  const items = [
    {
      key: "pending",
      value: reports?.pending ?? 0,
      boxClass: "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400",
    },
    {
      key: "confirmed",
      value: reports?.confirmed ?? 0,
      boxClass: "bg-red-50 text-red-500 dark:bg-red-950/50 dark:text-red-400",
    },
    {
      key: "total",
      value: reports?.total ?? 0,
      boxClass: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    },
  ];

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-950 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h2 className="mb-3 text-start text-sm font-bold text-slate-800 dark:text-slate-100">
        {t("analytics.integrity.title")}
      </h2>

      <div className="space-y-2.5">
        {items.map(({ key, value, boxClass }) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 px-2.5 py-2"
          >
            <span className="text-xs text-slate-500">
              {t(`analytics.integrity.${key}`)}
            </span>
            <span
              className={`inline-flex min-w-8 items-center justify-center rounded-lg px-2 py-1 text-xs font-bold ${boxClass}`}
            >
              {formatNumber(value, i18n.language)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
