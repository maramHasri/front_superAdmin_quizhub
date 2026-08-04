import api from "@/lib/axios";

export const fetchUsers = async ({ page = 1, perPage = 20 } = {}) => {
  const { data } = await api.get("/api/super-admin/users", {
    params: {
      page,
      per_page: perPage,
    },
  });

  return data;
};

export const fetchUserById = async (userId) => {
  const { data } = await api.get(`/api/super-admin/users/${userId}`);
  return data;
};

export const suspendUserRequest = async ({ userId, reason }) => {
  const { data } = await api.patch(`/api/super-admin/users/${userId}/suspend`, {
    reason,
  });

  return data;
};

export const restoreUserRequest = async (userId) => {
  const { data } = await api.post(`/api/super-admin/users/${userId}/restore`);
  return data;
};

export const updateUserRequest = async ({ userId, full_name, phone_number }) => {
  const { data } = await api.patch(`/api/super-admin/users/${userId}`, {
    full_name,
    phone_number,
  });

  return data;
};

export const deleteUserRequest = async (userId) => {
  const { data } = await api.delete(`/api/super-admin/users/${userId}`);
  return data;
};
