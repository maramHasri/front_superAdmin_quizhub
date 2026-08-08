import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportDetailsHeader from "@/features/reports/components/ReportDetailsHeader";
import ReportReporterCard from "@/features/reports/components/ReportReporterCard";
import ReportInfoCard from "@/features/reports/components/ReportInfoCard";
import ReportDescriptionCard from "@/features/reports/components/ReportDescriptionCard";
import ReportStatusUpdateCard from "@/features/reports/components/ReportStatusUpdateCard";
import {
  useReportDetails,
  useUpdateReportStatus,
} from "@/features/reports/hooks/useReports";

export default function ReportDetailsPage() {
  const { t } = useTranslation();
  const { reportId } = useParams();
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { data: report, isLoading, isError, error } = useReportDetails(reportId);
  const updateMutation = useUpdateReportStatus();

  const handleUpdateStatus = (status) => {
    setActionError("");
    setSuccessMessage("");

    updateMutation.mutate(
      { reportId, status },
      {
        onSuccess: () => {
          setSuccessMessage(t("reports.details.updateSuccess"));
        },
        onError: (err) => {
          setActionError(
            err?.response?.data?.message ||
              err?.message ||
              t("reports.errors.updateFailed")
          );
        },
      }
    );
  };

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        {isLoading ? (
          <div className="rounded-2xl bg-white dark:bg-slate-950 px-6 py-16 text-center text-slate-400 shadow-sm">
            {t("common.loading")}
          </div>
        ) : isError ? (
          <div className="rounded-2xl bg-white dark:bg-slate-950 px-6 py-16 text-center text-red-500 shadow-sm">
            {error?.response?.data?.message ||
              error?.message ||
              t("reports.errors.detailsFailed")}
          </div>
        ) : (
          <>
            <ReportDetailsHeader report={report} />

            {actionError ? (
              <p className="text-sm text-red-600" role="alert">
                {actionError}
              </p>
            ) : null}

            {successMessage ? (
              <p className="text-sm text-brand" role="status">
                {successMessage}
              </p>
            ) : null}

            <div className="grid gap-4 xl:grid-cols-2">
              <ReportInfoCard report={report} />
              <ReportReporterCard reporter={report.reporter} />
            </div>

            <ReportDescriptionCard description={report.description} />

            <ReportStatusUpdateCard
              status={report.status}
              isLoading={updateMutation.isPending}
              onUpdate={handleUpdateStatus}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
