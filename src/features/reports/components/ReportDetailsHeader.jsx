import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import ReportStatusBadge from "@/features/reports/components/ReportStatusBadge";
import { formatDateTimeDetailed } from "@/lib/display";

export default function ReportDetailsHeader({ report }) {
  const { t, i18n } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="text-sm text-slate-400">
          <span>{t("reports.details.breadcrumb.dashboard")}</span>
          <span className="mx-2">›</span>
          <Link to="/reports" className="transition hover:text-brand">
            {t("reports.details.breadcrumb.support")}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-slate-600 dark:text-slate-300">
            {t("reports.details.breadcrumb.details")}
          </span>
        </nav>

        <Link
          to="/reports"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-brand"
        >
          <ArrowRight className="size-4" />
          {t("reports.details.back")}
        </Link>
      </div>

      <div className="text-start">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {t("reports.details.title")}
          </h1>
          <ReportStatusBadge status={report.status} />
        </div>

        <p className="mt-2 text-sm text-slate-400">
          {t("reports.details.reportNumber", { id: report.report_id })}
          <span className="mx-2">•</span>
          {t("reports.details.createdAtLabel")}{" "}
          {formatDateTimeDetailed(report.created_at, i18n.language)}
        </p>
      </div>
    </div>
  );
}
