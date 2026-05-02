"use client";

import { Shield, User, Fingerprint, Key, Sun } from "lucide-react";
import MenuBtn from "./menu-btn";

export default function SettingsSidebar({
  activeMenu,
  setActiveMenu,
  tier,
}: any) {
  return (
    <div className="lg:col-span-4 lg:p-6 p-5 border-r dark:border-neutral-800 dark:bg-neutral-50/50 bg-neutral-400/10 dark:bg-neutral-900/50">
      <div className="flex items-center gap-2 mb-6">
        <div className="lg:h-8 lg:w-8 h-7 w-7 bg-cyan-500 rounded-lg flex items-center justify-center">
          <Shield className="text-white" size={18} />
        </div>
        <h1 className="lg:text-xl font-black uppercase">
          Protocol Settings
        </h1>
      </div>

      <div className="bg-slate-600 dark:bg-cyan-500 p-6 rounded-md text-white mb-8">
        <h2 className="lg:text-2xl text-xl font-black">Tier {tier}</h2>
      </div>

      <nav className="space-y-1">
        <MenuBtn icon={<User size={18} />} title="Identity & KYC" sub="Legal verification status" active={activeMenu==="account"} onClick={()=>setActiveMenu("account")} />
        <MenuBtn icon={<Fingerprint size={18} />} title="Trust & Security" sub="2FA & Protocol protection" active={activeMenu==="security"} onClick={()=>setActiveMenu("security")} />
        <MenuBtn icon={<Key size={18} />} title="Developer Access" sub="API keys & Webhooks" active={activeMenu==="developer"} onClick={()=>setActiveMenu("developer")} />
      </nav>
    </div>
  );
}