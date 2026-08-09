import { useQuery } from "@tanstack/react-query";
import { getAllInstitutions } from "@/features/institutions/services/institutionsService";

export function useAllInstitutions() {
  return useQuery({
    queryKey: ["institutions", "all"],
    queryFn: getAllInstitutions,
  });
}
