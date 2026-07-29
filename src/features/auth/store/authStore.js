import { create } from "zustand";
import { persist } from "zustand/middleware";

// Clear old persisted sessions that were keeping users on /home after refresh
try {
  localStorage.removeItem("auth-storage");
} catch {
  // ignore
}

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      rememberMe: false,

      setAuth: ({ user, token, refreshToken }) =>
        set({
          user,
          token,
          refreshToken: refreshToken ?? null,
        }),

      setRememberMe: (rememberMe) => set({ rememberMe }),

      logout: () =>
        set({
          user: null,
          token: null,
          refreshToken: null,
        }),
    }),
    {
      name: "auth-storage-v2",
      partialize: (state) => {
        // Always persist rememberMe preference only.
        // Persist login session only if rememberMe is enabled.
        if (state.rememberMe) {
          return {
            rememberMe: true,
            user: state.user,
            token: state.token,
            refreshToken: state.refreshToken,
          };
        }

        return {
          rememberMe: false,
        };
      },
    }
  )
);
