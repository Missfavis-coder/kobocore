"use client";

import { Database } from "lucide-react";
import InputField from "./input-field";
import { DeveloperData } from "./types";
import { Input } from "@/components/ui/input";

export default function DeveloperView({ dev }: { dev: DeveloperData }) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-2xl font-black tracking-wide mb-10">
        Developer Interface
      </h2>

      <div className="space-y-8">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2 block">
            Live Production Key
          </label>

          <div className="flex gap-2">
            <Input
              type="password"
              readOnly
              value={dev.apiKey}
              className="flex-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl px-4 py-3 font-mono text-sm border dark:border-neutral-800"
            />
            <button className="px-4 bg-neutral-900 cursor-pointer dark:bg-white dark:text-black text-white rounded-xl text-xs font-bold">
              Copy
            </button>
          </div>
        </div>

        <InputField
          label="Webhook Endpoint URL"
          value={dev.webhookUrl}
          placeholder="https://..."
        />

        <div className="p-6 rounded-2xl border-2 border-dashed border-neutral-100 dark:border-neutral-900">
          <div className="flex items-center gap-3 text-neutral-400">
            <Database size={20} />
            <p className="text-xs font-medium">
              Connect KoboCore to your custom storefront or internal ERP.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}