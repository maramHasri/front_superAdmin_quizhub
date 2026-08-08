import { useTranslation } from "react-i18next";
import LoginForm from "../component/LoginForm";
import BrandHeader from "../component/BrandHeader";
import HeroSection from "../component/HeroSection";
import LoginFooter from "../component/LoginFooter";

export default function LoginPage() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f6f8] px-4 py-6 sm:px-8 lg:px-12 dark:bg-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
        <BrandHeader />

        <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:bg-slate-950 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          {/* Keep visual order: form left, hero right (matches design) */}
          <div className="grid min-h-[640px] grid-cols-1 lg:grid-cols-2" dir="ltr">
            <div dir={isArabic ? "rtl" : "ltr"}>
              <LoginForm />
            </div>
            <HeroSection />
          </div>
        </div>

        <LoginFooter />
      </div>
    </div>
  );
}
