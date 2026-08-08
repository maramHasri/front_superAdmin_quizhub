import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function BrandHeader() {
  const { t } = useTranslation();

  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-3 px-1">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-brand">
          {t("auth.brand")}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm font-medium text-slate-400">{t("auth.tagline")}</p>
        <LanguageSwitcher variant="inline" />
      </div>
    </header>
  );
}
