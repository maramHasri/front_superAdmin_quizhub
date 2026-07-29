import { loginRequest } from "@/features/auth/api/authApi";

export const login = async (credentials) => {
  const data = await loginRequest(credentials);

  return {
    user: data.user ?? data.data?.user ?? null,
    token:
      data.access_token ??
      data.token ??
      data.accessToken ??
      data.data?.access_token ??
      data.data?.token ??
      null,
    refreshToken:
      data.refresh_token ??
      data.refreshToken ??
      data.data?.refresh_token ??
      null,
    tokenType: data.token_type ?? "Bearer",
    raw: data,
  };
};
