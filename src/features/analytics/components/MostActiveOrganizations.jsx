import { useState } from "react";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatCompactNumber, formatNumber, getInitials } from "@/lib/display";
import { cn } from "@/lib/utils";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 3;
const ROW_HEIGHT_CLASS = "h-[68px]";

export default function MostActiveOrganizations({ organizations = [] }) {
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(organizations.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visibleOrganizations = organizations.slice(start, start + PAGE_SIZE);
  const showPagination = organizations.length > PAGE_SIZE;
  const emptySlots =
    organizations.length === 0
      ? 0
      : Math.max(0, PAGE_SIZE - visibleOrganizations.length);

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-950 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="shrink-0 border-b border-slate-100 dark:border-slate-800 px-4 py-3">
        <h2 className="text-start text-sm font-bold text-slate-800 dark:text-slate-100">
          {t("analytics.mostActive.title")}
        </h2>
      </div>

      <div className="min-h-0 flex-1 overflow-x-auto">
        <table className="w-full min-w-[480px] table-fixed text-start text-sm">
          <thead>
            <tr className="bg-slate-50/70 dark:bg-slate-900/70 text-slate-400">
              <th className="px-4 py-3 font-medium">
                {t("analytics.mostActive.organization")}
              </th>
              <th className="w-20 px-2 py-3 font-medium">
                {t("analytics.mostActive.users")}
              </th>
              <th className="w-24 px-2 py-3 font-medium">
                {t("analytics.mostActive.tests")}
              </th>
              <th className="w-24 px-2 py-3 font-medium">
                {t("analytics.mostActive.attempts")}
              </th>
              <th className="w-12 px-3 py-3 font-medium" />
            </tr>
          </thead>

          <tbody>
            {organizations.length === 0 ? (
              <tr className={ROW_HEIGHT_CLASS}>
                <td
                  colSpan={5}
                  className="px-5 text-center text-slate-400"
                  style={{ height: `${68 * PAGE_SIZE}px` }}
                >
                  {t("analytics.mostActive.empty")}
                </td>
              </tr>
            ) : (
              <>
                {visibleOrganizations.map((org, index) => (
                  <tr
                    key={org.organization_id}
                    className={cn(
                      ROW_HEIGHT_CLASS,
                      "border-b border-slate-50 transition hover:bg-slate-50/80 last:border-b-0 dark:border-slate-800 dark:hover:bg-slate-900/60"
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[10px] font-semibold text-brand">
                          {getInitials(org.organization_name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                            {org.organization_name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            #{start + index + 1}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-2 py-3 font-medium text-slate-600 dark:text-slate-300">
                      {formatNumber(org.active_users ?? 0, i18n.language)}
                    </td>

                    <td className="px-2 py-3 font-medium text-slate-600 dark:text-slate-300">
                      {formatNumber(org.tests_count ?? 0, i18n.language)}
                    </td>

                    <td className="px-2 py-3 font-medium text-slate-600 dark:text-slate-300">
                      {formatCompactNumber(
                        org.attempts_count ?? 0,
                        i18n.language
                      )}
                    </td>

                    <td className="px-3 py-3 text-end">
                      <button
                        type="button"
                        className="inline-flex size-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-400 transition hover:border-brand/30 hover:bg-brand/5 hover:text-brand"
                        aria-label={t("analytics.mostActive.view")}
                      >
                        <Eye className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {Array.from({ length: emptySlots }, (_, index) => (
                  <tr
                    key={`empty-${index}`}
                    className={cn(ROW_HEIGHT_CLASS, "border-b border-transparent")}
                    aria-hidden="true"
                  >
                    <td colSpan={5} />
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {showPagination ? (
        <Pagination
          page={currentPage}
          pages={totalPages}
          onPageChange={setPage}
          size="sm"
          className="shrink-0 border-t border-slate-100 px-4 py-2.5 dark:border-slate-800"
          summary={t("analytics.mostActive.pagination.summary", {
            shown: visibleOrganizations.length,
            total: organizations.length,
          })}
        />
      ) : null}
    </section>
  );
}
