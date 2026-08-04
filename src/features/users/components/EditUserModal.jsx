import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditUserModal({
  open,
  user,
  isLoading = false,
  onClose,
  onConfirm,
}) {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !user) return;

    setFullName(user.name || user.full_name || "");
    setPhoneNumber(user.phone_number || user.mobile || "");
    setError("");
  }, [open, user]);

  if (!open) return null;

  const handleConfirm = () => {
    const nextName = fullName.trim();
    const nextPhone = phoneNumber.trim();

    if (!nextName) {
      setError(t("users.edit.nameRequired"));
      return;
    }

    onConfirm({
      full_name: nextName,
      phone_number: nextPhone || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <h3 className="text-lg font-bold text-slate-800">
          {t("users.edit.title")}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          {t("users.edit.subtitle", {
            name: user?.name || user?.email || "",
          })}
        </p>

        <div className="mt-4 space-y-4 text-start">
          <div className="space-y-2">
            <label
              htmlFor="edit-full-name"
              className="text-sm font-medium text-slate-600"
            >
              {t("users.edit.fullName")}
            </label>
            <Input
              id="edit-full-name"
              value={fullName}
              onValueChange={setFullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder={t("users.edit.fullNamePlaceholder")}
              className="h-11 rounded-xl border-slate-200 bg-slate-50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="edit-phone"
              className="text-sm font-medium text-slate-600"
            >
              {t("users.edit.phone")}
            </label>
            <Input
              id="edit-phone"
              value={phoneNumber}
              onValueChange={setPhoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder={t("users.edit.phonePlaceholder")}
              className="h-11 rounded-xl border-slate-200 bg-slate-50"
            />
          </div>

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
            onClick={onClose}
            disabled={isLoading}
            className="h-10 rounded-xl"
          >
            {t("common.cancel")}
          </Button>

          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className="h-10 rounded-xl bg-brand text-white hover:bg-brand-dark"
          >
            {isLoading ? t("users.edit.saving") : t("users.edit.save")}
          </Button>
        </div>
      </div>
    </div>
  );
}
