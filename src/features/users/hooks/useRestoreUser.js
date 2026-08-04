import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreUser } from "@/features/users/services/usersService";
import { usersKeys } from "@/features/users/hooks/useUsers";

export const useRestoreUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
};
