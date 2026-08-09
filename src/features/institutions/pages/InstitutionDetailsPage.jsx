import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import InstitutionDetailsHeader from "@/features/institutions/components/InstitutionDetailsHeader";
import InstitutionInfoCard from "@/features/institutions/components/InstitutionInfoCard";
import InstitutionStatsCard from "@/features/institutions/components/InstitutionStatsCard";
import { useInstitutionDetails } from "@/features/institutions/hooks/useInstitutionDetails";

export default function InstitutionDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { institutionId } = useParams();
  const { data: institution, isLoading, isError, error } =
    useInstitutionDetails(institutionId);

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <button
          type="button"
          onClick={() => navigate("/home?tab=institutions")}
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-brand"
        >
          <ArrowRight className="size-4" />
          {t("institutions.details.back")}
        </button>

        {isLoading ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center text-slate-400 shadow-sm dark:bg-slate-950">
            {t("common.loading")}
          </div>
        ) : isError ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center text-red-500 shadow-sm dark:bg-slate-950">
            {error?.response?.data?.message ||
              error?.message ||
              t("institutions.errors.detailsFailed")}
          </div>
        ) : (
          <>
            <InstitutionDetailsHeader institution={institution} />
            <div className="grid gap-6 lg:grid-cols-2">
              <InstitutionInfoCard institution={institution} />
              <InstitutionStatsCard institution={institution} />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
