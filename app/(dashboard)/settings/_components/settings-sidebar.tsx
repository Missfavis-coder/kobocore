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
      <div className="flex items-center gap-2 mb-8">
        <div className="h-8 w-8 bg-cyan-500 rounded-lg flex items-center justify-center">
          <Shield className="text-white" size={18} />
        </div>
        <h1 className="text-xl font-black uppercase">
          Protocol Settings
        </h1>
      </div>

      <div className="bg-slate-600 dark:bg-cyan-500 p-6 rounded-2xl text-white mb-8">
        <h2 className="text-3xl font-black">Tier {tier}</h2>
      </div>

      <nav className="space-y-1">
        <MenuBtn icon={<User size={18} />} title="Identity & KYC" sub="Legal verification status" active={activeMenu==="account"} onClick={()=>setActiveMenu("account")} />
        <MenuBtn icon={<Fingerprint size={18} />} title="Trust & Security" sub="2FA & Protocol protection" active={activeMenu==="security"} onClick={()=>setActiveMenu("security")} />
        <MenuBtn icon={<Key size={18} />} title="Developer Access" sub="API keys & Webhooks" active={activeMenu==="developer"} onClick={()=>setActiveMenu("developer")} />
        <MenuBtn icon={<Sun size={18} />} title="Appearance" sub="System interface" active={activeMenu==="appearance"} onClick={()=>setActiveMenu("appearance")} />
      </nav>
    </div>
  );
}