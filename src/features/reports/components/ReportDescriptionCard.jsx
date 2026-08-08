import { useTranslation } from "react-i18next";

export default function ReportDescriptionCard({ description }) {
  const { t } = useTranslation();

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-950 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h2 className="mb-4 text-start text-base font-bold text-slate-800 dark:text-slate-100">
        {t("reports.details.descriptionTitle")}
      </h2>

      <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 p-4">
        <div className="border-s-4 border-brand ps-4 text-start text-sm leading-7 text-slate-600 dark:text-slate-300">
          {description || t("reports.details.noDescription")}
        </div>
      </div>
    </section>
  );
}
