import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatRelativeTime } from "@/lib/display";

export default function UserRecentActivity({ user }) {
  const { t, i18n } = useTranslation();
  const activityAt = user?.last_activity_at || user?.last_login_at || user?.updated_at;

  return (
    <section className="rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex items-center gap-2 text-slate-700">
        <Clock className="size-4 text-brand" />
        <h2 className="text-sm font-semibold">
          {t("users.details.recentActivity")}
        </h2>
      </div>

      <div className="inline-flex items-center gap-2 rounded-xl bg-brand/10 px-4 py-3 text-sm font-medium text-brand">
        <Clock className="size-4" />
        <span>
          {t("users.details.lastActivity")}:{" "}
          {formatRelativeTime(activityAt, i18n.language)}
        </span>
      </div>
    </section>
  );
}
