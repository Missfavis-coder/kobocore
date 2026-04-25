"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Scale,
  CreditCard,
  ShieldCheck,
  Mail,
  MessageSquare,
  ChevronRight,
  ArrowLeft,
  Send,
  CheckCircle2,
  Gavel,
  FileSearch,
  AlertTriangle,
  LifeBuoy,
} from "lucide-react";

/* ================= DATA ================= */

const CATEGORIES = [
  {
    id: "escrow-logic",
    icon: ShieldCheck,
    title: "Escrow & Settlements",
    desc: "How funds are held and released",
    count: 6,
    color: "text-emerald-600",
  },
  {
    id: "disputes",
    icon: Gavel,
    title: "Disputes",
    desc: "When something goes wrong",
    count: 4,
    color: "text-red-600",
  },
  {
    id: "ledger",
    icon: FileSearch,
    title: "History",
    desc: "Your transaction records",
    count: 3,
    color: "text-blue-600",
  },
  {
    id: "exchange",
    icon: CreditCard,
    title: "Exchange",
    desc: "Funding & withdrawals",
    count: 5,
    color: "text-cyan-600",
  },
];

const ARTICLES = [
  {
    id: 1,
    title: "Why is my money on hold?",
    category: "Escrow & Settlements",
    content:
      "When you start a deal, the money is locked safely. It will only be released when both sides confirm or after a set time.",
  },
  {
    id: 2,
    title: "How to report a problem",
    category: "Disputes",
    content:
      "If something goes wrong, send proof. Our team will review and decide fairly.",
  },
  {
    id: 3,
    title: "Can I reverse a transaction?",
    category: "History",
    content:
      "Transactions cannot be deleted. Instead, a new one is created to correct it.",
  },
  {
    id: 4,
    title: "How long do withdrawals take?",
    category: "Exchange",
    content:
      "Most withdrawals take a few minutes. Large amounts may take longer.",
  },
];

/* ================= COMPONENT ================= */

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] =
    useState<typeof ARTICLES[0] | null>(null);
  const [isChatting, setIsChatting] = useState(false);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

 

  if (selectedArticle) {
    return (
      <div className=" lg:px-4 px-2 py-10">
        <button
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-cyan-600 mb-6"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="p-6 border rounded-2xl bg-white dark:bg-neutral-900 shadow-sm">
          <span className="text-xs font-bold text-cyan-600 uppercase">
            {selectedArticle.category}
          </span>

          <h1 className="text-2xl font-bold mt-3 mb-4">
            {selectedArticle.title}
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
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
      <div className="lg:px-4 px-2 py-10 border-b">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <LifeBuoy className="text-cyan-500" size={20} />
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">
              KoboCore Support
            </span>
          </div>

          <h1 className="text-3xl font-bold">Help Center</h1>

          <p className="text-sm text-slate-500 mt-2">
            Find answers or get help with your transactions
          </p>
        </div>
      </div>

      <main className="lg:px-4 px-2 mt-10 space-y-10">
        {/* SEARCH */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* CATEGORIES */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="p-5 border rounded-xl hover:shadow-md transition cursor-pointer"
            >
              <cat.icon className={`${cat.color} mb-3`} size={22} />
              <h3 className="font-semibold text-sm">{cat.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* ARTICLES */}
        <div>
          <h2 className="text-lg font-bold mb-4">
            {searchQuery ? "Results" : "Common Help"}
          </h2>

          <div className="space-y-3">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="flex justify-between items-center p-4 border rounded-xl hover:shadow-sm cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-sm">{art.title}</p>
                    <span className="text-xs text-slate-400">
                      {art.category}
                    </span>
                  </div>

                  <ChevronRight size={16} />
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-sm text-slate-400">
                No results found
              </div>
            )}
          </div>
        </div>

        {/* SUPPORT */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* CHAT */}
          <div className="p-6 rounded-xl dark:bg-slate-900/30 bg-slate-700 dark:shadow-md text-white">
            <h3 className="font-bold mb-4">Live Chat</h3> 
            <p className="text-xs text-slate-400 mb-6">
              Talk to support instantly
            </p>

            {isChatting ? (
              <div className="text-sm text-cyan-400 flex items-center gap-2">
                <CheckCircle2 size={16} /> Connecting...
              </div>
            ) : (
              <button
                onClick={() => setIsChatting(true)}
                className="w-full py-2 bg-cyan-500 cursor-pointer rounded-lg font-semibold"
              >
                Start Chat
              </button>
            )}
          </div>

          {/* EMAIL */}
          <div className="p-6 border rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Mail size={18} />
              <p className="font-semibold text-sm">Email Support</p>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Send documents or detailed complaints
            </p>

            <a
              href="mailto:support@kobocore.com"
              className="block text-center py-2 border rounded-lg cursor-pointer text-sm font-semibold text-cyan-600"
            >
              Send Email
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}