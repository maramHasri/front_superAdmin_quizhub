import { Button } from "@/components/ui/button";

export default function LoginButton() {
  return (
    <Button
      type="submit"
      className="
        w-full
        h-12
        rounded-xl
        bg-cyan-600
        hover:bg-cyan-700
        text-white
        text-base
        font-semibold
        transition
      "
    >
      Log In
    </Button>
  );
}