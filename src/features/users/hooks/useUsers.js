import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "@/features/users/services/usersService";

export const usersKeys = {
  all: ["users"],
  list: (params) => [...usersKeys.all, "list", params],
  detail: (userId) => [...usersKeys.all, "detail", userId],
};

export const useUsers = ({ page = 1, perPage = 20 } = {}) => {
  return useQuery({
    queryKey: usersKeys.list({ page, perPage }),
    queryFn: () => getUsers({ page, perPage }),
    placeholderData: keepPreviousData,
  });
};
