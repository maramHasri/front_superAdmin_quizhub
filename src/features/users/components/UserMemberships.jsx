import { BookOpen, MoreVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import StatusBadge from "@/components/StatusBadge";
import { getInitials } from "@/lib/display";

// StatusBadge + getInitials reused across user list/details

export default function UserMemberships({ user, onAddMembership }) {
  const { t } = useTranslation();
  const rows = getMembershipRows(user);

  return (
    <section className="rounded-2xl bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-2 text-slate-700">
          <BookOpen className="size-4 text-brand" />
          <h2 className="text-sm font-semibold">
            {t("users.details.memberships")}
          </h2>
        </div>

        <button
          type="button"
          onClick={onAddMembership}
          className="text-sm font-medium text-brand transition hover:text-brand-dark"
        >
          {t("users.details.addMembership")}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-start text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400">
              <th className="px-5 py-3 font-medium">
                {t("users.details.institution")}
              </th>
              <th className="px-4 py-3 font-medium">
                {t("users.details.track")}
              </th>
              <th className="px-4 py-3 font-medium">
                {t("users.details.role")}
              </th>
              <th className="px-4 py-3 font-medium">
                {t("users.details.status")}
              </th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-slate-400"
                >
                  {t("users.details.noMemberships")}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-50 last:border-b-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                        {getInitials(row.institutionName)}
                      </span>
                      <span className="font-medium text-slate-800">
                        {row.institutionName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{row.track}</td>
                  <td className="px-4 py-4 text-slate-600">
                    {row.role === "—"
                      ? "—"
                      : t(`users.roles.${row.role}`, { defaultValue: row.role })}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge
                      status={row.status}
                      label={t(`users.membershipStatus.${row.status}`, {
                        defaultValue: t(`users.status.${row.status}`, {
                          defaultValue: row.status,
                        }),
                      })}
                    />
                  </td>
                  <td className="px-5 py-4 text-end">
                    <button
                      type="button"
                      className="inline-flex size-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      aria-label={t("users.actions.more")}
                    >
                      <MoreVertical className="size-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function getMembershipRows(user) {
  const memberships = user?.memberships;
  if (Array.isArray(memberships) && memberships.length > 0) {
    return memberships.map((item, index) => ({
      id: item.id ?? `membership-${index}`,
      institutionName:
        item.institution_name ||
        item.organization_name ||
        item.organization?.name ||
        item.name ||
        "—",
      track: item.track || item.path || item.program || "—",
      role: item.role || item.role_name || "—",
      status: item.status || "ACTIVE",
    }));
  }

  const organizations = user?.organizations || [];
  const fallbackRole = user?.roles?.[0] || "—";

  return organizations.map((org, index) => ({
    id: org.id ?? `organization-${index}`,
    institutionName: org.name || "—",
    track: "—",
    role: fallbackRole,
    status: org.status || "ACTIVE",
  }));
}
