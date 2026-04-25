"use client";

import { CheckCircle2, AlertOctagon } from "lucide-react";
import InputField from "./input-field";
import { AccountData } from "./types";

export default function AccountView({ account }: { account: AccountData }) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-2xl font-black tracking-wide">
            Identity Verification
          </h2>
          <p className="text-sm text-neutral-500 dark:text-cyan-200 font-medium">
            Manage your KoboCore settlement identity.
          </p>
        </div>

        {account.kycStatus === "VERIFIED" && (
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
            <CheckCircle2 size={14} /> VERIFIED
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <InputField label="Legal First Name" value={account.firstName} disabled />
          <InputField label="Legal Last Name" value={account.lastName} disabled />
        </div>

        <InputField label="Primary Settlement Email" value={account.email} />

        <div className="p-6 rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 flex gap-4">
          <AlertOctagon className="text-amber-600 shrink-0" />
          <div>
            <p className="text-xs font-bold text-amber-900 dark:text-amber-500">
              Legal Name Lock
            </p>
            <p className="text-xs text-amber-800/70 dark:text-amber-500/60 leading-relaxed mt-1">
              Your legal name is synced with your BVN/NIN. To change this, you must file a formal dispute with KoboCore Compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}