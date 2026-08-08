import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

export default function EmailInput({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-2 text-start">
      <label htmlFor="email" className="text-sm font-medium text-slate-600 dark:text-slate-300">
        {t("auth.email")}
      </label>

      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        value={value}
        onValueChange={onChange}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t("auth.emailPlaceholder")}
        className="h-12 rounded-xl border border-transparent bg-[#f3f4f6] px-4 text-slate-700 shadow-none placeholder:text-slate-400 focus-visible:border-brand focus-visible:ring-brand/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:shadow-none dark:[-webkit-text-fill-color:#f1f5f9] dark:[&:-webkit-autofill]:border-slate-700 dark:[&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#1e293b] dark:[&:-webkit-autofill]:[-webkit-text-fill-color:#f1f5f9] dark:[&:-webkit-autofill]:[transition:background-color_99999s_ease-in-out_0s]"
      />
    </div>
  );
}
