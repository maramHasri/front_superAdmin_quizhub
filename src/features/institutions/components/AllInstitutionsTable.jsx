import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Pagination from "@/components/Pagination";
import StatusBadge from "@/components/StatusBadge";
import { formatDateTime, formatNumber, getInitials } from "@/lib/display";

const PAGE_SIZE = 5;

export default function AllInstitutionsTable({
  institutions = [],
  searchValue = "",
}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return institutions;

    return institutions.filter((item) =>
      [
        item.name,
        item.owner?.full_name,
        item.owner?.email,
        item.type,
        item.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [institutions, searchValue]);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  return (
    <section className="rounded-2xl bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:bg-slate-950">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-5 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          {t("institutions.all.title")}
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-start text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 dark:border-slate-800">
              <th className="px-6 py-4 font-medium">
                {t("institutions.columns.name")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("institutions.columns.owner")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("institutions.columns.type")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("institutions.all.columns.users")}
              </th>
              <th className="px-4 py-4 font-medium">
                {t("institutions.all.columns.status")}
              </th>
              <th className="px-6 py-4 font-medium">
                {t("institutions.all.columns.createdAt")}
              </th>
            </tr>
          </thead>

          <tbody>
            {pageItems.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-16 text-center text-slate-400"
                >
                  {t("institutions.all.empty")}
                </td>
              </tr>
            ) : (
              pageItems.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => navigate(`/institutions/${item.id}`)}
                  className="cursor-pointer border-b border-slate-50 transition hover:bg-slate-50/80 last:border-b-0 dark:border-slate-800 dark:hover:bg-slate-900/60"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
                        {getInitials(item.name)}
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                    {item.owner?.full_name || "—"}
                  </td>

                  <td className="px-4 py-4">
                    <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600 dark:bg-violet-950/40 dark:text-violet-300">
                      {t(`institutions.types.${getTypeKey(item.type)}`, {
                        defaultValue: item.type,
                      })}
                    </span>
                  </td>

                  <td className="px-4 py-4 font-medium text-slate-600 dark:text-slate-300">
                    {formatNumber(item.users_count ?? 0, i18n.language)}
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge
                      status={item.status}
                      label={t(`institutions.status.${item.status}`, {
                        defaultValue: item.status,
                      })}
                    />
                  </td>

                  <td className="px-6 py-4 text-slate-500">
                    {formatDateTime(item.created_at, i18n.language)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={currentPage}
        pages={totalPages}
        onPageChange={setPage}
        className="border-t border-slate-100 px-6 py-4 dark:border-slate-800"
        summary={t("institutions.all.pagination.summary", {
          shown: pageItems.length,
          total: filtered.length,
        })}
      />
    </section>
  );
}

function getTypeKey(type) {
  if (type === "PERSONAL" || type === "INDIVIDUAL" || type === "individual") {
    return "individual";
  }
  return "company";
}
