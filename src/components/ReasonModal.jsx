import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ReasonModal({
  open,
  title,
  subtitle,
  reasonLabel,
  placeholder,
  confirmLabel,
  loadingLabel,
  reasonRequiredMessage,
  isLoading = false,
  confirmClassName = "bg-red-500 text-white hover:bg-red-600",
  onClose,
  onConfirm,
}) {
  const { t } = useTranslation();
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleClose = () => {
    setReason("");
    setError("");
    onClose();
  };

  const handleConfirm = () => {
    const nextReason = reason.trim();

    if (!nextReason) {
      setError(reasonRequiredMessage || t("common.required"));
      return;
    }

    onConfirm(nextReason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        {subtitle ? (
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        ) : null}

        <div className="mt-4 space-y-2 text-start">
          <label
            htmlFor="reason-input"
            className="text-sm font-medium text-slate-600"
          >
            {reasonLabel}
          </label>

          <Input
            id="reason-input"
            value={reason}
            onValueChange={setReason}
            onChange={(event) => setReason(event.target.value)}
            placeholder={placeholder}
            className="h-11 rounded-xl border-slate-200 bg-slate-50"
          />

          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="h-10 rounded-xl"
          >
            {t("common.cancel")}
          </Button>

          <Button
            type="button"
            onClick={handleConfirm}
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
