"use client";

import { motion } from "framer-motion";
import { LockKeyhole, Bolt, WalletMinimal, Link2 } from "lucide-react";

const benefits = [
  {
    icon: LockKeyhole,
    title: "Secure by Design",
    description:
      "Transactions are protected with escrow logic, strict validation, and system-level safeguards.",
  },
  {
    icon: Bolt,
    title: "Instant Processing",
    description:
      "Near-instant transfers powered by an optimized settlement engine.",
  },
  {
    icon: WalletMinimal,
    title: "Unified Wallet",
    description:
      "Manage balances, payments, and settlements in one consistent system.",
  },
  {
    icon: Link2,
    title: "Seamless Payments",
    description:
      "Send and receive funds easily through simple, shareable links.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-[#fafafa] dark:bg-[#0a0a0a] py-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16 ">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-wide mb-4">
            Core capabilities of KoboCore
          </h2>
          <p className="text-slate-500 dark:text-neutral-300 text-sm md:text-base">
            Built to power secure, reliable, and scalable financial systems.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 border border-neutral-200 dark:border-zinc-800">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="p-6 border-b border-r border-neutral-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-[#111] transition-colors duration-300"
              >
                {/* Icon */}
                <div className="mb-4">
                  <Icon className="w-5 h-5 text-cyan-500" />
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}