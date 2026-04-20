"use client";

import { useState } from "react";
import { Mail, Sparkles } from "lucide-react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    // simulate API
    setTimeout(() => {
      console.log("Subscribed:", email);
      setSuccess(true);
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="py-20 px-6 flex justify-center ">
      <div className="max-w-xl w-full space-y-8 text-center">


        <div className="space-y-3">
          <div className="flex justify-center">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl tracking-wider md:tracking-wide font-semibold tracking-tight">
            Stay ahead with{" "}
            <span className="text-cyan-500">Kobocore</span>
          </h1>

          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            Product updates, feature drops, and fintech insights — no noise.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur"
        >
          <Mail className="w-4 h-4 text-neutral-400 ml-2" />

          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm px-2 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 text-white text-sm px-5 py-2 rounded-md font-medium transition"
          >
            {loading ? "..." : "Subscribe"}
          </button>
        </form>


        {success && (
          <p className="text-sm text-cyan-500">
            🎉 You’re in! Check your inbox soon.
          </p>
        )}

        {/* FOOTER */}
        <p className="text-xs text-neutral-400">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}