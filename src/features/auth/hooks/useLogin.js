import { useMutation } from "@tanstack/react-query";
import { login } from "@/features/auth/services/authService";
import { useAuthStore } from "@/features/auth/store/authStore";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth({
        user: data.user,
        token: data.token,
        refreshToken: data.refreshToken,
      });
    },
  });
};
