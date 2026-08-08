import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UsersStatsCards from "@/features/users/components/UsersStatsCards";
import UsersFilters from "@/features/users/components/UsersFilters";
import UsersTable from "@/features/users/components/UsersTable";
import SuspendModal from "@/features/users/components/SuspendModal";
import EditUserModal from "@/features/users/components/EditUserModal";
import DeleteUserModal from "@/features/users/components/DeleteUserModal";
import { useUsers } from "@/features/users/hooks/useUsers";
import { useSuspendUser } from "@/features/users/hooks/useSuspendUser";
import { useRestoreUser } from "@/features/users/hooks/useRestoreUser";
import { useUpdateUser } from "@/features/users/hooks/useUpdateUser";
import { useDeleteUser } from "@/features/users/hooks/useDeleteUser";

const PER_PAGE = 10;

export default function UsersPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [role, setRole] = useState("all");
  const [institution, setInstitution] = useState("all");
  const [status, setStatus] = useState("all");
  const [suspendTarget, setSuspendTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [actionError, setActionError] = useState("");

  const { data, isLoading, isError, error } = useUsers({
    page,
    perPage: PER_PAGE,
  });
  const suspendMutation = useSuspendUser();
  const restoreMutation = useRestoreUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const users = data?.users ?? [];

  const roleOptions = useMemo(() => {
    const set = new Set();
    users.forEach((user) => {
      (user.roles || []).forEach((item) => set.add(item));
    });
    return Array.from(set).sort();
  }, [users]);

  const institutionOptions = useMemo(() => {
    const map = new Map();
    users.forEach((user) => {
      (user.organizations || []).forEach((org) => {
        if (org?.id != null) {
          map.set(String(org.id), { id: org.id, name: org.name });
        }
      });
    });
    return Array.from(map.values()).sort((a, b) =>
      String(a.name).localeCompare(String(b.name))
    );
  }, [users]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        [user.name, user.email, user.phone_number, ...(user.roles || [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesRole =
        role === "all" || (user.roles || []).includes(role);

      const matchesInstitution =
        institution === "all" ||
        (user.organizations || []).some(
          (org) => String(org.id) === String(institution)
        );

      const matchesStatus = status === "all" || user.status === status;

      return matchesSearch && matchesRole && matchesInstitution && matchesStatus;
    });
  }, [users, search, role, institution, status]);

  const stats = useMemo(() => {
    const institutions = new Set();
    let suspendedCount = 0;
    let pendingCount = 0;

    users.forEach((user) => {
      if (user.status === "SUSPENDED") suspendedCount += 1;
      if (user.status === "PENDING_VERIFICATION") pendingCount += 1;
      (user.organizations || []).forEach((org) => {
        if (org?.id != null) institutions.add(org.id);
      });
    });

    return {
      totalUsers: data?.total ?? users.length,
      institutionsCount: institutions.size,
      suspendedCount,
      pendingCount,
    };
  }, [users, data?.total]);

  const busyUserId = suspendMutation.isPending
    ? suspendMutation.variables?.userId
    : restoreMutation.isPending
      ? restoreMutation.variables
      : updateMutation.isPending
        ? updateMutation.variables?.userId
        : deleteMutation.isPending
          ? deleteMutation.variables
          : null;

  const getErrorMessage = (err, fallback) =>
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    fallback;

  const handleSuspendConfirm = (reason) => {
    if (!suspendTarget) return;

    setActionError("");

    suspendMutation.mutate(
      { userId: suspendTarget.id, reason },
      {
        onSuccess: () => setSuspendTarget(null),
        onError: (err) =>
          setActionError(getErrorMessage(err, t("users.errors.suspendFailed"))),
      }
    );
  };

  const handleRestore = (userId) => {
    setActionError("");

    restoreMutation.mutate(userId, {
      onError: (err) =>
        setActionError(getErrorMessage(err, t("users.errors.restoreFailed"))),
    });
  };

  const handleUpdateConfirm = ({ full_name, phone_number }) => {
    if (!editTarget) return;

    setActionError("");

    updateMutation.mutate(
      {
        userId: editTarget.id,
        full_name,
        phone_number,
      },
      {
        onSuccess: () => setEditTarget(null),
        onError: (err) =>
          setActionError(getErrorMessage(err, t("users.errors.updateFailed"))),
      }
    );
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    setActionError("");

    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
      onError: (err) =>
        setActionError(getErrorMessage(err, t("users.errors.deleteFailed"))),
    });
  };

  return (
    <DashboardLayout
      showSearch
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder={t("layout.appbar.searchUsersPlaceholder")}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="text-start">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {t("users.title")}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {t("users.subtitle", { count: data?.total ?? 0 })}
          </p>
        </div>

        <UsersStatsCards
          totalUsers={stats.totalUsers}
          institutionsCount={stats.institutionsCount}
          suspendedCount={stats.suspendedCount}
          pendingCount={stats.pendingCount}
        />

        <UsersFilters
          role={role}
          institution={institution}
          status={status}
          roles={roleOptions}
          institutions={institutionOptions}
          onRoleChange={setRole}
          onInstitutionChange={setInstitution}
          onStatusChange={setStatus}
        />

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
              t("users.errors.loadFailed")}
          </div>
        ) : (
          <UsersTable
            users={filteredUsers}
            page={data?.page ?? page}
            pages={data?.pages ?? 1}
            total={data?.total ?? 0}
            shown={filteredUsers.length}
            onPageChange={setPage}
            actionUserId={busyUserId}
            onEdit={setEditTarget}
            onSuspend={setSuspendTarget}
            onRestore={handleRestore}
            onDelete={setDeleteTarget}
          />
        )}

        <p className="pb-2 text-center text-xs text-slate-400">
          {t("users.footer")}
        </p>
      </div>

      <SuspendModal
        key={`suspend-${suspendTarget?.id ?? "closed"}`}
        open={Boolean(suspendTarget)}
        userName={suspendTarget?.name || suspendTarget?.email || ""}
        isLoading={suspendMutation.isPending}
        onClose={() => setSuspendTarget(null)}
        onConfirm={handleSuspendConfirm}
      />

      <EditUserModal
        key={`edit-${editTarget?.id ?? "closed"}`}
        open={Boolean(editTarget)}
        user={editTarget}
        isLoading={updateMutation.isPending}
        onClose={() => setEditTarget(null)}
        onConfirm={handleUpdateConfirm}
      />

      <DeleteUserModal
        key={`delete-${deleteTarget?.id ?? "closed"}`}
        open={Boolean(deleteTarget)}
        userName={deleteTarget?.name || deleteTarget?.email || ""}
        isLoading={deleteMutation.isPending}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </DashboardLayout>
  );
}
