"use client";

import { motion } from "framer-motion";


export default function SecurityPage() {
  return (
    <div className="">

      <section className="relative pt-38  overflow-hidden">

        {/* Grid Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="h-[50vh] w-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 text-center">

          <motion.p
            initial="hidden"
            animate="show"
            className="text-xs text-cyan-600 dark:text-cyan-400 mb-4"
          >
            Built for secure business transactions
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6"
          >
            Security <span className="italic font-light">you can trust</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            className="text-neutral-500 dark:text-neutral-300 text-base md:text-lg leading-relaxed max-w-4xl mx-auto"
          >
            KoboCore is a structured payment system designed for businesses and individuals
            who need trust in every transaction. Every payment is protected, controlled,
            and handled with clarity from start to finish.
          </motion.p>

        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-24 space-y-10">

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl tracking-wide font-semibold mb-4">
            What KoboCore does
          </h2>
          <p className="text-neutral-500 dark:text-neutral-300 leading-relaxed max-w-2xl">
            KoboCore helps you run transactions with structure and protection.
            You can send payments, hold funds securely, and complete transactions
            only when both parties are satisfied.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
        >
          <p className="text-slate-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
            Instead of sending money blindly, every transaction follows a clear
            process — funds are held, conditions are met, and only then are they released.
          </p>
        </motion.div>

      </section>

      <section className="max-w-4xl mx-auto px-4 py-24 space-y-16 border-t border-neutral-200 dark:border-neutral-800">

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Built to protect every transaction
          </h2>
          <p className="text-neutral-500 dark:text-neutral-300 leading-relaxed max-w-2xl">
            KoboCore ensures that money is never left exposed during a transaction.
            Funds are securely held until both sides fulfill their agreement.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
        >
          <h3 className="text-lg font-semibold mb-2">
            Escrow protection
          </h3>
          <p className="text-neutral-500 dark:text-neutral-300 leading-relaxed max-w-2xl">
            Payments are not immediately released. They are held securely until
            both parties confirm that the conditions of the transaction are met.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={2}
        >
          <h3 className="text-lg font-semibold mb-2">
            Continuous monitoring
          </h3>
          <p className="text-neutral-500 dark:text-neutral-300 leading-relaxed max-w-2xl">
            Every transaction is tracked from start to finish, ensuring consistency,
            visibility, and protection against unexpected issues.
          </p>
        </motion.div>

      </section>

      {/* ================= DISPUTE ================= */}
      <section className="max-w-4xl mx-auto px-4 py-24 space-y-12 border-t border-neutral-200 dark:border-neutral-800">

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            When things don’t go as planned
          </h2>
          <p className="text-neutral-500 dark:text-neutral-300 leading-relaxed max-w-2xl">
            If a transaction runs into issues, KoboCore provides a clear dispute
            process where both parties can submit evidence for review.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
        >
          <p className="text-neutral-500 dark:text-neutral-300 leading-relaxed max-w-2xl">
            Every case is handled carefully to ensure a fair outcome,
            giving both businesses and customers confidence in the system.
          </p>
        </motion.div>

      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center border-t border-neutral-200 dark:border-neutral-800">

        <motion.h3
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-semibold mb-4"
        >
          Build trust with every transaction
        </motion.h3>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="text-neutral-500 dark:text-neutral-300 leading-relaxed mb-8"
        >
          KoboCore gives you the structure and protection needed to run
          reliable business transactions.
        </motion.p>

        <motion.button
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={2}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3 rounded-md bg-black text-white dark:bg-white dark:text-black font-medium hover:bg-cyan-500 hover:text-white transition text-sm cursor-pointer"
        >
          Get Started
        </motion.button>

      </section>
    </div>
  );
}