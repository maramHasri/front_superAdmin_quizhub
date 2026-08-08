import {
  fetchReportById,
  fetchReports,
  updateReportStatusRequest,
} from "@/features/reports/api/reportsApi";

export const getReports = async ({
  page = 1,
  perPage = 20,
  status,
  category,
} = {}) => {
  const data = await fetchReports({ page, perPage, status, category });

  return {
    reports: data.reports ?? [],
    page: data.page ?? page,
    pages: data.pages ?? 1,
    perPage: data.per_page ?? perPage,
    total: data.total ?? data.reports?.length ?? 0,
  };
};

export const getReportsStats = async () => {
  const [all, unread, inReview, reviewed] = await Promise.all([
    fetchReports({ page: 1, perPage: 1 }),
    fetchReports({ page: 1, perPage: 1, status: "UNREAD" }),
    fetchReports({ page: 1, perPage: 1, status: "IN_REVIEW" }),
    fetchReports({ page: 1, perPage: 1, status: "REVIEWED" }),
  ]);

  return {
    total: all.total ?? 0,
    unread: unread.total ?? 0,
    inReview: inReview.total ?? 0,
    resolved: reviewed.total ?? 0,
  };
};

export const getReportDetails = async (reportId) => {
  return fetchReportById(reportId);
};

export const updateReportStatus = async ({ reportId, status }) => {
  return updateReportStatusRequest({ reportId, status });
};
