import { Building2, Mail, Phone, User } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function InstitutionInfoCard({ institution }) {
  const { t } = useTranslation();

  const fields = [
    {
      key: "type",
      label: t("institutions.details.type"),
      value: t(`institutions.types.${getTypeKey(institution?.type)}`, {
        defaultValue: institution?.type,
      }),
      icon: Building2,
    },
    {
      key: "owner",
      label: t("institutions.details.owner"),
      value: institution?.owner?.full_name,
      icon: User,
    },
    {
      key: "email",
      label: t("institutions.details.email"),
      value: institution?.owner?.email,
      icon: Mail,
    },
    {
      key: "phone",
      label: t("institutions.details.phone"),
      value: institution?.owner?.phone_number,
      icon: Phone,
    },
  ];

  return (
    <section className="rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:bg-slate-950">
      <h2 className="mb-4 text-start text-base font-bold text-slate-800 dark:text-slate-100">
        {t("institutions.details.infoTitle")}
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map(({ key, label, value, icon: Icon }) => (
          <div
            key={key}
            className="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-3 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <p className="mb-1.5 text-xs text-slate-400">{label}</p>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <Icon className="size-4 shrink-0 text-slate-400" />
              <span className="truncate">{value || "—"}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function getTypeKey(type) {
  if (type === "PERSONAL" || type === "INDIVIDUAL" || type === "individual") {
    return "individual";
  }
  return "company";
}
