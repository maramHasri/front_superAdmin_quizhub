import { useQuery } from "@tanstack/react-query";
import { getPendingInstitutions } from "@/features/institutions/services/institutionsService";

export const institutionsKeys = {
  all: ["institutions"],
  pending: () => [...institutionsKeys.all, "pending"],
};

export const usePendingInstitutions = () => {
  return useQuery({
    queryKey: institutionsKeys.pending(),
    queryFn: getPendingInstitutions,
  });
};
