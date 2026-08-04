import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectInstitution } from "@/features/institutions/services/institutionsService";
import { institutionsKeys } from "@/features/institutions/hooks/usePendingInstitutions";

export const useRejectInstitution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectInstitution,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: institutionsKeys.pending() });
    },
  });
};
