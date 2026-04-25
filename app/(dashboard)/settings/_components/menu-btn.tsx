"use client";
import { ChevronRight } from "lucide-react";

export default function MenuBtn({ icon, title, sub, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex justify-between items-center p-4 rounded-2xl transition-all ${
        active
          ? "bg-white dark:bg-neutral-800 dark:shadow-md translate-x-2"
          : "hover:bg-neutral-100 dark:hover:bg-neutral-800/40"
      }`}
    >
      <div className="flex gap-4 items-center">
        <div className={active ? "text-cyan-500" : "text-neutral-400"}>
          {icon}
        </div>
        <div className="text-left">
          <p className="text-sm font-black tracking-tight">{title}</p>
          <p className="text-[10px] font-medium text-neutral-400">{sub}</p>
        </div>
      </div>
      {active && <ChevronRight size={14} className="text-cyan-500" />}
    </button>
  );
}