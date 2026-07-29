import { useTranslation } from "react-i18next";

export default function LoginOptions({ rememberMe, onRememberMeChange }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-start gap-3">
      <button
        id="remember"
        type="button"
        role="switch"
        aria-checked={rememberMe}
        onClick={() => onRememberMeChange(!rememberMe)}
        className={`relative h-6 w-11 rounded-full transition ${
          rememberMe ? "bg-brand" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition ${
            rememberMe ? "start-5" : "start-0.5"
          }`}
        />
      </button>

      <label
        htmlFor="remember"
        className="cursor-pointer text-sm text-slate-600"
        onClick={() => onRememberMeChange(!rememberMe)}
      >
        {t("auth.rememberMe")}
      </label>
    </div>
  );
}
