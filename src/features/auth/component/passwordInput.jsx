import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function PasswordInput({ value, onChange }) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2 text-start">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor="password" className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {t("auth.password")}
        </label>

        <button
          type="button"
          className="text-sm font-medium text-brand transition hover:text-brand-dark"
        >
          {t("auth.forgotPassword")}
        </button>
      </div>

      <div className="relative">
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={value}
          onValueChange={onChange}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t("auth.passwordPlaceholder")}
          className="h-12 rounded-xl border border-transparent bg-[#f3f4f6] px-4 pe-12 text-slate-700 shadow-none placeholder:text-slate-400 focus-visible:border-brand focus-visible:ring-brand/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:shadow-none dark:[-webkit-text-fill-color:#f1f5f9] dark:[&:-webkit-autofill]:border-slate-700 dark:[&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#1e293b] dark:[&:-webkit-autofill]:[-webkit-text-fill-color:#f1f5f9] dark:[&:-webkit-autofill]:[transition:background-color_99999s_ease-in-out_0s]"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute end-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
