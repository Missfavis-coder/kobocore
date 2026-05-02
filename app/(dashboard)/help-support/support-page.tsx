"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  CreditCard,
  ShieldCheck,
  Mail,
  ChevronRight,
  ArrowLeft,
  Gavel,
  FileSearch,
  LifeBuoy,
  Send,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

/* ================= DATA ================= */

const ARTICLES = [
  {
    id: 1,
    title: "Why is my money on hold?",
    category: "Escrow & Settlements",
    content:
      "When you initiate a transaction, your funds are placed in secure escrow. This ensures that the seller only receives payment after fulfilling their part of the agreement.",
  },
  {
    id: 2,
    title: "When will my payment be released?",
    category: "Escrow & Settlements",
    content:
      "Funds are released once the buyer confirms satisfaction. If no action is taken, release may happen automatically after a set time.",
  },
  {
    id: 3,
    title: "How to report a problem",
    category: "Disputes",
    content:
      "You can raise a dispute directly from your transaction. Provide clear details and evidence like screenshots or receipts.",
  },
  {
    id: 4,
    title: "How long do disputes take?",
    category: "Disputes",
    content:
      "Most disputes are resolved within 24–72 hours depending on complexity and evidence.",
  },
  {
    id: 5,
    title: "Where can I see my transaction history?",
    category: "History",
    content:
      "All transactions are available in your History tab, including timestamps and statuses.",
  },
  {
    id: 6,
    title: "How do I fund my wallet?",
    category: "Exchange",
    content:
      "You can fund via bank transfer or supported payment methods. Your balance updates once confirmed.",
  },
];

export default function SupportPage() {
  const searchParams = useSearchParams();

  const tab = useMemo(() => searchParams.get("tab"), [searchParams]);
  const txid = useMemo(() => searchParams.get("txid"), [searchParams]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] =
    useState<typeof ARTICLES[0] | null>(null);

  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  /* ================= DISPUTE VIEW ================= */

  if (tab === "dispute" && txid) {
    return (
      <div className="lg:px-4 px-2 py-10 ">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm cursor-pointer font-semibold text-cyan-500 hover:text-cyan-600 mb-6"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="p-6 border rounded-md bg-white dark:bg-neutral-900 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-red-500">
            <Gavel size={18} />
            <h2 className="font-bold text-lg ">Raise a Dispute</h2>
          </div>

          <p className="text-sm text-neutral-500">
            You are reporting an issue for transaction:
          </p>

          <div className="p-3 bg-slate-50 dark:bg-neutral-800 rounded-md max-w-40 font-mono text-sm text-center">
            {txid}
          </div>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain what went wrong..."
            className="w-full p-3 border rounded-md text-sm focus:ring-2 focus:ring-cyan-500 outline-none bg-transparent"
            rows={8}
          />

          <button
            onClick={() => {
              if (!reason) return toast.error("Please describe the issue");

              setLoading(true);

              setTimeout(() => {
                setLoading(false);

                toast.success("Dispute Submitted", {
                  description: "We’ll review your case shortly.",
                });

                window.history.back();
              }, 1500);
            }}
            className="w-full py-3 bg-red-500 text-white rounded-xl flex items-center justify-center gap-2"
          >
            {loading ? "Submitting..." : <>Submit Dispute <Send size={16} /></>}
          </button>
        </div>
      </div>
    );
  }


  if (selectedArticle) {
    return (
      <div className="lg:px-4 px-2 py-10">
        <button
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-2 text-sm cursor-pointer font-semibold text-slate-800 dark:text-neutral-300 hover:text-cyan-600 mb-6"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="p-6 border rounded-2xl bg-white dark:bg-neutral-900 shadow-sm">
          <span className="text-xs font-bold text-cyan-600 uppercase">
            {selectedArticle.category}
          </span>

          <h1 className="text-lg font-bold mt-3 mb-4">
            {selectedArticle.title}
          </h1>

          <p className="text-sm text-slate-600 dark:text-neutral-300 ">
            {selectedArticle.content}
          </p>
        </div>
      </div>
    );
  }

  /* ================= MAIN VIEW ================= */

  return (
    <div className="pb-16">
      {/* HEADER */}
      <div className="lg:px-4 px-2 py-10 border-b text-center">
        <LifeBuoy className="mx-auto text-cyan-500 mb-2" />
        <h1 className="text-3xl font-bold">Help Center</h1>
        <p className="text-neutral-500 dark:text-cyan-50 text-sm mt-2">
          Find answers or get help with your transactions
        </p>
      </div>

      <main className="lg:px-4 px-2 mt-10 space-y-10">
        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={16} />
          <Input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border rounded-xl text-sm"
          />
        </div>

        {/* ARTICLES */}
        <div>
          <h2 className="text-lg font-bold mb-4">
            {searchQuery ? "Results" : "Common Help"}
          </h2>

          <div className="space-y-3">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="flex justify-between items-center p-4 border rounded-xl cursor-pointer"
              >
                <div>
                  <p className="font-semibold text-sm">{art.title}</p>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {art.category}
                  </span>
                </div>

                <ChevronRight size={16} />
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* LIVE CHAT */}
          <div className="p-6 rounded-md bg-slate-900 text-white relative">
            <div className="absolute top-4 right-3 text-xs bg-green-600 px-2 py-1 rounded-full">
              Online
            </div>

            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-cyan-400">
              <MessageCircle size={18} /> Live Chat
            </h3>

            <p className="text-sm mb-4">
              Get instant help for urgent issues like failed payments or disputes.
            </p>

            <div className="text-xs text-slate-300 mb-4">
              Avg. response time: <span className="font-semibold">~2 mins</span>
            </div>

            <button
              onClick={() =>
                toast.info("Chat coming soon", {
                  description: "Live chat will be available shortly.",
                })
              }
              className="w-full py-3 bg-cyan-500 rounded-md font-semibold flex items-center justify-center gap-2 text-sm"
            >
              Start Live Chat
            </button>
          </div>

          {/* EMAIL */}
          <div className="p-6 border rounded-md flex flex-col justify-between">
            <div>
              <p className="font-bold text-lg mb-2 flex items-center gap-2">
                <Mail size={18} /> Email Support
              </p>

              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                Send us a detailed message. Best for non-urgent issues.
              </p>

              <div className="text-xs text-neutral-400 mb-4">
                Response time: <span className="font-semibold dark:text-white">within 24 hours</span>
              </div>
            </div>

            <a
              href="mailto:support@kobocore.com"
              className="w-full text-center py-3 border border-cyan-500 text-cyan-600 rounded-md font-semibold flex items-center justify-center gap-2 text-sm"
            >
              Send Email <Send size={16} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}