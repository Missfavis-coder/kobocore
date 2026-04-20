"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Kobocore?",
    answer:
      "Kobocore is a modern financial platform that enables seamless payments, wallet management, and secure digital transactions.",
  },
  {
    question: "Is Kobocore secure?",
    answer:
      "Yes. Kobocore is built with modern security architecture, encryption, and real-time validation to ensure your funds and data are protected.",
  },
  {
    question: "How fast are transactions?",
    answer:
      "Transactions are processed instantly or within seconds depending on the network and integration.",
  },
  {
    question: "Can I integrate Kobocore into my app?",
    answer:
      "Yes. Kobocore provides APIs and integrations that allow developers to easily embed payment functionality into their products.",
  },
  {
    question: "Is there a fee for using Kobocore?",
    answer:
      "Pricing depends on usage and services. A detailed pricing page will outline all applicable fees transparently.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-20 px-6 flex justify-center bg-gradient-to-b from-transparent to-cyan-100/10 dark:to-cyan-950/20">
      <div className="max-w-2xl w-full space-y-10">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl md:text-4xl font-heading  tracking-wider md:tracking-wide font-semibold">
            Frequently Asked Questions
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base">
            Everything you need to know about Kobocore.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-neutral-200 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-white/5"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm md:text-base font-medium">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`w-4 h-4 transition-transform cursor-pointer ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm text-neutral-500 dark:text-neutral-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Still have questions?
          </p>
          <button className="mt-3 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-md text-sm font-medium transition">
            Contact Support
          </button>
        </div>

      </div>
    </div>
  );
}