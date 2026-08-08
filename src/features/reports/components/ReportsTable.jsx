import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReportCategoryBadge from "@/features/reports/components/ReportCategoryBadge";
import ReportStatusBadge from "@/features/reports/components/ReportStatusBadge";
import Pagination from "@/components/Pagination";
import {
  formatCreationDateParts,
  formatDateTime,
  formatRelativeTime,
} from "@/lib/display";

export default function ReportsTable({
  reports = [],
  page = 1,
  pages = 1,
  total = 0,
  from = 0,
  to = 0,
  onPageChange,
}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-950 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-start text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400">
              <th className="px-5 py-4 font-medium">
                {t("reports.columns.id")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("reports.columns.title")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("reports.columns.category")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("reports.columns.submittedAt")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("reports.columns.updatedAt")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("reports.columns.status")}
              </th>
              <th className="px-5 py-4 font-medium">
                {t("reports.columns.createdAt")}
              </th>
            </tr>
          </thead>

          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-16 text-center text-slate-400"
                >
                  {t("reports.empty")}
                </td>
              </tr>
            ) : (
              reports.map((report) => {
                const createdParts = formatCreationDateParts(
                  report.created_at,
                  i18n.language
                );

                return (
                  <tr
                    key={report.report_id}
                    onClick={() => navigate(`/reports/${report.report_id}`)}
                    className="cursor-pointer border-b border-slate-50 dark:border-slate-800 transition hover:bg-slate-50/80 dark:hover:bg-slate-900/60 last:border-b-0"
                  >
                    <td className="px-5 py-4 font-medium text-slate-700 dark:text-slate-200">
                      {report.report_id}
                    </td>

                    <td className="max-w-[260px] px-4 py-4">
                      <p className="truncate font-semibold text-slate-800 dark:text-slate-100">
                        {report.title}
                      </p>
                      {report.reporter?.full_name ? (
                        <p className="mt-0.5 truncate text-xs text-slate-400">
                          {report.reporter.full_name}
                        </p>
                      ) : null}
                    </td>

                    <td className="px-4 py-4">
                      <ReportCategoryBadge category={report.category} />
                    </td>

                    <td className="px-4 py-4 text-slate-500">
                      {formatDateTime(report.created_at, i18n.language)}
                    </td>

                    <td className="px-4 py-4 text-slate-500">
                      {formatRelativeTime(
                        report.updated_at || report.created_at,
                        i18n.language
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <ReportStatusBadge status={report.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="leading-tight">
                        <p className="text-base font-bold text-slate-800 dark:text-slate-100">
                          {createdParts.day}
                        </p>
                        <p className="text-xs text-slate-400">
                          {createdParts.monthYear}
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        pages={pages}
        onPageChange={onPageChange}
        className="border-t border-slate-100 px-6 py-4 dark:border-slate-800"
        summary={t("reports.pagination.summary", { from, to, total })}
      />
    </section>
  );
}
