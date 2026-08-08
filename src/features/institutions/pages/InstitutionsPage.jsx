import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCards from "@/features/institutions/components/StatsCards";
import InstitutionsTable from "@/features/institutions/components/InstitutionsTable";
import RejectModal from "@/features/institutions/components/RejectModal";
import { usePendingInstitutions } from "@/features/institutions/hooks/usePendingInstitutions";
import { useApproveInstitution } from "@/features/institutions/hooks/useApproveInstitution";
import { useRejectInstitution } from "@/features/institutions/hooks/useRejectInstitution";

export default function InstitutionsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [actionError, setActionError] = useState("");

  const { data, isLoading, isError, error } = usePendingInstitutions();
  const approveMutation = useApproveInstitution();
  const rejectMutation = useRejectInstitution();

  const institutions = data?.institutions ?? [];

  const filteredInstitutions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return institutions;

    return institutions.filter((item) => {
      const haystack = [
        item.institution_name,
        item.owner?.full_name,
        item.owner?.email,
        item.owner?.phone_number,
        item.workspace_kind,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [institutions, search]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleApprove = (userId) => {
    setActionError("");

    approveMutation.mutate(userId, {
      onError: (err) => {
        setActionError(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            t("institutions.errors.approveFailed")
        );
      },
    });
  };

  const handleRejectConfirm = (reason) => {
    if (!rejectTarget) return;

    const userId = rejectTarget.user_id ?? rejectTarget.owner?.user_id;
    setActionError("");

    rejectMutation.mutate(
      { userId, reason },
      {
        onSuccess: () => {
          setRejectTarget(null);
        },
        onError: (err) => {
          setActionError(
            err?.response?.data?.message ||
              err?.response?.data?.error ||
              t("institutions.errors.rejectFailed")
          );
        },
      }
    );
  };

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <StatsCards totalCount={data?.count ?? institutions.length} />

        {actionError ? (
          <p className="text-sm text-red-600" role="alert">
            {actionError}
          </p>
        ) : null}

        {isLoading ? (
          <div className="rounded-2xl bg-white dark:bg-slate-950 px-6 py-16 text-center text-slate-400 shadow-sm">
            {t("common.loading")}
          </div>
        ) : isError ? (
          <div className="rounded-2xl bg-white dark:bg-slate-950 px-6 py-16 text-center text-red-500 shadow-sm">
            {error?.response?.data?.message ||
              error?.message ||
              t("institutions.errors.loadFailed")}
          </div>
        ) : (
          <InstitutionsTable
            institutions={filteredInstitutions}
            page={page}
            onPageChange={setPage}
            searchValue={search}
            onSearchChange={handleSearchChange}
            approvingId={
              approveMutation.isPending ? approveMutation.variables : null
            }
            onApprove={handleApprove}
            onReject={setRejectTarget}
          />
        )}
      </div>

      <RejectModal
        key={rejectTarget?.user_id ?? rejectTarget?.owner?.user_id ?? "closed"}
        open={Boolean(rejectTarget)}
        institutionName={rejectTarget?.institution_name || ""}
        isLoading={rejectMutation.isPending}
        onClose={() => setRejectTarget(null)}
        onConfirm={handleRejectConfirm}
      />
    </DashboardLayout>
  );
}
