"use client";

import { ShieldCheck, Wallet, Send, Link, BarChart3, Code } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Transactions",
    description:
      "Every transaction is protected with modern security standards to keep your funds safe.",
  },
  {
    icon: Wallet,
    title: "Smart Wallet",
    description:
      "Manage your balance, deposits, and withdrawals in one simple interface.",
  },
  {
    icon: Send,
    title: "Instant Transfers",
    description:
      "Send and receive money instantly with zero stress and real-time updates.",
  },
  {
    icon: Link,
    title: "Payment Links",
    description:
      "Create simple payment links and get paid anywhere, anytime.",
  },
  {
    icon: BarChart3,
    title: "Transaction Insights",
    description:
      "Track your spending and earnings with clear and simple analytics.",
  },
  {
    icon: Code,
    title: "Developer API",
    description:
      "Integrate KoboCore into your apps with a clean and powerful API.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      
    
      <section className="py-20 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-heading tracking-wider md:tracking-wide font-semibold mb-6">
          Powerful features built for <br className="md:flex hidden"/> modern payments
        </h1>
        <p className="text-[15px] md:text-[16px] text-gray-600 dark:text-neutral-300">
          KoboCore gives you everything  <br className="md:hidden flex"/> you need to send, <br className="md:flex hidden"/> receive, and  manage money effortlessly.
        </p>
      </section>


      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:shadow-lg transition"
              >
                <div className="mb-4">
                  <Icon className="w-8 h-8 text-cyan-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-zinc-400 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}