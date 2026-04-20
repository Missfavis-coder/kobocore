"use client";

import Image from "next/image";

const companies = [
  "google.com",
  "amazon.com",
  "microsoft.com",
  "netflix.com",
  "facebook.com",
  "stripe.com",
];

export default function Companies() {
  return (
    <section className="py-16 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-sm uppercase tracking-widest text-gray-500 mb-8">
          Trusted by companies worldwide
        </h2>

        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll gap-12 min-w-max">
              {[...companies, ...companies].map((domain, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center min-w-[120px] opacity-70 hover:opacity-100 transition"
                >
                  <Image
                    src={`https://logo.dev.com/${domain}`}
                    alt={domain}
                    width={100}
                    height={40}
                    className="object-contain grayscale hover:grayscale-0 transition"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.src = `https://img.logo.dev/${domain}`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}