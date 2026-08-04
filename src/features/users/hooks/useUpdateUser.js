import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/features/users/services/usersService";
import { usersKeys } from "@/features/users/hooks/useUsers";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
      if (variables?.userId != null) {
        queryClient.invalidateQueries({
          queryKey: usersKeys.detail(variables.userId),
        });
      }
    },
  });
};
