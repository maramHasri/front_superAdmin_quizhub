import api from "@/lib/axios";

export const loginRequest = async ({ email, password }) => {
  const { data } = await api.post("/auth/superadmin/login", {
    email,
    password,
  });

  return data;
};
