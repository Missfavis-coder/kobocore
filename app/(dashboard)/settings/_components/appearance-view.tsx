"use client";

import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

interface AppearanceViewProps {
  theme: Theme;
  setTheme: (val: Theme) => void;
}

export default function AppearanceView({
  theme,
  setTheme,
}: AppearanceViewProps) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-2xl font-black tracking-wide mb-10">
        Interface Settings
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={[
            "p-6 rounded-3xl border-2 flex flex-col items-center gap-4 transition-all",
            theme === "light"
              ? "border-cyan-500 bg-cyan-500/5"
              : "border-neutral-100 dark:border-neutral-900",
          ].join(" ")}
        >
          <Sun className={theme === "light" ? "text-cyan-500" : ""} />
          <span className="text-xs font-black uppercase">
            Standard (Light)
          </span>
        </button>

        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={[
            "p-6 rounded-3xl border-2 flex flex-col items-center gap-4 transition-all",
            theme === "dark"
              ? "border-cyan-500 bg-cyan-500/5"
              : "border-neutral-100 dark:border-neutral-900",
          ].join(" ")}
        >
          <Moon className={theme === "dark" ? "text-cyan-500" : ""} />
          <span className="text-xs font-black uppercase">
            Stealth (Dark)
          </span>
        </button>
      </div>
    </div>
  );
}