import api from "@/lib/axios";

export const fetchDashboardAnalytics = async () => {
  const { data } = await api.get("/api/super-admin/dashboard");
  return data;
};
