import { useTranslation } from "react-i18next";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportsHeader({ onExport }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="text-start">
        <p className="text-sm font-medium text-brand">
          {t("reports.department")}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-800 dark:text-slate-100">
          {t("reports.title")}
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">
          {t("reports.subtitle")}
        </p>
      </div>

      <Button
        type="button"
        onClick={onExport}
        className="h-11 rounded-xl bg-brand px-5 text-white hover:bg-brand/90"
      >
        <FileDown className="size-4" />
        {t("reports.export")}
      </Button>
    </div>
  );
}
