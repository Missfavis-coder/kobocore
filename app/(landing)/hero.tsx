"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full min-h-[65vh] flex items-center justify-center mt-38 px-6 lg:pb-20 lg:pt-20">
      <div className="max-w-4xl text-center space-y-6">
        
        <h1 className="text-2xl lg:text-5xl md:text-3xl font-bold lg:leading-12 tracking-wider dark:text-white">
          Powering Digital Transactions <br className="sm:flex hidden"/> with{" "}
          <span className="text-cyan-500 italic tracking-tight font-heading ">KoboCore</span>
        </h1>

        <p className="text-[14px] font-light md:text-[15px] dark:text-neutral-500 text-neutral-400 tracking-wider ">
          KoboCore is a fast, secure, and scalable platform designed <br className="md:flex hidden"/> to simplify
          payments, manage transactions, <br className="md:flex hidden"/> and empower digital finance solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          
          <Link
            href="/signup"
            className="px-8 py-3 md:text-[15px] text-sm text-white bg-cyan-500 hover:bg-cyan-600 font-semibold rounded-full transition"
          >
            Get Started
          </Link>

          <Link
            href="/about"
            className="px-8 py-3 md:text-[15px] text-sm border border-cyan-600 hover:border-gray-500 dark:text-neutral-500 text-neutral-400 rounded-full transition"
          >
            Learn More
          </Link>
        </div>


        <p className="text-xs dark:text-neutral-500 text-neutral-400 md:mt-16 mt-10">
          Safe Transaction always. Designed for reliability.
        </p>
      </div>
    </section>
  );
}