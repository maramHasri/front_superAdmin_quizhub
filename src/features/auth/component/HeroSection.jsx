import { useTranslation } from "react-i18next";
import heroImage from "@/assets/login-hero.png";

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");

  return (
    <div
      className="relative hidden min-h-[640px] overflow-hidden lg:block"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/40" />

      <div className="relative z-10 flex h-full flex-col p-10 text-white">
        <div className="max-w-sm pt-6 text-start">
          <h2 className="text-3xl font-bold leading-snug xl:text-[2.1rem]">
            {t("auth.heroTitle")}{" "}
            <span className="relative inline-block pb-1">
              {t("auth.heroTitleAccent")}
              <svg
                className="absolute -bottom-1 start-0 w-full"
                viewBox="0 0 120 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8C24 2 48 2 70 6C88 9 104 4 118 7"
                  stroke="#F5C542"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}
