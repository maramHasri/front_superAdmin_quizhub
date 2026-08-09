import { useQuery } from "@tanstack/react-query";
import { getInstitutionById } from "@/features/institutions/services/institutionsService";

export function useInstitutionDetails(institutionId) {
  return useQuery({
    queryKey: ["institutions", "details", institutionId],
    queryFn: () => getInstitutionById(institutionId),
    enabled: Boolean(institutionId),
  });
}
