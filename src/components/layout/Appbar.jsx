import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/features/auth/store/authStore";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

export default function Appbar({
  showSearch = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder,
}) {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const displayName = user?.full_name || user?.name || "Admin";
  const initials = getInitials(displayName || user?.email || "SA");

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950">
      {showSearch ? (
        <div className="relative min-w-[240px] flex-1 max-w-md">
          <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchValue}
            onValueChange={onSearchChange}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder={
              searchPlaceholder || t("layout.appbar.searchUsersPlaceholder")
            }
            className="h-10 rounded-full border-transparent bg-slate-100 ps-10 text-sm shadow-none placeholder:text-slate-400 focus-visible:border-brand focus-visible:ring-brand/20 dark:bg-slate-900"
          />
        </div>
      ) : (
        <div className="flex-1" />
      )}

      <div className="flex items-center gap-2 sm:gap-3">
        <LanguageSwitcher variant="appbar" />
        <ThemeToggle />

        <div className="flex items-center gap-3 ps-2">
          <div className="hidden text-end sm:block">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
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
