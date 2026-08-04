import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/features/users/services/usersService";
import { usersKeys } from "@/features/users/hooks/useUsers";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
};
