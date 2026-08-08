import { create } from "zustand";

const STORAGE_KEY = "superadmin-theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

export const useThemeStore = create((set, get) => ({
  theme: getInitialTheme(),
  initTheme: () => {
    applyTheme(get().theme);
  },
  setTheme: (theme) => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
    set({ theme });
  },
  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
  },
}));

applyTheme(getInitialTheme());
