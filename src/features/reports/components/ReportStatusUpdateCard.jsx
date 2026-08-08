import { useEffect, useState } from "react";
import { ArrowLeftRight, Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const STATUS_OPTIONS = ["UNREAD", "IN_REVIEW", "REVIEWED", "REJECTED"];

export default function ReportStatusUpdateCard({
  status,
  isLoading = false,
  onUpdate,
}) {
  const { t } = useTranslation();
  const [selectedStatus, setSelectedStatus] = useState(status);

  useEffect(() => {
    setSelectedStatus(status);
  }, [status]);

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-950 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <ArrowLeftRight className="size-5" />
        </div>
        <div className="text-start">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
            {t("reports.details.updateTitle")}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {t("reports.details.updateSubtitle")}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
          className="h-11 min-w-[220px] flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 text-sm text-slate-700 dark:text-slate-200 outline-none focus:border-brand"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {t(`reports.status.${option}`)}
            </option>
          ))}
        </select>

        <Button
          type="button"
          disabled={isLoading || selectedStatus === status}
          onClick={() => onUpdate(selectedStatus)}
          className="h-11 rounded-xl bg-brand px-5 text-white hover:bg-brand/90"
        >
          <Save className="size-4" />
          {isLoading
            ? t("reports.details.updating")
            : t("reports.details.updateAction")}
        </Button>
      </div>
    </section>
  );
}
