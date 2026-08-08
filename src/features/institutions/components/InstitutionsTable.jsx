import { Download, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 4;

export default function InstitutionsTable({
  institutions = [],
  page = 1,
  onPageChange,
  searchValue = "",
  onSearchChange,
  approvingId,
  onApprove,
  onReject,
}) {
  const { t, i18n } = useTranslation();
  const total = institutions.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = institutions.slice(start, start + PAGE_SIZE);

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-950 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 px-6 py-5">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          {t("institutions.tableTitle")}
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px]">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchValue}
              onValueChange={onSearchChange}
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder={t("layout.appbar.searchPlaceholder")}
              className="h-10 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 ps-10 text-sm shadow-none"
            />
          </div>

          <Button
            type="button"
            className="h-10 rounded-xl bg-brand px-4 text-white hover:bg-brand-dark"
          >
            <Download className="size-4" />
            {t("institutions.export")}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-start text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400">
              <th className="px-6 py-4 font-medium">
                {t("institutions.columns.name")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("institutions.columns.owner")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("institutions.columns.contact")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("institutions.columns.type")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("institutions.columns.date")}
              </th>
              <th className="px-6 py-4 font-medium">
                {t("institutions.columns.actions")}
              </th>
            </tr>
          </thead>

          <tbody>
            {pageItems.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-16 text-center text-slate-400"
                >
                  {t("institutions.empty")}
                </td>
              </tr>
            ) : (
              pageItems.map((item) => {
                const userId = item.user_id ?? item.owner?.user_id;
                const name = item.institution_name || "-";
                const ownerName = item.owner?.full_name || "-";
                const email = item.owner?.email || "-";
                const phone = item.owner?.phone_number || "-";
                const isApproving = approvingId === userId;

                return (
                  <tr
                    key={`${userId}-${item.slug}`}
                    className="border-b border-slate-50 dark:border-slate-800 last:border-b-0"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          {getInitials(name)}
                        </span>
                        <span className="font-medium text-slate-800 dark:text-slate-100">{name}</span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{ownerName}</td>

                    <td className="px-4 py-4">
                      <div className="space-y-1 text-slate-500">
                        <p>{email}</p>
                        <p>{phone}</p>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                        {t(getTypeLabelKey(item.workspace_kind))}
                      </span>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-slate-500">
                      {formatDate(item.submitted_at, i18n.language)}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          disabled={isApproving}
                          onClick={() => onApprove(userId)}
                          className="h-9 rounded-lg bg-brand px-4 text-white hover:bg-brand-dark"
                        >
                          {isApproving
                            ? t("institutions.actions.approving")
                            : t("institutions.actions.approve")}
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          disabled={isApproving}
                          onClick={() => onReject(item)}
                          className="h-9 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900"
                        >
                          {t("institutions.actions.reject")}
                        </Button>
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
        page={currentPage}
        pages={totalPages}
        onPageChange={onPageChange}
        className="border-t border-slate-100 px-6 py-4 dark:border-slate-800"
        summary={t("institutions.pagination.summary", {
          shown: pageItems.length,
          total,
        })}
      />
    </section>
  );
}

export { PAGE_SIZE };

function getInitials(value) {
  return String(value)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "NA";
}

function getTypeLabelKey(kind) {
  if (kind === "PERSONAL" || kind === "INDIVIDUAL") {
    return "institutions.types.individual";
  }

  return "institutions.types.company";
}

function formatDate(value, language) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(language?.startsWith("ar") ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}
