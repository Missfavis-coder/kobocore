"use client";

import { useState } from "react";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import z from "zod"
import { useRouter } from "next/navigation"
import Link from "next/link";
import { FloatingBadge } from "@/components/ui/floating-badge";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";


type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export const dynamic = "force-dynamic";
export default function SigninPage() {
  const router = useRouter();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  //const { toastE, toastS } = toaster;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleOnChange(e: InputChangeEvent) {
    const { name, value } = e.target;
    setPayload(prev => ({
      ...prev,
      [name]: value,
    }));
  }


  return (
    <div className="flex min-h-screen">
      
      <div className="w-full flex items-center justify-center p-6 lg:p-8 pt-24">
        <div className="w-full max-w-md relative">
          
          {/* Header */}
          <div className="mb-6 relative">
            <h1 className=" text-2xl font-bold  tracking-widest text-neutral-900 dark:text-white mb-3">Welcome Back</h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">Sign in to access your account.</p>
            <FloatingBadge text="KoboCore" variant="default" />
          </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Sign In Form */}
          <form  className="space-y-6 mb-6" autoComplete="off">
            <div className="space-y-4">
            
              <div>
                 <div className="relative group">
                    <input
                     type="email"
                     placeholder="Enter your email"
                     className="h-12 pl-12 pr-4 w-full rounded-xl border border-gray-300 dark:border-neutral-700 text-neutral-500 dark:text-white text-sm outline-none focus:ring-1 focus:border-none focus:ring-cyan-500 transition-all duration-200 bg-white/10 "
                     autoComplete="off"
                     required
                     />
                    <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-cyan-500 transition-colors" />
                </div>
               {/** {errors.email && (<p className="text-red-500 text sm mt-1">{errors.email.message}</p>)} */}
              </div>

              <div>
                 <div className="relative group">
                    <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-cyan-500 transition-colors" />
                    <input
                     type={showPassword ? "text" : "password"}
                     placeholder="Enter your password"
                     className="h-12 pl-12 pr-4 w-full rounded-xl border border-gray-300 dark:border-neutral-700 text-gray-500 dark:text-white text-sm outline-none focus:ring-1 focus:ring-cyan-500 focus:border-none transition-all duration-200 bg-white/10 "
                     autoComplete="off"
                     required
                     />
                    <button
                       type="button"
                       onClick={() => setShowPassword(!showPassword)}
                       className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                </div>
                 {/* {errors.password && (<p className="text-red-500 text sm mt-1">{errors.password.message}</p>)} */}
              </div>

            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 " autoComplete="off" />
                <span className="text-gray-500 dark:text-neutral-400">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-primary-500 hover:text-slate-700 dark:hover:text-slate-600 font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full h-12 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-slate-800 hover:opacity-90 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-neutral-800"  />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-neutral-800 dark:text-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Auth Button */}
          <GoogleAuthButton 
            text="Continue with Google"
            onSuccess={(user) => {
              console.log("Google auth success:", user);
              router.push('/dashboard');
            }}
            onError={(error) => {
              console.error("Google auth error:", error);
              setError(typeof error === 'string' ? error : 'Google authentication failed. Please try again.');
            }}
          />

          <div className="mt-4 text-center text-sm">
            <p className="text-neutral-600  dark:text-neutral-400">
              Don't have an account?{" "}
              <Link href="/sIgnup" className="text-neutral-800 dark:text-white hover:text-slate-800 font-semibold transition-colors">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}