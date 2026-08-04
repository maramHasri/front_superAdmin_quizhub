import { useTranslation } from "react-i18next";
import ReasonModal from "@/components/ReasonModal";

export default function SuspendModal({
  open,
  userName,
  isLoading,
  onClose,
  onConfirm,
}) {
  const { t } = useTranslation();

  return (
    <ReasonModal
      open={open}
      title={t("users.suspend.title")}
      subtitle={t("users.suspend.subtitle", { name: userName })}
      reasonLabel={t("users.suspend.reason")}
      placeholder={t("users.suspend.placeholder")}
      reasonRequiredMessage={t("users.suspend.reasonRequired")}
      confirmLabel={t("users.actions.suspend")}
      loadingLabel={t("users.suspend.suspending")}
      isLoading={isLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
