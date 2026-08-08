import { ClipboardList, CircleCheckBig } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function StatsCards({ totalCount = 0 }) {
  const { t } = useTranslation();

  const cards = [
    {
      key: "pending",
      value: totalCount,
      icon: CircleCheckBig,
    },
    {
      key: "review",
      value: totalCount,
      icon: ClipboardList,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map(({ key, value, icon: Icon }) => (
        <div
          key={key}
          className="flex items-center justify-between rounded-2xl bg-white dark:bg-slate-950 px-6 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
        >
          <div>
            <p className="text-sm text-slate-500">
              {t(`institutions.stats.${key}`)}
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
          </div>

          <div className="flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Icon className="size-6" />
          </div>
        </div>
      ))}
    </div>
  );
}
