import { fetchDashboardAnalytics } from "@/features/analytics/api/analyticsApi";

export const getDashboardAnalytics = async () => {
  const data = await fetchDashboardAnalytics();

  return {
    activitySeries: data.activity_series ?? { attempts: [] },
    content: data.content ?? {},
    integrityReports: data.integrity_reports ?? {},
    organizations: data.organizations ?? {},
    supportReports: data.support_reports ?? {},
    tests: data.tests ?? {},
    users: data.users ?? {},
  };
};
