import { useTranslation } from "react-i18next";
import StatusBadge from "@/components/StatusBadge";
import { formatDateTime, getInitials } from "@/lib/display";

export default function InstitutionDetailsHeader({ institution }) {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-wrap items-start justify-between gap-4 rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:bg-slate-950">
      <div className="flex items-center gap-4 text-start">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-lg font-bold text-brand">
          {getInitials(institution?.name)}
        </span>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {institution?.name || "—"}
            </h1>
            <StatusBadge
              status={institution?.status}
              label={t(`institutions.status.${institution?.status}`, {
                defaultValue: institution?.status,
              })}
            />
          </div>

          <p className="mt-2 text-sm text-slate-400">
            {t("institutions.details.id", { id: institution?.id })}
            <span className="mx-2">•</span>
            {t("institutions.details.createdAtLabel")}{" "}
            {formatDateTime(institution?.created_at, i18n.language)}
          </p>
        </div>
      </div>
    </div>
  );
}
