import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatMonthLabel, formatNumber } from "@/lib/display";
import { cn } from "@/lib/utils";

export default function PlatformActivityChart({ activitySeries }) {
  const { t, i18n } = useTranslation();
  const attempts = activitySeries?.attempts ?? [];
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const maxCount = useMemo(
    () => Math.max(...attempts.map((item) => item.count || 0), 1),
    [attempts]
  );

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-950 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="mb-6 text-start">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          {t("analytics.activity.title")}
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          {t("analytics.activity.subtitle")}
        </p>
      </div>

      {attempts.length === 0 ? (
        <div className="flex h-56 items-center justify-center text-sm text-slate-400">
          {t("analytics.activity.empty")}
        </div>
      ) : (
        <div className="flex h-56 items-end gap-2 sm:gap-3">
          {attempts.map((item, index) => {
            const height = Math.max(((item.count || 0) / maxCount) * 100, 4);
            const isActive = hoveredIndex === index || item.count === maxCount;

            return (
              <div
                key={item.month}
                className="relative flex flex-1 flex-col items-center gap-2"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index ? (
                  <span className="absolute -top-8 rounded-lg bg-slate-800 px-2 py-1 text-xs text-white">
                    {formatNumber(item.count || 0, i18n.language)}
                  </span>
                ) : null}

                <div className="flex h-44 w-full items-end justify-center">
                  <div
                    className={cn(
                      "w-full max-w-8 rounded-t-lg transition",
                      isActive ? "bg-brand" : "bg-brand/30"
                    )}
                    style={{ height: `${height}%` }}
                  />
                </div>

                <span className="text-[10px] text-slate-400 sm:text-xs">
                  {formatMonthLabel(item.month, i18n.language)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
