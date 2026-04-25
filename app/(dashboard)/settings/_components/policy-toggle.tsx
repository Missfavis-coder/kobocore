"use client";

export default function PolicyToggle({ title, desc, active }: any) {
  return (
    <div className="p-5 rounded-2xl border dark:border-neutral-900 flex justify-between items-center bg-white dark:bg-transparent">
      <div>
        <p className="text-sm font-black tracking-wide">{title}</p>
        <p className="text-xs text-neutral-500 font-medium">{desc}</p>
      </div>
      <div
        className={`w-12 h-6 rounded-full relative transition-all ${
          active ? "bg-cyan-500" : "bg-neutral-200 dark:bg-neutral-800"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
            active ? "right-1" : "left-1"
          }`}
        />
      </div>
    </div>
  );
}