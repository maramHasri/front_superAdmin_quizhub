import { Building2, Mail, Shield, User } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ReportReporterCard({ reporter }) {
  const { t } = useTranslation();

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-950 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h2 className="mb-4 text-start text-base font-bold text-slate-800 dark:text-slate-100">
        {t("reports.details.reporterTitle")}
      </h2>

      <div className="space-y-3">
        <InfoField
          label={t("reports.details.fullName")}
          value={reporter?.full_name}
          icon={User}
        />
        <InfoField
          label={t("reports.details.email")}
          value={reporter?.email}
          icon={Mail}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <InfoField
            label={t("reports.details.role")}
            value={
              reporter?.role
                ? t(`reports.roles.${reporter.role}`, {
                    defaultValue: reporter.role,
                  })
                : null
            }
            icon={Shield}
          />
          <InfoField
            label={t("reports.details.workspace")}
            value={reporter?.workspace_name}
            icon={Building2}
          />
        </div>
      </div>
    </section>
  );
}

function InfoField({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 px-3 py-3">
      <p className="mb-1.5 text-xs text-slate-400">{label}</p>
      <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        <Icon className="size-4 shrink-0 text-slate-400" />
        <span className="truncate">{value || "—"}</span>
      </div>
    </div>
  );
}
