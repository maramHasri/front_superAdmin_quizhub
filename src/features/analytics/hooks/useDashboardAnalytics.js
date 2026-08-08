import { useQuery } from "@tanstack/react-query";
import { getDashboardAnalytics } from "@/features/analytics/services/analyticsService";

export const analyticsKeys = {
  all: ["analytics"],
  dashboard: () => [...analyticsKeys.all, "dashboard"],
};

export const useDashboardAnalytics = () => {
  return useQuery({
    queryKey: analyticsKeys.dashboard(),
    queryFn: getDashboardAnalytics,
  });
};
