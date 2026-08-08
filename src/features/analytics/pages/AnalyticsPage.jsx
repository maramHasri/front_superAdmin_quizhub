import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AnalyticsSummaryCards from "@/features/analytics/components/AnalyticsSummaryCards";
import AnalyticsCategoryCards from "@/features/analytics/components/AnalyticsCategoryCards";
import PlatformActivityChart from "@/features/analytics/components/PlatformActivityChart";
import SupportReportsCard from "@/features/analytics/components/SupportReportsCard";
import MostActiveOrganizations from "@/features/analytics/components/MostActiveOrganizations";
import { useDashboardAnalytics } from "@/features/analytics/hooks/useDashboardAnalytics";

export default function AnalyticsPage() {
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = useDashboardAnalytics();

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="text-start">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {t("analytics.title")}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {t("analytics.subtitle")}
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-2xl bg-white dark:bg-slate-950 px-6 py-16 text-center text-slate-400 shadow-sm">
            {t("common.loading")}
          </div>
        ) : isError ? (
          <div className="rounded-2xl bg-white dark:bg-slate-950 px-6 py-16 text-center text-red-500 shadow-sm">
            {error?.response?.data?.message ||
              error?.message ||
              t("analytics.errors.loadFailed")}
          </div>
        ) : (
          <>
            <AnalyticsSummaryCards data={data} />
            <AnalyticsCategoryCards data={data} />

            <PlatformActivityChart activitySeries={data?.activitySeries} />

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_200px]">
              <MostActiveOrganizations
                organizations={data?.organizations?.most_active ?? []}
              />
              <SupportReportsCard reports={data?.supportReports} />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
