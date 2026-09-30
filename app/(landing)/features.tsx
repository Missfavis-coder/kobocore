"use client";

import { motion } from "framer-motion";
import {
  Database,
  Lock,
  ShieldCheck,
  RefreshCw,
  Scale,
  FileCode2,
} from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Track Your Money",
    description: "See your money and points in one simple place.",
  },
  {
    icon: Lock,
    title: "Keep Money Safe",
    description: "Your money stays safe until a payment is ready.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Payments",
    description: "Every payment is checked to help prevent mistakes.",
  },
  {
    icon: RefreshCw,
    title: "No Double Payments",
    description: "Payments won't be sent twice by mistake.",
  },
  {
    icon: Scale,
    title: "Fix Payment Problems",
    description: "Get help when a payment goes wrong.",
  },
  {
    icon: FileCode2,
    title: "Easy to Connect",
    description: "Businesses can easily connect their apps to the platform.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">

      {/* HEADER */}
      <section className="py-28 text-center px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-3xl lg:text-5xl font-semibold leading-tight">
            Simple, safe and{" "}
            <span className="text-cyan-400 italic">easy payments</span>
          </h1>

          <p className="mt-6 text-sm md:text-base dark:text-neutral-500 text-neutral-400">
            A simple way to send, receive and keep track of your money.
          </p>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="relative p-4 rounded-xl border dark:border-white/10 border-neutral-200 dark:backdrop-blur-md"
              >
                {/* ICON */}
                <div className="w-11 h-11 flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>

                {/* TITLE */}
                <h3 className="text-base font-semibold mb-2">
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-sm dark:text-neutral-500 text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}

        </div>
      </section>
    </div>
  );
}