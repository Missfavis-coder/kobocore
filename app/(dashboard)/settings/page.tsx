"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  Heart,
  User,
  Shield,
  CheckCircle2,
  Loader2,
  Moon,
  Sun,
} from "lucide-react";

/* ---------------- TYPES ---------------- */

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
};

type Notifications = {
  withdraw: boolean;
  weekly: boolean;
  payment: boolean;
  password: boolean;
  topup: boolean;
  sendMoney: boolean;
};

type Security = {
  password: string;
  newPassword: string;
  twoFA: boolean;
};

/* ---------------- PAGE ---------------- */

export default function SettingsPage() {
  const [activeMenu, setActiveMenu] = useState<"account" | "security" | "appearance">("account");

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [notifications, setNotifications] = useState<Notifications>({
    withdraw: true,
    weekly: true,
    payment: false,
    password: false,
    topup: false,
    sendMoney: true,
  });

  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const [security, setSecurity] = useState<Security>({
    password: "",
    newPassword: "",
    twoFA: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success">("idle");

  /* ---------------- LOAD ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed.formData);
      setNotifications(parsed.notifications);
      setTheme(parsed.theme || "dark");
      setSecurity(parsed.security || security);
    }
  }, []);

  /* ---------------- SAVE ---------------- */
  const handleSave = () => {
    if (!formData.email.includes("@")) return alert("Invalid email");

    setIsSaving(true);

    setTimeout(() => {
      localStorage.setItem(
        "settings",
        JSON.stringify({ formData, notifications, theme, security })
      );

      setIsSaving(false);
      setSaveStatus("success");

      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 1000);
  };

  const handleDiscard = () => window.location.reload();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecurity({ ...security, [e.target.name]: e.target.value });
  };

  const toggleNotification = (key: keyof Notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen p-3 md:p-6 flex justify-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 border rounded-xl overflow-hidden">

        {/* LEFT */}
        <div className="lg:col-span-4 p-4 border-r bg-neutral-50 dark:bg-neutral-900">
          <h1 className="text-2xl font-bold tracking-wider mb-6">Settings</h1>

          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-5 rounded-xl text-white mb-6">
            <p className="text-sm opacity-80">Profile Completion</p>
            <h2 className="text-2xl font-bold">75%</h2>

            <button
              onClick={() => setActiveMenu("account")}
              className="mt-4 w-full bg-white text-cyan-600 py-2 rounded-lg text-sm font-semibold"
            >
              Complete Profile
            </button>
          </div>

          <div className="space-y-2">
            <MenuBtn
              icon={<Heart size={18} />}
              title="Appearance"
              sub="Theme settings"
              active={activeMenu === "appearance"}
              onClick={() => setActiveMenu("appearance")}
            />

            <MenuBtn
              icon={<User size={18} />}
              title="Account"
              sub="Personal info"
              active={activeMenu === "account"}
              onClick={() => setActiveMenu("account")}
            />

            <MenuBtn
              icon={<Shield size={18} />}
              title="Security"
              sub="Password & 2FA"
              active={activeMenu === "security"}
              onClick={() => setActiveMenu("security")}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-8 p-6 md:p-10">

          {/* ACCOUNT */}
          {activeMenu === "account" && (
            <>
              <h2 className="text-xl font-bold tracking-wider mb-6">Account Settings</h2>

              <div className="grid md:grid-cols-2 gap-5">
                <Input label="First Name" name="firstName" value={formData.firstName} placeholder="Ojo" onChange={handleInputChange} />
                <Input label="Last Name" name="lastName" value={formData.lastName} placeholder="Adeshola" onChange={handleInputChange} />
              </div>

              <div className="mt-6">
                <Input label="Email" name="email" value={formData.email} onChange={handleInputChange} placeholder="ofavourmi55@gmail.com" />
              </div>

              <div className="mt-10">
                <h3 className="font-semibold mb-4">Notifications</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <Checkbox
                      key={key}
                      label={key}
                      checked={value}
                      onChange={() => toggleNotification(key as keyof Notifications)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* SECURITY */}
          {activeMenu === "security" && (
            <>
              <h2 className="text-xl font-bold tracking-wider mb-6">Security</h2>

              <Input
                label="Current Password"
                name="password"
                type="password"
                onChange={handleSecurityChange}
              />

              <div className="mt-4">
                <Input
                  label="New Password"
                  name="newPassword"
                  type="password"
                  onChange={handleSecurityChange}
                />
              </div>

              <div className="mt-6">
                <Checkbox
                  label="Enable Two-Factor Authentication (2FA)"
                  checked={security.twoFA}
                  onChange={() =>
                    setSecurity({ ...security, twoFA: !security.twoFA })
                  }
                />
              </div>
            </>
          )}

          {/* APPEARANCE */}
          {activeMenu === "appearance" && (
            <>
              <h2 className="text-xl font-bold tracking-wider mb-6">Appearance</h2>

              <div className="flex gap-4">
                <button
                  onClick={() => setTheme("light")}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    theme === "light" ? "bg-cyan-500 text-white" : "border"
                  }`}
                >
                  <Sun size={16} /> Light
                </button>

                <button
                  onClick={() => setTheme("dark")}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    theme === "dark" ? "bg-cyan-500 text-white" : "border"
                  }`}
                >
                  <Moon size={16} /> Dark
                </button>
              </div>
            </>
          )}

          {/* ACTIONS */}
          <div className="flex justify-between mt-10">
            <button onClick={handleDiscard} className="text-gray-400">
              Discard
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 rounded-lg bg-cyan-500 text-white flex items-center gap-2 md:text-[15px] text-sm"
            >
              {isSaving ? (
                <Loader2 className="animate-spin" />
              ) : saveStatus === "success" ? (
                <CheckCircle2 />
              ) : null}

              {isSaving
                ? "Saving..."
                : saveStatus === "success"
                ? "Saved!"
                : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



type MenuBtnProps = {
  icon: React.ReactNode;
  title: string;
  sub: string;
  active: boolean;
  onClick: () => void;
};

function MenuBtn({ icon, title, sub, active, onClick }: MenuBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex justify-between items-center p-3 rounded-lg ${
        active ? "bg-cyan-500/10 text-cyan-600" : "hover:bg-gray-100 dark:hover:bg-white/5"
      }`}
    >
      <div className="flex gap-3 items-center">
        {icon}
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-gray-400">{sub}</p>
        </div>
      </div>
      <ChevronRight size={16} />
    </button>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm dark:text-white text-neutral-500">{label}</label>
      <input
        {...props}
        className="border rounded-lg px-4 py-2  dark:text-white focus:ring-1 focus:ring-cyan-500 outline-none bg-transparent text-sm"
      />
    </div>
  );
}

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="text-sm capitalize">{label}</span>
    </label>
  );
}