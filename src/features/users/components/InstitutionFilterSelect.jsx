import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import UsersFilterSelect from "@/features/users/components/UsersFilterSelect";

const PAGE_SIZE = 5;

export default function InstitutionFilterSelect({
  value = "all",
  institutions = [],
  onChange,
}) {
  const { t } = useTranslation();

  const options = useMemo(
    () =>
      institutions.map((item) => ({
        value: String(item.id),
        label: item.name,
      })),
    [institutions]
  );

  return (
    <UsersFilterSelect
      value={value}
      options={options}
      onChange={onChange}
      allLabel={t("users.filters.allInstitutions")}
      emptyLabel={t("users.filters.noInstitutions")}
      pageSize={PAGE_SIZE}
    />
  );
}
