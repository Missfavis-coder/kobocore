"use client";

import { motion } from "framer-motion";

const steps = [
  { id: "01", title: "Receive", description: "Funds enter your KoboCore account." },
  { id: "02", title: "Balance", description: "Stored internally for speed and accuracy." },
  { id: "03", title: "Send", description: "Transfer instantly to another user." },
  { id: "04", title: "Escrow", description: "Funds held until conditions are met." },
  { id: "05", title: "Release", description: "Confirmed and sent to the recipient." },
  { id: "06", title: "Dispute", description: "Resolve issues with evidence review." },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-[#fafafa] dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-wide mb-4">
            How KoboCore works
          </h2>
          <p className="dark:text-neutral-500 text-neutral-400 max-w-xl mx-auto text-sm md:text-base">
            A simple, secure flow for moving money.
          </p>
        </div>

        {/* Flow */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center max-w-[180px]"
            >
              {/* Connector line */}
              {index !== steps.length - 1 && (
                <div
                  className="
                    absolute 
                    md:top-4 md:left-full md:w-12 md:h-px
                    top-full left-1/2 -translate-x-1/2
                    w-px h-10
                    bg-neutral-200 dark:bg-zinc-800
                  "
                />
              )}

              {/* Step number */}
              <div className="w-8 h-8 rounded-full bg-white dark:bg-[#111] border border-neutral-200 dark:border-zinc-700 flex items-center justify-center mb-4">
                <span className="text-xs font-semibold text-cyan-500">
                  {step.id}
                </span>
              </div>

              {/* Content */}
              <h3 className=" font-semibold mb-1 text-zinc-900 dark:text-zinc-100 text-center">
                {step.title}
              </h3>

              <p className="text-xs dark:text-neutral-500 text-neutral-400 leading-relaxed text-center">
                {step.description}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}