import {
  deleteUserRequest,
  fetchUserById,
  fetchUsers,
  restoreUserRequest,
  suspendUserRequest,
  updateUserRequest,
} from "@/features/users/api/usersApi";

export const getUsers = async ({ page = 1, perPage = 20 } = {}) => {
  const data = await fetchUsers({ page, perPage });

  return {
    users: data.data ?? [],
    page: data.page ?? page,
    pages: data.pages ?? 1,
    perPage: data.per_page ?? perPage,
    total: data.total ?? data.data?.length ?? 0,
  };
};

export const getUserDetails = async (userId) => {
  return fetchUserById(userId);
};

export const suspendUser = async ({ userId, reason }) => {
  return suspendUserRequest({ userId, reason });
};

export const restoreUser = async (userId) => {
  return restoreUserRequest(userId);
};

export const updateUser = async ({ userId, full_name, phone_number }) => {
  return updateUserRequest({ userId, full_name, phone_number });
};

export const deleteUser = async (userId) => {
  return deleteUserRequest(userId);
};
