import { useTranslation } from "react-i18next";

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

  const selectClass =
    "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:grid-cols-3">
      <label className="space-y-1.5 text-start">
        <span className="text-xs font-medium text-slate-400">
          {t("users.filters.role")}
        </span>
        <select
          value={role}
          onChange={(event) => onRoleChange(event.target.value)}
          className={selectClass}
        >
          <option value="all">{t("users.filters.allRoles")}</option>
          {roles.map((item) => (
            <option key={item} value={item}>
              {t(`users.roles.${item}`, { defaultValue: item })}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-1.5 text-start">
        <span className="text-xs font-medium text-slate-400">
          {t("users.filters.institution")}
        </span>
        <select
          value={institution}
          onChange={(event) => onInstitutionChange(event.target.value)}
          className={selectClass}
        >
          <option value="all">{t("users.filters.allInstitutions")}</option>
          {institutions.map((item) => (
            <option key={item.id} value={String(item.id)}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-1.5 text-start">
        <span className="text-xs font-medium text-slate-400">
          {t("users.filters.status")}
        </span>
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className={selectClass}
        >
          <option value="all">{t("users.filters.allStatuses")}</option>
          <option value="ACTIVE">{t("users.status.ACTIVE")}</option>
          <option value="SUSPENDED">{t("users.status.SUSPENDED")}</option>
          <option value="PENDING_VERIFICATION">
            {t("users.status.PENDING_VERIFICATION")}
          </option>
        </select>
      </label>
    </div>
  );
}
