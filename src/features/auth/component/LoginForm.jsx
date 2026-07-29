import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import EmailInput from "./EmailInput";
import PasswordInput from "./passwordInput";
import LoginOptions from "./LoginOptions";
import LoginButton from "./LoginButton";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useAuthStore } from "@/features/auth/store/authStore";

export default function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const rememberMe = useAuthStore((state) => state.rememberMe);
  const setRememberMe = useAuthStore((state) => state.setRememberMe);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const nextEmail = String(formData.get("email") || email || "").trim();
    const nextPassword = String(formData.get("password") || password || "");

    setEmail(nextEmail);
    setPassword(nextPassword);

    if (!nextEmail) {
      setError(t("auth.emailRequired"));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      setError(t("auth.invalidEmail"));
      return;
    }

    if (!nextPassword) {
      setError(t("auth.passwordRequired"));
      return;
    }

    loginMutation.mutate(
      { email: nextEmail, password: nextPassword },
      {
        onSuccess: () => {
          navigate("/home", { replace: true });
        },
        onError: (err) => {
          const apiMessage =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.response?.data?.detail;

          if (!err?.response) {
            setError(t("auth.networkError"));
            return;
          }

          setError(apiMessage || t("auth.loginFailed"));
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full items-center justify-center px-8 py-12 sm:px-12 lg:px-14"
    >
      <div className="w-full max-w-md space-y-5">
        <LoginHeader />

        <EmailInput value={email} onChange={setEmail} />

        <PasswordInput value={password} onChange={setPassword} />

        <LoginOptions
          rememberMe={rememberMe}
          onRememberMeChange={setRememberMe}
        />

        {error ? (
          <p className="text-start text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <LoginButton isLoading={loginMutation.isPending} />

        <p className="pt-2 text-center text-sm text-slate-500">
          {t("auth.newToPlatform")}{" "}
          <button
            type="button"
            className="font-semibold text-brand transition hover:text-brand-dark"
          >
            {t("auth.createAccount")}
          </button>
        </p>
      </div>
    </form>
  );
}
