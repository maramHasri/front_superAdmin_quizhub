import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import InstitutionFilterSelect from "@/features/users/components/InstitutionFilterSelect";
import UsersFilterSelect from "@/features/users/components/UsersFilterSelect";

const STATUS_OPTIONS = ["ACTIVE", "SUSPENDED", "PENDING_VERIFICATION"];

export default function UsersFilters({
  role,
  institution,
  status,
  roles = [],
  institutions = [],
  onRoleChange,
  onInstitutionChange,
  onStatusChange,
}) {
  const { t } = useTranslation();

  const roleOptions = useMemo(
    () =>
      roles.map((item) => ({
        value: item,
        label: t(`users.roles.${item}`, { defaultValue: item }),
      })),
    [roles, t]
  );

  const statusOptions = useMemo(
    () =>
      STATUS_OPTIONS.map((item) => ({
        value: item,
        label: t(`users.status.${item}`),
      })),
    [t]
  );

  return (
    <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:bg-slate-950 sm:grid-cols-3">
      <label className="relative z-10 space-y-1.5 text-start">
        <span className="text-xs font-medium text-slate-400">
          {t("users.filters.role")}
        </span>
        <UsersFilterSelect
          value={role}
          options={roleOptions}
          onChange={onRoleChange}
          allLabel={t("users.filters.allRoles")}
          emptyLabel={t("users.filters.noRoles")}
          pageSize={5}
        />
      </label>

      <label className="relative z-10 space-y-1.5 text-start">
        <span className="text-xs font-medium text-slate-400">
          {t("users.filters.status")}
        </span>
        <UsersFilterSelect
          value={status}
          options={statusOptions}
          onChange={onStatusChange}
          allLabel={t("users.filters.allStatuses")}
          emptyLabel={t("users.filters.noStatuses")}
          pageSize={5}
        />
      </label>

      <label className="relative z-20 space-y-1.5 text-start">
        <span className="text-xs font-medium text-slate-400">
          {t("users.filters.institution")}
        </span>
        <InstitutionFilterSelect
          value={institution}
          institutions={institutions}
          onChange={onInstitutionChange}
        />
      </label>
    </div>
  );
}
