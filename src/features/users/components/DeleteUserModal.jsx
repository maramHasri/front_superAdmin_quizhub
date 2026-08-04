import { useTranslation } from "react-i18next";
import ConfirmModal from "@/components/ConfirmModal";

export default function DeleteUserModal({
  open,
  userName,
  isLoading,
  onClose,
  onConfirm,
}) {
  const { t } = useTranslation();

  return (
    <ConfirmModal
      open={open}
      title={t("users.delete.title")}
      subtitle={t("users.delete.subtitle", { name: userName })}
      confirmLabel={t("users.actions.delete")}
      loadingLabel={t("users.delete.deleting")}
      isLoading={isLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
