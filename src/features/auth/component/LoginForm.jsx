import LoginHeader from "./LoginHeader";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import LoginOptions from "./LoginOptions";
import LoginButton from "./LoginButton";

export default function LoginForm() {
  return (
    <form
      className="
        flex
        h-full
        items-center
        justify-center
        px-16
      "
    >

      <div className="w-full max-w-md space-y-6">

        <LoginHeader />

        <EmailInput />

        <PasswordInput />

        <LoginOptions />

        <LoginButton />

      </div>

    </form>
  );
}