import { Checkbox } from "@/components/ui/checkbox";

export default function LoginOptions() {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-2">
        <Checkbox id="remember" />

        <label
          htmlFor="remember"
          className="text-sm text-slate-600 cursor-pointer"
        >
          Remember me
        </label>
      </div>


      <button
        type="button"
        className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
      >
        Forgot Password?
      </button>

    </div>
  );
}