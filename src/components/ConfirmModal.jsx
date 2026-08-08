import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function ConfirmModal({
  open,
  title,
  subtitle,
  confirmLabel,
  loadingLabel,
  isLoading = false,
  confirmClassName = "bg-red-500 text-white hover:bg-red-600",
  onClose,
  onConfirm,
}) {
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-950 p-6 shadow-xl"
      >
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h3>
        {subtitle ? (
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        ) : null}

        <div className="mt-6 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="h-10 rounded-xl"
          >
            {t("common.cancel")}
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`h-10 rounded-xl ${confirmClassName}`}
          >
            {isLoading ? loadingLabel : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
