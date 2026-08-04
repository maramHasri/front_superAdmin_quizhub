import { Ban, Pencil, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { getInitials } from "@/lib/display";

export default function UserDetailsHeader({
  user,
  onEdit,
  onSuspend,
  onRestore,
  isActionLoading = false,
}) {
  const { t } = useTranslation();
  const isSuspended = user?.status === "SUSPENDED";
  const primaryRole = user?.roles?.[0];

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-4 text-start">
        <div className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-brand text-2xl font-bold text-white">
          {getInitials(user?.name || user?.email, "U")}
          {!isSuspended ? (
            <span className="absolute -bottom-1 -end-1 flex size-5 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-[10px] text-white">
              ✓
            </span>
          ) : null}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {user?.name || "—"}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge
              status={user?.status}
              label={t(`users.status.${user?.status}`, {
                defaultValue: user?.status,
              })}
            />
            {primaryRole ? (
              <StatusBadge
                status={primaryRole}
                label={t(`users.roles.${primaryRole}`, {
                  defaultValue: primaryRole,
                })}
                className="bg-slate-100 text-slate-600"
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onEdit}
          className="h-10 rounded-xl"
        >
          <Pencil className="size-4" />
          {t("users.actions.editData")}
        </Button>

        {isSuspended ? (
          <Button
            type="button"
            disabled={isActionLoading}
            onClick={onRestore}
            className="h-10 rounded-xl bg-brand text-white hover:bg-brand-dark"
          >
            <RotateCcw className="size-4" />
            {t("users.actions.restore")}
          </Button>
        ) : (
          <Button
            type="button"
            disabled={isActionLoading}
            onClick={onSuspend}
            className="h-10 rounded-xl bg-red-500 text-white hover:bg-red-600"
          >
            <Ban className="size-4" />
            {t("users.actions.suspendUser")}
          </Button>
        )}
      </div>
    </div>
  );
}
