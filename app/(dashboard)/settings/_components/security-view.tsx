"use client";

import PolicyToggle from "./policy-toggle";
import { SecuritySettings } from "./types";

export default function SecurityView({
  security,
}: {
  security: SecuritySettings;
}) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-2xl font-black tracking-wide mb-2 mt-4 lg:mt-0">
        Trust Protocol
      </h2>
      <p className="text-sm text-neutral-500 dark:text-cyan-200 font-medium mb-10">
        Protect your points and settlement history.
      </p>

      <div className="space-y-4">
        <PolicyToggle
          title="Two-Factor Authentication (2FA)"
          desc="Required for all exchanges over 100,000 PTS."
          active={security.twoFA}
        />
        <PolicyToggle
          title="Withdrawal PIN"
          desc="Mandatory second-layer code for NGN bank transfers."
          active={security.withdrawalPin}
        />
        <PolicyToggle
          title="Real-time Login Alerts"
          desc="Instant email for every new protocol login."
          active={security.loginAlerts}
        />
      </div>

      <div className="mt-10 pt-10 border-t dark:border-neutral-900">
        <h3 className="text-sm font-black uppercase tracking-widest text-neutral-400 mb-4">
          Protocol Session Timeout
        </h3>

        <div className="flex gap-2">
          {["15m", "1h", "24h"].map((time) => (
            <button
              key={time}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                security.sessionTimeout === time
                  ? "bg-cyan-500 text-white"
                  : "bg-neutral-100 dark:bg-neutral-900"
              }`}
            >
              {time === "15m" ? "15 Minutes (Recommended)" : time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}