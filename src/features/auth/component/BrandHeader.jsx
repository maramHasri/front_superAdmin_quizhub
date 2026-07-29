import { useTranslation } from "react-i18next";

export default function BrandHeader() {
  const { t, i18n } = useTranslation();

  return (
    <header className="mb-6 flex items-center justify-between px-1">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-brand">
          {t("auth.brand")}
        </h1>

        <button
          type="button"
          onClick={() =>
            i18n.changeLanguage(i18n.language?.startsWith("ar") ? "en" : "ar")
          }
          className="text-xs font-medium text-slate-400 transition hover:text-brand"
        >
          {i18n.language?.startsWith("ar") ? t("common.english") : t("common.arabic")}
        </button>
      </div>

      <p className="text-sm font-medium text-slate-400">{t("auth.tagline")}</p>
    </header>
  );
}
