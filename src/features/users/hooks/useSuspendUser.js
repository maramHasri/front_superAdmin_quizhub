import { useMutation, useQueryClient } from "@tanstack/react-query";
import { suspendUser } from "@/features/users/services/usersService";
import { usersKeys } from "@/features/users/hooks/useUsers";

export const useSuspendUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: suspendUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
};
