import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCards from "@/features/institutions/components/StatsCards";
import InstitutionsTabs from "@/features/institutions/components/InstitutionsTabs";
import InstitutionsTable from "@/features/institutions/components/InstitutionsTable";
import AllInstitutionsTable from "@/features/institutions/components/AllInstitutionsTable";
import RejectModal from "@/features/institutions/components/RejectModal";
import { usePendingInstitutions } from "@/features/institutions/hooks/usePendingInstitutions";
import { useAllInstitutions } from "@/features/institutions/hooks/useAllInstitutions";
import { useApproveInstitution } from "@/features/institutions/hooks/useApproveInstitution";
import { useRejectInstitution } from "@/features/institutions/hooks/useRejectInstitution";

const TAB_REQUESTS = "requests";
const TAB_INSTITUTIONS = "institutions";

export default function InstitutionsPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab =
    searchParams.get("tab") === TAB_INSTITUTIONS
      ? TAB_INSTITUTIONS
      : TAB_REQUESTS;

  const [search, setSearch] = useState("");
  const [allSearch, setAllSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [actionError, setActionError] = useState("");

  const pendingQuery = usePendingInstitutions();
  const allQuery = useAllInstitutions();
  const approveMutation = useApproveInstitution();
  const rejectMutation = useRejectInstitution();

  const institutions = pendingQuery.data?.institutions ?? [];
  const allInstitutions = allQuery.data?.institutions ?? [];

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

  const handleTabChange = (tab) => {
    setSearchParams(tab === TAB_INSTITUTIONS ? { tab } : {});
  };

  const handleSearchChange = (value) => {
    if (activeTab === TAB_INSTITUTIONS) {
      setAllSearch(value);
      return;
    }

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

  const tabs = [
    { key: TAB_REQUESTS, label: t("institutions.tabs.requests") },
    { key: TAB_INSTITUTIONS, label: t("institutions.tabs.institutions") },
  ];

  return (
    <DashboardLayout
      showSearch
      searchValue={activeTab === TAB_INSTITUTIONS ? allSearch : search}
      onSearchChange={handleSearchChange}
      searchPlaceholder={
        activeTab === TAB_INSTITUTIONS
          ? t("layout.appbar.searchInstitutionsPlaceholder")
          : t("layout.appbar.searchPlaceholder")
      }
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <StatsCards
          totalCount={pendingQuery.data?.count ?? institutions.length}
        />

        {actionError ? (
          <p className="text-sm text-red-600" role="alert">
            {actionError}
          </p>
        ) : null}

        <div className="flex flex-col gap-4">
          <InstitutionsTabs
            activeTab={activeTab}
            onChange={handleTabChange}
            tabs={tabs}
          />

          {activeTab === TAB_REQUESTS ? (
            pendingQuery.isLoading ? (
              <div className="rounded-2xl bg-white px-6 py-16 text-center text-slate-400 shadow-sm dark:bg-slate-950">
                {t("common.loading")}
              </div>
            ) : pendingQuery.isError ? (
              <div className="rounded-2xl bg-white px-6 py-16 text-center text-red-500 shadow-sm dark:bg-slate-950">
                {pendingQuery.error?.response?.data?.message ||
                  pendingQuery.error?.message ||
                  t("institutions.errors.loadFailed")}
              </div>
            ) : (
              <InstitutionsTable
                institutions={filteredInstitutions}
                page={page}
                onPageChange={setPage}
                approvingId={
                  approveMutation.isPending ? approveMutation.variables : null
                }
                onApprove={handleApprove}
                onReject={setRejectTarget}
              />
            )
          ) : allQuery.isLoading ? (
            <div className="rounded-2xl bg-white px-6 py-16 text-center text-slate-400 shadow-sm dark:bg-slate-950">
              {t("common.loading")}
            </div>
          ) : allQuery.isError ? (
            <div className="rounded-2xl bg-white px-6 py-16 text-center text-red-500 shadow-sm dark:bg-slate-950">
              {allQuery.error?.response?.data?.message ||
                allQuery.error?.message ||
                t("institutions.errors.loadAllFailed")}
            </div>
          ) : (
            <AllInstitutionsTable
              institutions={allInstitutions}
              searchValue={allSearch}
            />
          )}
        </div>
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
