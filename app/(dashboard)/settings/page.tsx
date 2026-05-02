"use client";

import { useState, useEffect } from "react";
import SettingsSidebar from "./_components/settings-sidebar";
import AccountView from "./_components/account-view";
import SecurityView from "./_components/security-view";
import DeveloperView from "./_components/developer-view";


export default function SettingsPage() {
  const [activeMenu, setActiveMenu] = useState("account");
  

  // ✅ mock data
  const accountData = {
    name: "Ojo Adesola",
    email: "ojo@example.com",
    username: "kobocore",
  };

  const securityData = {
    twoFactorEnabled: false,
    lastPasswordChange: "2 weeks ago",
  };

  const devData = {
    apiKey: "sk_test_123456",
    webhookUrl: "https://api.kobocore.com/webhook",
  };

  return (
    <div className="lg:min-h-screen min-h-[60vh] lg:p-4 px-2 py-2 flex justify-center">
      <div className="w-full grid lg:grid-cols-12 rounded-md overflow-hidden">

        <SettingsSidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          tier={2}
        />

        <div className="lg:col-span-8 lg:p-6 p-2">
          {activeMenu === "account" && <AccountView account={{firstName: "Favour Adeshola",
  email: "ofavourmi55@gmail.com",
  lastName: "favourdev",
  kycStatus: "VERIFIED",
  tier: 2,
}} />}
          {activeMenu === "security" && <SecurityView security={{
  twoFA: true,
  loginAlerts: true,
  withdrawalPin: true,
  sessionTimeout: "15m",
}} />}
          {activeMenu === "developer" && <DeveloperView dev={devData} />}
        </div>
      </div>
    </div>
  );
}