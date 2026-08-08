import api from "@/lib/axios";

export const fetchReports = async ({
  page = 1,
  perPage = 20,
  status,
  category,
} = {}) => {
  const { data } = await api.get("/api/super-admin/reports", {
    params: {
      page,
      per_page: perPage,
      ...(status ? { status } : {}),
      ...(category ? { category } : {}),
    },
  });

  return data;
};

export const fetchReportById = async (reportId) => {
  const { data } = await api.get(`/api/super-admin/reports/${reportId}`);
  return data;
};

export const updateReportStatusRequest = async ({ reportId, status }) => {
  const { data } = await api.patch(`/api/super-admin/reports/${reportId}`, {
    status,
  });

  return data;
};
