import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");

  return (
    <div className="absolute end-6 top-6 flex items-center gap-2">
      <Button
        type="button"
        variant={isArabic ? "outline" : "default"}
        size="sm"
        onClick={() => i18n.changeLanguage("en")}
      >
        {t("common.english")}
      </Button>

      <Button
        type="button"
        variant={isArabic ? "default" : "outline"}
        size="sm"
        onClick={() => i18n.changeLanguage("ar")}
      >
        {t("common.arabic")}
      </Button>
    </div>
  );
}
