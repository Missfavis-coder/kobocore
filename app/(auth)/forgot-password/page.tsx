"use client";

import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FloatingBadge } from "@/components/ui/floating-badge";


type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;


export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
 // const { toastE, toastS } = toaster;
  const [isLoading, setIsLoading] = useState(false);

  function handleOnChange(e: InputChangeEvent) {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

  };

  return (
    <div className="flex min-h-screen">
      
      <div className="w-full flex items-center justify-center p-6 lg:p-8 pt-24">
        <div className="w-full max-w-md relative">

          {/* Header */}
          <div className="mb-10 relative">
            <h1 className=" text-2xl font-bold tracking-widest text-neutral-900 dark:text-white mb-2">Reset Password</h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Enter your email address to receive a password reset link
            </p>
            <FloatingBadge text="KoboCore" variant="default" />
          </div>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-8 text-[14px]">
            <div className="relative group">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter your email address"
                className="h-12 pl-12 pr-4 w-full rounded-xl border border-gray-300 dark:border-neutral-700 text-neutral-500 dark:text-white text-sm outline-none focus:ring-1 focus:border-none focus:ring-cyan-500 transition-all duration-200 bg-white/10  "
                autoComplete="off"
                required
                
              />
              <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-cyan-500 transition-colors" />
            </div>

            <button
              type="submit"
              className="w-full h-12 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-slate-800 hover:opacity-90 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-1 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending reset link...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="text-center text-sm">
            <p className="text-neutral-600 dark:text-neutral-400">
              Remember your password?{" "}
              <Link href="/login" className="text-neutral-800 dark:text-white hover:text-neutral-600/90 font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}""