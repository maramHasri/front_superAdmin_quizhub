import { Input } from "@/components/ui/input";

export default function EmailInput() {
  return (
    <div className="space-y-2">
      <label
        htmlFor="email"
        className="text-sm font-medium text-slate-700"
      >
        Email
      </label>

      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
        className="h-12 rounded-xl"
      />
    </div>
  );
}