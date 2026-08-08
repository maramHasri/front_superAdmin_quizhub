import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  formatRelativeTime,
  formatShortDate,
} from "@/lib/display";

export default function ReportInfoCard({ report }) {
  const { t, i18n } = useTranslation();

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-950 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h2 className="mb-4 text-start text-base font-bold text-slate-800 dark:text-slate-100">
        {t("reports.details.infoTitle")}
      </h2>

      <div className="space-y-4 text-start text-sm">
        <InfoRow
          label={t("reports.details.category")}
          value={t(`reports.categories.${report.category}`, {
            defaultValue: report.category,
          })}
          valueClass="font-semibold text-brand"
        />
        <InfoRow
          label={t("reports.details.reportTitle")}
          value={report.title}
        />
        <InfoRow
          label={t("reports.details.createdAt")}
          value={formatShortDate(report.created_at, i18n.language)}
        />
        <InfoRow
          label={t("reports.details.updatedAt")}
          value={formatRelativeTime(
            report.updated_at || report.created_at,
            i18n.language
          )}
        />

        <div>
          <p className="mb-1.5 text-xs text-slate-400">
            {t("reports.details.statusLabel")}
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <Eye className="size-4 text-slate-400" />
            <span>
              {t(`reports.details.statusHint.${report.status}`, {
                defaultValue: t(`reports.status.${report.status}`, {
                  defaultValue: report.status,
                }),
              })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value, valueClass = "font-medium text-slate-700" }) {
  return (
    <div>
      <p className="mb-1 text-xs text-slate-400">{label}</p>
      <p className={valueClass}>{value || "—"}</p>
    </div>
  );
}
