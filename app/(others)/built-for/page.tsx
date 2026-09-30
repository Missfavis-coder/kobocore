"use client";

import { motion } from "framer-motion";

export default function WhoItsForPage() {
  return (
    <div className="pt-14 pb-4">
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-40">
          <div className="h-[50vh] w-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]" />
        </div>
      {/* ================= HERO ================= */}
      <section className="relative py-28 text-center max-w-3xl mx-auto px-4">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs text-cyan-600 dark:text-cyan-400 mb-4 font-semibold"
        >
          Designed for trust-driven transactions
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl md:text-5xl font-semibold tracking-tight mb-6"
        >
          Who KoboCore <span className="italic font-light">serves</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="dark:text-neutral-500 text-neutral-400 text-[16px]  leading-relaxed"
        >
          KoboCore is for people and businesses who need clarity, protection,<br className="md:flex hidden"/>
          and trust when money is involved.
        </motion.p>
      </section>

      {/* ================= BLOCKS ================= */}
      <section className="max-w-4xl mx-auto px-4 pb-24 space-y-12">

        {[
          {
            title: "Selling products online",
            desc: "Accept payments with confidence. Funds are only completed when both you and your customer are satisfied, reducing disputes and building long-term trust.",
          },
          {
            title: "Freelancers and service providers",
            desc: "Secure payments before work begins. Funds are released only when both sides agree the job is complete, ensuring fairness for everyone involved.",
          },
          {
            title: "Business-to-business transactions",
            desc: "Work with partners and suppliers using structured payments. Clear terms reduce misunderstandings and keep both sides aligned.",
          },
          {
            title: "High-trust transactions",
            desc: "When trust is critical, KoboCore gives you control. Funds are not left to chance, and every step follows a predictable process.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="relative group"
          >
            {/* subtle divider line */}
            <div className="absolute -top-6 left-0 w-full h-px bg-neutral-200 dark:bg-zinc-800" />

            <div className="flex flex-col md:flex-row md:items-start gap-6">

              {/* left index */}
              <div className="text-sm text-cyan-500 font-medium min-w-[40px]">
                0{i + 1}
              </div>

              {/* content */}
              <div className="max-w-2xl">
                <h3 className=" text-[16px] font-semibold mb-2 group-hover:text-cyan-500 transition-colors">
                  {item.title}
                </h3>

                <p className="dark:text-neutral-500 text-neutral-400 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>

            </div>
          </motion.div>
        ))}
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center bg-cyan-500 border-neutral-200 dark:border-zinc-800 rounded-md">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold mb-4 text-white"
        >
          Run transactions with confidence
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-white italic mb-8"
        >
          KoboCore gives you the structure needed to build trust with every customer.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3 rounded-full text-cyan-600 bg-white cursor-pointer font-semibold transition"
        >
          Get Started
        </motion.button>
      </section>
    </div>
  );
}