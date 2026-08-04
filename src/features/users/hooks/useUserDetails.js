import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "@/features/users/services/usersService";
import { usersKeys } from "@/features/users/hooks/useUsers";

export const useUserDetails = (userId) => {
  return useQuery({
    queryKey: usersKeys.detail(userId),
    queryFn: () => getUserDetails(userId),
    enabled: Boolean(userId),
  });
};
