"use client";
import { Input } from "@/components/ui/input";

export default function InputField({ label, ...props }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] focus:ring-1 focus:outline-none focus:ring-cyan-600 font-black uppercase tracking-[0.2em] text-neutral-400">
        {label}
      </label>
      <Input {...props} />
    </div>
  );
}