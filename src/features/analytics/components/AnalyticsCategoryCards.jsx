import {
  BookMarked,
  ClipboardList,
  Shield,
  GraduationCap,
  UsersRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatNumber } from "@/lib/display";

export default function AnalyticsCategoryCards({ data }) {
  const { t, i18n } = useTranslation();
  const users = data?.users ?? {};
  const content = data?.content ?? {};
  const organizations = data?.organizations ?? {};
  const totalUsers = users.total || 0;
  const studentsPercent =
    totalUsers > 0
      ? ((users.students ?? 0) / totalUsers) * 100
      : 0;

  const cards = [
    {
      key: "students",
      value: formatNumber(users.students ?? 0, i18n.language),
      subtitle: t("analytics.categories.studentsSub", {
        percent: studentsPercent.toFixed(1),
      }),
      icon: GraduationCap,
    },
    {
      key: "teachers",
      value: formatNumber(users.teachers ?? 0, i18n.language),
      subtitle: t("analytics.categories.teachersSub", {
        count: content.subjects ?? 0,
      }),
      icon: UsersRound,
    },
    {
      key: "admins",
      value: formatNumber(users.organization_admins ?? 0, i18n.language),
      subtitle: t("analytics.categories.adminsSub", {
        count: organizations.active ?? 0,
      }),
      icon: Shield,
    },
    {
      key: "tests",
      value: formatNumber(content.tests ?? 0, i18n.language),
      subtitle: t("analytics.categories.testsSub"),
      icon: ClipboardList,
    },
    {
      key: "banks",
      value: formatNumber(content.question_banks ?? 0, i18n.language),
      subtitle: t("analytics.categories.banksSub", {
        count: content.topics ?? 0,
      }),
      icon: BookMarked,
    },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-start text-lg font-bold text-slate-800 dark:text-slate-100">
        {t("analytics.categories.title")}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map(({ key, value, subtitle, icon: Icon }) => (
          <div
            key={key}
            className="rounded-2xl bg-white dark:bg-slate-950 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="size-5" />
              </div>
              <p className="pt-1 text-end text-sm text-slate-500">
                {t(`analytics.categories.${key}`)}
              </p>
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
            <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
