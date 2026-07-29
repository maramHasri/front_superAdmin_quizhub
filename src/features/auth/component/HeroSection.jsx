import { useTranslation } from "react-i18next";
import heroImage from "@/assets/login-hero.png";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <div className="relative hidden min-h-[640px] overflow-hidden lg:block" dir="rtl">
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/40" />

      <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
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

        <div className="flex items-center gap-3 pb-4">
          <div className="flex -space-x-2 space-x-reverse">
            <span className="inline-flex size-9 items-center justify-center rounded-full border-2 border-white bg-teal-500 text-xs font-semibold">
              م
            </span>
            <span className="inline-flex size-9 items-center justify-center rounded-full border-2 border-white bg-sky-500 text-xs font-semibold">
              س
            </span>
            <span className="inline-flex size-9 items-center justify-center rounded-full border-2 border-white bg-amber-500 text-xs font-semibold">
              أ
            </span>
          </div>

          <p className="text-sm font-medium text-white/95">
            {t("auth.heroLearners")}
          </p>
        </div>
      </div>
    </div>
  );
}
