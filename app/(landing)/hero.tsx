"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full min-h-[65vh] flex items-center justify-center mt-38 px-6">
      <div className="max-w-4xl text-center space-y-6">
        
        <h1 className="text-2xl md:text-4xl font-bold leading-12 tracking-widest md:tracking-wide dark:text-white">
          Powering Digital Transactions <br className="md:flex hidden"/> with{" "}
          <span className="text-cyan-500 italic ">KoboCore</span>
        </h1>

        <p className="text-[15px] md:text-[16px] text-gray-500 dark:text-neutral-300 font-body ">
          KoboCore is a fast, secure, and scalable platform designed <br className="md:flex hidden"/> to simplify
          payments, manage transactions, <br className="md:flex hidden"/> and empower digital finance solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          
          <Link
            href="/signup"
            className="px-6 py-3 text-[15px] text-white bg-cyan-500 hover:bg-cyan-600 font-semibold rounded-xl transition"
          >
            Get Started
          </Link>

          <Link
            href="/about"
            className="px-6 py-3 text-[15px] border border-cyan-600 hover:border-gray-500 text-gray-600 dark:text-neutral-300 rounded-xl transition"
          >
            Learn More
          </Link>
        </div>


        <p className="text-xs text-gray-600 dark:text-neutral-300 md:mt-16 mt-10">
          Safe Transaction always. Designed for reliability.
        </p>
      </div>
    </section>
  );
}