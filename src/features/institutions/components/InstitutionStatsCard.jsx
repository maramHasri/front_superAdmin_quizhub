import { useTranslation } from "react-i18next";
import { formatNumber } from "@/lib/display";

export default function InstitutionStatsCard({ institution }) {
  const { t, i18n } = useTranslation();

  const stats = [
    {
      key: "users",
      value: institution?.users_count ?? 0,
    },
    {
      key: "tests",
      value: institution?.tests_count ?? 0,
    },
    {
      key: "attempts",
      value: institution?.attempts_count ?? 0,
    },
  ];

  return (
    <section className="rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:bg-slate-950">
      <h2 className="mb-4 text-start text-base font-bold text-slate-800 dark:text-slate-100">
        {t("institutions.details.statsTitle")}
      </h2>

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map(({ key, value }) => (
          <div
            key={key}
            className="rounded-xl border border-slate-100 px-4 py-4 text-start dark:border-slate-800"
          >
            <p className="text-xs text-slate-400">
              {t(`institutions.details.stats.${key}`)}
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
              {formatNumber(value, i18n.language)}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-start text-xs text-slate-400">
        {t("institutions.details.placeholderNote")}
      </p>
    </section>
  );
}
