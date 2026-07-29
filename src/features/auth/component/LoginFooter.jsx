import { useTranslation } from "react-i18next";

export default function LoginFooter() {
  const { t } = useTranslation();

  const links = [
    t("auth.footerSupport"),
    t("auth.footerCookies"),
    t("auth.footerTerms"),
    t("auth.footerPrivacy"),
  ];

  return (
    <footer className="mt-8 flex flex-col items-start justify-between gap-4 px-1 text-xs text-slate-400 sm:flex-row sm:items-center">
      <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {links.map((label) => (
          <button
            key={label}
            type="button"
            className="transition hover:text-slate-600"
          >
            {label}
          </button>
        ))}
      </nav>

      <p>{t("auth.footerCopyright")}</p>
    </footer>
  );
}
