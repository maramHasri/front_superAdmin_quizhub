import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserDetailsHeader from "@/features/users/components/UserDetailsHeader";
import UserPersonalInfo from "@/features/users/components/UserPersonalInfo";
import UserRecentActivity from "@/features/users/components/UserRecentActivity";
import UserMemberships from "@/features/users/components/UserMemberships";
import SuspendModal from "@/features/users/components/SuspendModal";
import EditUserModal from "@/features/users/components/EditUserModal";
import { useUserDetails } from "@/features/users/hooks/useUserDetails";
import { useSuspendUser } from "@/features/users/hooks/useSuspendUser";
import { useRestoreUser } from "@/features/users/hooks/useRestoreUser";
import { useUpdateUser } from "@/features/users/hooks/useUpdateUser";

export default function UserDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [actionError, setActionError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const { data: user, isLoading, isError, error } = useUserDetails(userId);
  const suspendMutation = useSuspendUser();
  const restoreMutation = useRestoreUser();
  const updateMutation = useUpdateUser();
  const isActionLoading =
    suspendMutation.isPending ||
    restoreMutation.isPending ||
    updateMutation.isPending;

  const getErrorMessage = (err, fallback) =>
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    fallback;

  const handleSuspendConfirm = (reason) => {
    setActionError("");
    setInfoMessage("");

    suspendMutation.mutate(
      { userId, reason },
      {
        onSuccess: () => setShowSuspendModal(false),
        onError: (err) =>
          setActionError(getErrorMessage(err, t("users.errors.suspendFailed"))),
      }
    );
  };

  const handleRestore = () => {
    setActionError("");
    setInfoMessage("");

    restoreMutation.mutate(userId, {
      onError: (err) =>
        setActionError(getErrorMessage(err, t("users.errors.restoreFailed"))),
    });
  };

  const handleUpdateConfirm = ({ full_name, phone_number }) => {
    setActionError("");
    setInfoMessage("");

    updateMutation.mutate(
      { userId, full_name, phone_number },
      {
        onSuccess: () => setShowEditModal(false),
        onError: (err) =>
          setActionError(getErrorMessage(err, t("users.errors.updateFailed"))),
      }
    );
  };

  return (
    <DashboardLayout variant="users">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <button
          type="button"
          onClick={() => navigate("/users")}
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-brand"
        >
          <ArrowRight className="size-4" />
          {t("users.details.backToUsers")}
        </button>

        {isLoading ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center text-slate-400 shadow-sm">
            {t("common.loading")}
          </div>
        ) : isError ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center text-red-500 shadow-sm">
            {error?.response?.data?.message ||
              error?.message ||
              t("users.errors.detailsFailed")}
          </div>
        ) : (
          <>
            <UserDetailsHeader
              user={user}
              isActionLoading={isActionLoading}
              onEdit={() => setShowEditModal(true)}
              onSuspend={() => setShowSuspendModal(true)}
              onRestore={handleRestore}
            />

            {actionError ? (
              <p className="text-sm text-red-600" role="alert">
                {actionError}
              </p>
            ) : null}

            {infoMessage ? (
              <p className="text-sm text-amber-600" role="status">
                {infoMessage}
              </p>
            ) : null}

            <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div className="space-y-6">
                <UserPersonalInfo user={user} />
                <UserRecentActivity user={user} />
              </div>

              <UserMemberships
                user={user}
                onAddMembership={() =>
                  setInfoMessage(t("users.comingSoon.addMembership"))
                }
              />
            </div>
          </>
        )}
      </div>

      <SuspendModal
        key={`details-suspend-${userId}`}
        open={showSuspendModal}
        userName={user?.name || user?.email || ""}
        isLoading={suspendMutation.isPending}
        onClose={() => setShowSuspendModal(false)}
        onConfirm={handleSuspendConfirm}
      />

      <EditUserModal
        key={`details-edit-${userId}-${user?.updated_at || ""}`}
        open={showEditModal}
        user={user}
        isLoading={updateMutation.isPending}
        onClose={() => setShowEditModal(false)}
        onConfirm={handleUpdateConfirm}
      />
    </DashboardLayout>
  );
}
