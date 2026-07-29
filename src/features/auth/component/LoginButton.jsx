import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function LoginButton({ isLoading = false }) {
  const { t } = useTranslation();

  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="h-12 w-full rounded-xl bg-brand text-base font-semibold text-white shadow-none transition hover:bg-brand-dark"
    >
      {isLoading ? t("auth.loggingIn") : t("auth.login")}
    </Button>
  );
}
