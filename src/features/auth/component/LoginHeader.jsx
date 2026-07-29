import { useTranslation } from "react-i18next";

export default function LoginHeader() {
  const { t } = useTranslation();

  return (
    <div className="mb-8 text-start">
      <h2 className="text-[1.75rem] font-bold leading-tight text-slate-800">
        {t("auth.title")}
      </h2>

      <p className="mt-3 text-sm leading-7 text-slate-400">
        {t("auth.subtitle")}
      </p>
    </div>
  );
}
