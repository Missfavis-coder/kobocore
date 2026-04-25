import { CheckCircle2 } from "lucide-react";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
      <CheckCircle2 size={40} className="mx-auto text-slate-200 mb-4" />
      <p className="text-slate-400 font-medium">{message}</p>
    </div>
  );
}