export function getInitials(value, fallback = "U") {
  return (
    String(value || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || fallback
  );
}

export function formatDateTime(value, language = "ar") {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat(language.startsWith("ar") ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatDateTimeDetailed(value, language = "ar") {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat(language.startsWith("ar") ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatShortDate(value, language = "ar") {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat(language.startsWith("ar") ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function formatRelativeTime(value, language = "ar") {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  const diffMs = date.getTime() - Date.now();
  const absMs = Math.abs(diffMs);
  const rtf = new Intl.RelativeTimeFormat(
    language.startsWith("ar") ? "ar" : "en",
    { numeric: "auto" }
  );

  const units = [
    ["year", 1000 * 60 * 60 * 24 * 365],
    ["month", 1000 * 60 * 60 * 24 * 30],
    ["day", 1000 * 60 * 60 * 24],
    ["hour", 1000 * 60 * 60],
    ["minute", 1000 * 60],
  ];

  for (const [unit, ms] of units) {
    if (absMs >= ms) {
      return rtf.format(Math.round(diffMs / ms), unit);
    }
  }

  return rtf.format(Math.round(diffMs / 1000), "second");
}

export function formatNumber(value, language = "en") {
  return new Intl.NumberFormat(language.startsWith("ar") ? "ar-EG" : "en-US").format(
    Number(value) || 0
  );
}

export function formatCompactNumber(value, language = "en") {
  const num = Number(value) || 0;

  return new Intl.NumberFormat(language.startsWith("ar") ? "ar-EG" : "en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}

export function formatMonthLabel(monthValue, language = "ar") {
  if (!monthValue) return "—";

  const date = new Date(`${monthValue}-01T00:00:00`);
  if (Number.isNaN(date.getTime())) return String(monthValue);

  return new Intl.DateTimeFormat(language.startsWith("ar") ? "ar-EG" : "en-US", {
    month: "short",
  }).format(date);
}

export function formatCreationDateParts(value, language = "ar") {
  if (!value) return { day: "—", monthYear: "" };

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { day: String(value), monthYear: "" };
  }

  const locale = language.startsWith("ar") ? "ar-EG" : "en-GB";

  return {
    day: new Intl.DateTimeFormat(locale, { day: "numeric" }).format(date),
    monthYear: new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    }).format(date),
  };
}

