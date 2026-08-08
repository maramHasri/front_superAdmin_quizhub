import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export default function Pagination({
  page = 1,
  pages = 1,
  onPageChange,
  summary,
  size = "md",
  className,
  controlsClassName,
}) {
  const { t } = useTranslation();
  const totalPages = Math.max(1, pages);
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const isSmall = size === "sm";
  const buttonSize = isSmall ? "size-7 text-[11px]" : "size-8 text-sm";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3",
        className
      )}
    >
      {summary ? (
        <div
          className={cn(
            "text-slate-400",
            isSmall ? "text-[11px]" : "text-sm"
          )}
        >
          {summary}
        </div>
      ) : (
        <div />
      )}

      <div className={cn("flex items-center gap-1.5", controlsClassName)}>
        <PaginationArrow
          label={t("common.pagination.prev")}
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          className={buttonSize}
        >
          <ChevronRight className={cn(isSmall ? "size-3.5" : "size-4", "rtl:hidden")} />
          <ChevronLeft className={cn(isSmall ? "size-3.5" : "size-4", "hidden rtl:block")} />
        </PaginationArrow>

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange?.(pageNumber)}
              className={cn(
                "inline-flex items-center justify-center rounded-lg border font-medium transition",
                buttonSize,
                pageNumber === currentPage
                  ? "border-brand bg-brand text-white"
                  : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-900"
              )}
            >
              {pageNumber}
            </button>
          );
        })}

        <PaginationArrow
          label={t("common.pagination.next")}
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          className={buttonSize}
        >
          <ChevronLeft className={cn(isSmall ? "size-3.5" : "size-4", "rtl:hidden")} />
          <ChevronRight className={cn(isSmall ? "size-3.5" : "size-4", "hidden rtl:block")} />
        </PaginationArrow>
      </div>
    </div>
  );
}

function PaginationArrow({ children, label, disabled, onClick, className }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-900",
        className
      )}
    >
      {children}
    </button>
  );
}
