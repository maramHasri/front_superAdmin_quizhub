import { useTranslation } from "react-i18next";
import { Bell, Settings, Search, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/features/auth/store/authStore";

const tabs = [
  { key: "dashboard", disabled: true },
  { key: "accreditations", disabled: false },
  { key: "audit", disabled: true },
];

export default function Appbar({
  searchValue = "",
  onSearchChange,
  activeTab = "accreditations",
  variant = "default",
  searchPlaceholder,
}) {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const displayName = user?.full_name || user?.name || "Admin";
  const initials = getInitials(displayName || user?.email || "SA");
  const isUsersVariant = variant === "users";

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
      {isUsersVariant ? (
        <div className="relative min-w-[240px] flex-1 max-w-md">
          <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchValue}
            onValueChange={onSearchChange}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder={
              searchPlaceholder || t("layout.appbar.searchUsersPlaceholder")
            }
            className="h-10 rounded-full border-transparent bg-slate-100 ps-10 text-sm shadow-none placeholder:text-slate-400 focus-visible:border-brand focus-visible:ring-brand/20"
          />
        </div>
      ) : (
        <nav className="flex items-center gap-6">
          {tabs.map(({ key, disabled }) => {
            const isActive = activeTab === key;

            return (
              <button
                key={key}
                type="button"
                disabled={disabled}
                className={cn(
                  "relative pb-2 text-sm font-medium transition",
                  disabled && "cursor-not-allowed opacity-50",
                  isActive
                    ? "text-slate-800"
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {t(`layout.appbar.tabs.${key}`)}
                {isActive ? (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand" />
                ) : null}
              </button>
            );
          })}
        </nav>
      )}

      <div className="flex items-center gap-3">
        {!isUsersVariant ? (
          <div className="relative hidden min-w-[240px] md:block">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchValue}
              onValueChange={onSearchChange}
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder={
                searchPlaceholder || t("layout.appbar.searchPlaceholder")
              }
              className="h-10 rounded-full border-transparent bg-slate-100 ps-10 text-sm shadow-none placeholder:text-slate-400 focus-visible:border-brand focus-visible:ring-brand/20"
            />
          </div>
        ) : null}

        {isUsersVariant ? (
          <>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
              aria-label={t("layout.appbar.settings")}
            >
              <Globe className="size-5" />
            </button>

            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
              aria-label={t("layout.appbar.settings")}
            >
              <Settings className="size-5" />
            </button>

            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
              aria-label={t("layout.appbar.notifications")}
            >
              <Bell className="size-5" />
            </button>

            <div className="flex items-center gap-3 ps-2">
              <div className="hidden text-end sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  {displayName}
                </p>
                <p className="text-xs text-slate-400">
                  {t("layout.appbar.superAdmin")}
                </p>
              </div>

              <div className="flex size-10 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand">
                {initials}
              </div>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
              aria-label={t("layout.appbar.notifications")}
            >
              <Bell className="size-5" />
            </button>

            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
              aria-label={t("layout.appbar.settings")}
            >
              <Settings className="size-5" />
            </button>

            <div
              className="flex size-10 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand"
              title={displayName}
            >
              {initials}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

function getInitials(value) {
  return (
    String(value)
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || "SA"
  );
}
