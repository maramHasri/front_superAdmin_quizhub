import { useTranslation } from "react-i18next";
import ReasonModal from "@/components/ReasonModal";

export default function RejectModal({
  open,
  institutionName,
  isLoading,
  onClose,
  onConfirm,
}) {
  const { t } = useTranslation();

  return (
    <ReasonModal
      open={open}
      title={t("institutions.reject.title")}
      subtitle={t("institutions.reject.subtitle", { name: institutionName })}
      reasonLabel={t("institutions.reject.reason")}
      placeholder={t("institutions.reject.placeholder")}
      reasonRequiredMessage={t("institutions.reject.reasonRequired")}
      confirmLabel={t("institutions.actions.reject")}
      loadingLabel={t("institutions.reject.rejecting")}
      isLoading={isLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
