import { Ban, Pencil, RotateCcw, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import Pagination from "@/components/Pagination";
import { getInitials } from "@/lib/display";

export default function UsersTable({
  users = [],
  page = 1,
  pages = 1,
  total = 0,
  shown = 0,
  onPageChange,
  actionUserId,
  onEdit,
  onSuspend,
  onRestore,
  onDelete,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-950 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-start text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400">
              <th className="px-6 py-4 font-medium">
                {t("users.columns.name")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("users.columns.email")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("users.columns.mobile")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("users.columns.status")}
              </th>
              <th className="px-6 py-4 font-medium">
                {t("users.columns.actions")}
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-16 text-center text-slate-400"
                >
                  {t("users.empty")}
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const isBusy = actionUserId === user.id;
                const isSuspended = user.status === "SUSPENDED";

                return (
                  <tr
                    key={user.id}
                    onClick={() => navigate(`/users/${user.id}`)}
                    className="cursor-pointer border-b border-slate-50 dark:border-slate-800 transition hover:bg-slate-50/80 dark:hover:bg-slate-900/60 last:border-b-0"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          {getInitials(user.name || user.email)}
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-100">
                          {user.name || "-"}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{user.email}</td>

                    <td className="px-4 py-4 text-slate-500">
                      {user.phone_number || user.mobile || "—"}
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge
                        status={user.status}
                        label={t(`users.status.${user.status}`, {
                          defaultValue: user.status,
                        })}
                      />
                    </td>

                    <td
                      className="px-6 py-4"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="flex items-center gap-2">
                        <ActionIconButton
                          label={t("users.actions.edit")}
                          disabled={isBusy}
                          onClick={() => onEdit(user)}
                        >
                          <Pencil className="size-4" />
                        </ActionIconButton>

                        {isSuspended ? (
                          <ActionIconButton
                            label={t("users.actions.restore")}
                            disabled={isBusy}
                            onClick={() => onRestore(user.id)}
                            className="text-brand hover:bg-brand/10"
                          >
                            <RotateCcw className="size-4" />
                          </ActionIconButton>
                        ) : (
                          <ActionIconButton
                            label={t("users.actions.suspend")}
                            disabled={isBusy}
                            onClick={() => onSuspend(user)}
                            className="text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Ban className="size-4" />
                          </ActionIconButton>
                        )}

                        <ActionIconButton
                          label={t("users.actions.delete")}
                          disabled={isBusy}
                          onClick={() => onDelete(user)}
                          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                        >
                          <Trash2 className="size-4" />
                        </ActionIconButton>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        pages={pages}
        onPageChange={onPageChange}
        className="border-t border-slate-100 px-6 py-4 dark:border-slate-800"
        summary={t("users.pagination.summary", { shown, total })}
      />
    </section>
  );
}

function ActionIconButton({
  children,
  label,
  onClick,
  disabled,
  className,
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300",
        className
      )}
    >
      {children}
    </button>
  );
}
