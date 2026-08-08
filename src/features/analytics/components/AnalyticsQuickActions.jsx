import { Building2, FileText, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AnalyticsQuickActions({ onComingSoon }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const actions = [
    {
      key: "addOrganization",
      icon: Building2,
      iconClass: "bg-brand/10 text-brand",
      onClick: () => navigate("/home"),
    },
    {
      key: "monitoring",
      icon: FileText,
      iconClass: "bg-violet-50 text-violet-600",
      onClick: () => onComingSoon?.(t("analytics.comingSoon.reports")),
    },
    {
      key: "invoices",
      icon: Receipt,
      iconClass: "bg-orange-50 text-orange-500",
      onClick: () => onComingSoon?.(t("analytics.comingSoon.invoices")),
    },
  ];

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-950 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <h2 className="mb-4 text-start text-lg font-bold text-slate-800 dark:text-slate-100">
        {t("analytics.quickActions.title")}
      </h2>

      <div className="space-y-3">
        {actions.map(({ key, icon: Icon, iconClass, onClick }) => (
          <button
            key={key}
            type="button"
            onClick={onClick}
            className="flex w-full items-center gap-3 rounded-xl border border-slate-100 dark:border-slate-800 px-4 py-3 text-start transition hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
            >
              <Icon className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
                {t(`analytics.quickActions.${key}`)}
              </span>
              <span className="mt-0.5 block text-xs text-slate-400">
                {t(`analytics.quickActions.${key}Sub`)}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
