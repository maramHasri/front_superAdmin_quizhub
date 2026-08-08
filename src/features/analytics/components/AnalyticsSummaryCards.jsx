import {
  BookOpen,
  Building2,
  CheckSquare,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatCompactNumber, formatNumber } from "@/lib/display";

export default function AnalyticsSummaryCards({ data }) {
  const { t, i18n } = useTranslation();
  const users = data?.users ?? {};
  const organizations = data?.organizations ?? {};
  const content = data?.content ?? {};
  const tests = data?.tests ?? {};

  const cards = [
    {
      key: "users",
      value: formatNumber(users.total, i18n.language),
      badge: t("analytics.summary.usersBadge", {
        count: users.new_this_month ?? 0,
      }),
      icon: Users,
    },
    {
      key: "organizations",
      value: formatNumber(organizations.total, i18n.language),
      badge: t("analytics.summary.orgsBadge", {
        count: organizations.new_this_month ?? 0,
      }),
      icon: Building2,
    },
    {
      key: "content",
      value: formatNumber(
        (content.tests ?? 0) + (content.question_banks ?? 0),
        i18n.language
      ),
      badge: t("analytics.summary.contentBadge", {
        count: formatCompactNumber(content.questions ?? 0, i18n.language),
      }),
      icon: BookOpen,
    },
    {
      key: "attempts",
      value: formatCompactNumber(tests.total_attempts ?? 0, i18n.language),
      badge: t("analytics.summary.attemptsBadge", {
        score: tests.average_score ?? 0,
      }),
      icon: CheckSquare,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ key, value, badge, icon: Icon }) => (
        <div
          key={key}
          className="rounded-2xl bg-white dark:bg-slate-950 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
              {badge}
            </span>
            <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon className="size-5" />
            </div>
          </div>

          <p className="mt-5 text-3xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
          <p className="mt-1 text-sm text-slate-500">
            {t(`analytics.summary.${key}`)}
          </p>
        </div>
      ))}
    </div>
  );
}
