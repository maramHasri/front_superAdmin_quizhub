import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "@/lib/display";

export default function UserPersonalInfo({ user }) {
  const { t, i18n } = useTranslation();

  const fields = [
    {
      key: "email",
      label: t("users.details.email"),
      value: user?.email || "—",
    },
    {
      key: "phone",
      label: t("users.details.phone"),
      value: user?.phone_number || user?.mobile || "—",
    },
    {
      key: "joined",
      label: t("users.details.joinedAt"),
      value: formatDateTime(user?.created_at, i18n.language),
    },
  ];

  return (
    <section className="rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex items-center gap-2 text-slate-700">
        <Info className="size-4 text-brand" />
        <h2 className="text-sm font-semibold">
          {t("users.details.personalInfo")}
        </h2>
      </div>

      <div className="space-y-4 text-start">
        {fields.map((field) => (
          <div key={field.key}>
            <p className="text-xs text-slate-400">{field.label}</p>
            <p className="mt-1 text-sm font-medium text-slate-700">
              {field.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
