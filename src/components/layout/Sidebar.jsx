import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Building2,
  BarChart3,
  Users,
  MessageSquareWarning,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/features/auth/store/authStore";

const navItems = [
  { key: "institutions", to: "/home", icon: Building2, end: true },
  { key: "analytics", to: "/analytics", icon: BarChart3 },
  { key: "users", to: "/users", icon: Users },
  { key: "reports", to: "/reports", icon: MessageSquareWarning },
];

export default function Sidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-s border-slate-200 dark:border-slate-700 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-2 px-6 py-6">
        <GraduationCap className="size-7 text-brand" strokeWidth={2.2} />
        <span className="text-xl font-bold tracking-tight text-brand">
          {t("auth.brand")}
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map(({ key, to, icon: Icon, disabled, end }) => (
          <NavLink
            key={key}
            to={disabled ? "#" : to}
            end={end}
            onClick={(event) => {
              if (disabled) event.preventDefault();
            }}
            className={({ isActive }) =>
              cn(
                "relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                disabled && "cursor-not-allowed opacity-50",
                isActive && !disabled
                  ? "bg-brand/10 text-brand"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && !disabled ? (
                  <span className="absolute start-0 top-2 bottom-2 w-1 rounded-full bg-brand" />
                ) : null}
                <Icon className="size-5 shrink-0" />
                <span>{t(`layout.sidebar.${key}`)}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-100 px-3 py-4 dark:border-slate-800">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/40"
        >
          <LogOut className="size-5" />
          <span>{t("layout.sidebar.logout")}</span>
        </button>
      </div>
    </aside>
  );
}
