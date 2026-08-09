import { cn } from "@/lib/utils";

export default function InstitutionsTabs({ activeTab, onChange, tabs = [] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800">
      {tabs.map(({ key, label }) => {
        const isActive = activeTab === key;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={cn(
              "relative px-4 py-3 text-sm font-medium transition",
              isActive
                ? "text-brand"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            )}
          >
            {label}
            {isActive ? (
              <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
