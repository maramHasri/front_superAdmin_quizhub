import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getReportDetails,
  getReports,
  getReportsStats,
  updateReportStatus,
} from "@/features/reports/services/reportsService";

export const reportsKeys = {
  all: ["reports"],
  list: (params) => [...reportsKeys.all, "list", params],
  stats: () => [...reportsKeys.all, "stats"],
  detail: (reportId) => [...reportsKeys.all, "detail", reportId],
};

export const useReports = ({
  page = 1,
  perPage = 20,
  status,
  category,
} = {}) => {
  return useQuery({
    queryKey: reportsKeys.list({ page, perPage, status, category }),
    queryFn: () => getReports({ page, perPage, status, category }),
    placeholderData: keepPreviousData,
  });
};

export const useReportsStats = () => {
  return useQuery({
    queryKey: reportsKeys.stats(),
    queryFn: getReportsStats,
  });
};

export const useReportDetails = (reportId) => {
  return useQuery({
    queryKey: reportsKeys.detail(reportId),
    queryFn: () => getReportDetails(reportId),
    enabled: Boolean(reportId),
  });
};

export const useUpdateReportStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReportStatus,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: reportsKeys.all });
      queryClient.invalidateQueries({
        queryKey: reportsKeys.detail(variables.reportId),
      });
    },
  });
};
