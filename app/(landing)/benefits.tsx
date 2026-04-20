"use client";

import { LockKeyhole, Bolt, WalletMinimal, Link2 } from "lucide-react";

const benefits = [
  {
    icon: LockKeyhole,
    title: "Secure by Design",
    description: "Every transaction is protected with modern security architecture.",
  },
  {
    icon: Bolt,
    title: "Lightning Fast",
    description: "Experience instant transfers and ultra-fast processing.",
  },
  {
    icon: WalletMinimal,
    title: "Unified Wallet",
    description: "Manage your funds, payments, and balances in one interface.",
  },
  {
    icon: Link2,
    title: "Seamless Payments",
    description: "Send and receive payments effortlessly using links.",
  },
];

export default function Benefits() {
  return (
    <section className="relative bg-white dark:bg-[#0a0a0a] lg:py-12 py-6 mb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

      <section className=" text-center max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-heading tracking-wider md:tracking-wide font-semibold  mb-10">
              Built for speed, <br className="md:flex hidden"/> security, and simplicity
        </h2>
      </section>

        <div className="relative flex flex-col items-center mb-20">
         
          <div className="relative z-10">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-1 bg-zinc-400 dark:bg-zinc-700 rounded-sm" />
              ))}
            </div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-1 bg-zinc-400 dark:bg-zinc-700 rounded-sm" />
              ))}
            </div>
            
            <div className="px-8 py-4 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 shadow-sm">
              <span className="text-xl font-bold tracking-tight text-cyan-500">
                KoboCore
              </span>
            </div>
          </div>

          {/* Circuit Lines (SVG) */}
          <svg
            className="absolute top-full left-1/2 -translate-x-1/2 w-full max-w-[900px] h-32 pointer-events-none"
            viewBox="0 0 800 120"
            fill="none"
          >
            {/* Main Vertical trunk */}
            <path d="M400 0 V40" className="stroke-neutral-200 dark:stroke-zinc-800" strokeWidth="2" />
            
            {/* Horizontal Spreader */}
            <path d="M100 40 H700" className="stroke-neutral-200 dark:stroke-zinc-800" strokeWidth="2" />
            
            {/* Vertical drops to cards */}
            <path d="M100 40 V120" className="stroke-neutral-200 dark:stroke-zinc-800" strokeWidth="2" />
            <path d="M300 40 V120" className="stroke-neutral-200 dark:stroke-zinc-800" strokeWidth="2" />
            <path d="M500 40 V120" className="stroke-neutral-200 dark:stroke-zinc-800" strokeWidth="2" />
            <path d="M700 40 V120" className="stroke-neutral-200 dark:stroke-zinc-800" strokeWidth="2" />
            
            {/* Animated Glow Overlay (Optional) */}
            <path 
                d="M400 0 V40 H100 V120" 
                className="stroke-cyan-500/30 dark:stroke-cyan-500/20" 
                strokeWidth="2" 
                strokeDasharray="10 100"
            />
          </svg>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white dark:bg-[#111] border border-neutral-200 dark:border-zinc-800/50 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-neutral-50 dark:bg-zinc-900 flex items-center justify-center mb-6 border border-neutral-100 dark:border-zinc-800 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-cyan-500" />
                </div>
                <h3 className="text-lg font-bold mb-3 dark:text-zinc-100">
                  {benefit.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}