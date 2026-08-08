import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import Pagination from "@/components/Pagination";

export default function UsersFilterSelect({
  value = "all",
  options = [],
  onChange,
  allLabel,
  emptyLabel,
  pageSize = 5,
  allValue = "all",
}) {
  const { t } = useTranslation();
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(options.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return options.slice(start, start + pageSize);
  }, [options, currentPage, pageSize]);

  const selectedLabel =
    value === allValue
      ? allLabel
      : options.find((item) => String(item.value) === String(value))?.label ||
        allLabel;

  useEffect(() => {
    if (!open) return undefined;

    const handleClickOutside = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    setPage(1);
  }, [options.length, pageSize]);

  const handleSelect = (nextValue) => {
    onChange?.(nextValue);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="truncate text-start">{selectedLabel}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-slate-400 transition",
            open && "rotate-180"
          )}
        />
      </button>

      {open ? (
        <div className="absolute start-0 end-0 top-[calc(100%+0.35rem)] z-30 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-950">
          <ul className="max-h-64 overflow-y-auto py-1" role="listbox">
            <li>
              <button
                type="button"
                onClick={() => handleSelect(allValue)}
                className={cn(
                  "flex w-full px-3 py-2.5 text-start text-sm transition hover:bg-slate-50 dark:hover:bg-slate-900",
                  value === allValue
                    ? "bg-brand/10 font-medium text-brand"
                    : "text-slate-700 dark:text-slate-200"
                )}
              >
                {allLabel}
              </button>
            </li>

            {pageItems.map((item) => {
              const itemValue = String(item.value);
              const isActive = String(value) === itemValue;

              return (
                <li key={itemValue}>
                  <button
                    type="button"
                    onClick={() => handleSelect(itemValue)}
                    className={cn(
                      "flex w-full px-3 py-2.5 text-start text-sm transition hover:bg-slate-50 dark:hover:bg-slate-900",
                      isActive
                        ? "bg-brand/10 font-medium text-brand"
                        : "text-slate-700 dark:text-slate-200"
                    )}
                  >
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}

            {options.length === 0 ? (
              <li className="px-3 py-3 text-sm text-slate-400">
                {emptyLabel}
              </li>
            ) : null}
          </ul>

          {options.length > pageSize ? (
            <Pagination
              page={currentPage}
              pages={totalPages}
              onPageChange={setPage}
              size="sm"
              className="border-t border-slate-100 px-3 py-2 dark:border-slate-800"
              summary={t("users.filters.optionsPage", {
                page: currentPage,
                pages: totalPages,
              })}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
