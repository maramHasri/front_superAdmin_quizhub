import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveInstitution } from "@/features/institutions/services/institutionsService";
import { institutionsKeys } from "@/features/institutions/hooks/usePendingInstitutions";

export const useApproveInstitution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveInstitution,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: institutionsKeys.pending() });
    },
  });
};
