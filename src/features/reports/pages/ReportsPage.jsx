import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportsHeader from "@/features/reports/components/ReportsHeader";
import ReportsStatsCards from "@/features/reports/components/ReportsStatsCards";
import ReportsTable from "@/features/reports/components/ReportsTable";
import {
  useReports,
  useReportsStats,
} from "@/features/reports/hooks/useReports";

const PER_PAGE = 5;
const STATUS_FILTERS = new Set([
  "UNREAD",
  "IN_REVIEW",
  "REVIEWED",
  "REJECTED",
]);

export default function ReportsPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const status = STATUS_FILTERS.has(statusParam) ? statusParam : undefined;

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [status]);

  const { data, isLoading, isError, error } = useReports({
    page,
    perPage: PER_PAGE,
    status,
  });
  const { data: stats } = useReportsStats();

  const reports = data?.reports ?? [];

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return reports;

    return reports.filter((report) =>
      [
        report.title,
        report.category,
        report.status,
        report.report_id,
        report.reporter?.full_name,
        report.reporter?.email,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [reports, search]);

  const total = search.trim() ? filteredReports.length : data?.total ?? 0;
  const pages = search.trim()
    ? Math.max(1, Math.ceil(filteredReports.length / PER_PAGE) || 1)
    : data?.pages ?? 1;
  const shownReports = search.trim()
    ? filteredReports.slice(0, PER_PAGE)
    : filteredReports;
  const from = shownReports.length === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const to = search.trim()
    ? shownReports.length
    : Math.min(page * PER_PAGE, data?.total ?? shownReports.length);

  const handleExport = () => {
    const rows = filteredReports.map((report) => ({
      report_id: report.report_id,
      title: report.title,
      category: report.category,
      status: report.status,
      created_at: report.created_at,
      reporter: report.reporter?.full_name || "",
      email: report.reporter?.email || "",
    }));

    const blob = new Blob([JSON.stringify(rows, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `reports-page-${page}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout
      showSearch
      searchValue={search}
      onSearchChange={(value) => {
        setSearch(value);
        setPage(1);
      }}
      searchPlaceholder={t("layout.appbar.searchReportsPlaceholder")}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <ReportsHeader onExport={handleExport} />

        {isLoading ? (
          <div className="rounded-2xl bg-white dark:bg-slate-950 px-6 py-16 text-center text-slate-400 shadow-sm">
            {t("common.loading")}
          </div>
        ) : isError ? (
          <div className="rounded-2xl bg-white dark:bg-slate-950 px-6 py-16 text-center text-red-500 shadow-sm">
            {error?.response?.data?.message ||
              error?.message ||
              t("reports.errors.loadFailed")}
          </div>
        ) : (
          <>
            <ReportsStatsCards stats={stats} />
            <ReportsTable
              reports={shownReports}
              page={page}
              pages={pages}
              total={total}
              from={from}
              to={to}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
