import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ variant = "sidebar" }) {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");

  const toggleLanguage = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  if (variant === "appbar") {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        aria-label={t("common.language")}
        title={t("common.language")}
      >
        <Languages className="size-5" />
        <span className="text-xs font-semibold">
          {isArabic ? t("common.english") : t("common.arabic")}
        </span>
      </button>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className="space-y-2 px-1">
        <p className="px-3 text-xs font-medium text-slate-400">
          {t("common.language")}
        </p>
        <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 p-1 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => i18n.changeLanguage("ar")}
            className={cn(
              "rounded-lg px-3 py-2 text-xs font-semibold transition",
              isArabic
                ? "bg-white text-brand shadow-sm dark:bg-slate-700"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
            )}
          >
            {t("common.arabic")}
          </button>
          <button
            type="button"
            onClick={() => i18n.changeLanguage("en")}
            className={cn(
              "rounded-lg px-3 py-2 text-xs font-semibold transition",
              !isArabic
                ? "bg-white text-brand shadow-sm dark:bg-slate-700"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
            )}
          >
            {t("common.english")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => i18n.changeLanguage("ar")}
        className={cn(
          "rounded-lg border px-3 py-1.5 text-xs font-medium transition",
          isArabic
            ? "border-brand bg-brand text-white"
            : "border-slate-200 bg-white text-slate-500 hover:border-brand/40 hover:text-brand dark:border-slate-700 dark:bg-slate-900"
        )}
      >
        {t("common.arabic")}
      </button>
      <button
        type="button"
        onClick={() => i18n.changeLanguage("en")}
        className={cn(
          "rounded-lg border px-3 py-1.5 text-xs font-medium transition",
          !isArabic
            ? "border-brand bg-brand text-white"
            : "border-slate-200 bg-white text-slate-500 hover:border-brand/40 hover:text-brand dark:border-slate-700 dark:bg-slate-900"
        )}
      >
        {t("common.english")}
      </button>
    </div>
  );
}
