import {
  Users,
  Building2,
  Ban,
  ClipboardCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatNumber } from "@/lib/display";

export default function UsersStatsCards({
  totalUsers = 0,
  institutionsCount = 0,
  suspendedCount = 0,
  pendingCount = 0,
}) {
  const { t, i18n } = useTranslation();

  const cards = [
    {
      key: "totalUsers",
      value: formatNumber(totalUsers, i18n.language),
      icon: Users,
      iconClass: "bg-brand/10 text-brand",
    },
    {
      key: "institutions",
      value: formatNumber(institutionsCount, i18n.language),
      icon: Building2,
      iconClass: "bg-brand/10 text-brand",
    },
    {
      key: "suspended",
      value: formatNumber(suspendedCount, i18n.language),
      icon: Ban,
      iconClass: "bg-red-50 text-red-500 dark:bg-red-950/40",
    },
    {
      key: "pending",
      value: formatNumber(pendingCount, i18n.language),
      icon: ClipboardCheck,
      iconClass: "bg-brand/10 text-brand",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ key, value, icon: Icon, iconClass }) => (
        <div
          key={key}
          className="flex items-center justify-between rounded-2xl bg-white px-5 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:bg-slate-950"
        >
          <div>
            <p className="text-sm text-slate-500">{t(`users.stats.${key}`)}</p>
            <p className="mt-2 text-3xl font-bold text-slate-800 dark:text-slate-100">
              {value}
            </p>
          </div>

          <div
            className={`flex size-12 items-center justify-center rounded-full ${iconClass}`}
          >
            <Icon className="size-6" />
          </div>
        </div>
      ))}
    </div>
  );
}
