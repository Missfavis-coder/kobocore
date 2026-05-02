"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ShieldCheck,
  Gavel,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export function DealCard({ deal, type }: any) {
  const router = useRouter();
  const isDisputed = type === "disputed";

  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleApprove = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOpenConfirm(false);

      toast.success("Funds Released", {
        description: `${deal.amount} PTS sent to ${deal.recipient}`,
      });
    }, 1500);
  };

  return (
    <>
      <Card
        className={`rounded-md transition-all border dark:border-neutral-800 border-neutral-300 ${
          isDisputed
            ? "border-red-100 bg-red-50/5"
            : "border-slate-200 hover:shadow-sm"
        }`}
      >
        <CardContent className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-4">
          
          {/* USER */}
          <div className="flex items-center gap-4 min-w-15">
            <div
              className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
                isDisputed
                  ? "bg-red-300/10 text-red-600"
                  : "bg-slate-100/10 text-cyan-600"
              }`}
            >
              {isDisputed ? <Gavel size={22} /> : <ShieldCheck size={22} />}
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                {deal.recipient}
              </h3>
              <p className="text-[10px] font-mono text-slate-400 uppercase">
                {deal.id} • {deal.date}
              </p>
            </div>
          </div>

          {/* AMOUNT */}
          <div className="text-left lg:text-center">
            <p className="lg:text-2xl text-xl font-black font-mono italic">
              {deal.amount}{" "}
              <span className="text-xs text-slate-400 not-italic">PTS</span>
            </p>

            <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 lg:justify-center">
              {isDisputed ? (
                <AlertCircle size={10} className="text-red-500" />
              ) : (
                <Clock size={10} />
              )}
              {deal.status.replace("_", " ")}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center lg:gap-2 gap-6">
            {isDisputed ? (
              <button
                onClick={() =>
                  router.push(`/support/dispute?txid=${deal.id}`)
                }
                className="px-6 py-3 bg-white border border-red-200 text-red-600 rounded-xl font-bold text-xs hover:bg-red-600 hover:text-white cursor-pointer"
              >
                View Case Evidence
              </button>
            ) : (
              <>
                {/* DISPUTE */}
                <button
                  onClick={() =>
                   router.push(`/help-support?tab=dispute&txid=${deal.id}`)
                  }
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-700/10 border dark:border-neutral-800 rounded-md cursor-pointer"
                >
                  <Gavel size={20} />
                </button>

                {/* APPROVE */}
                <button
                  onClick={() => setOpenConfirm(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-md font-bold text-xs hover:bg-cyan-600 cursor-pointer"
                >
                  <CheckCircle2 size={16} />
                  Approve Release
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ✅ CONFIRMATION MODAL */}
      {openConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 w-[90%] max-w-sm rounded-2xl p-6 space-y-5 shadow-xl border dark:border-neutral-800">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">
                Confirm Release
              </h2>
              <button onClick={() => setOpenConfirm(false)}>
                <X size={18} />
              </button>
            </div>

            {/* INFO */}
            <p className="text-sm dark:text-neutral-300 text-slate-500">
              You are about to release{" "}
              <span className="font-bold">{deal.amount} PTS</span> to{" "}
              <span className="font-bold">{deal.recipient}</span>.
            </p>

            <div className="p-3 rounded-xl bg-amber-50/20 text-amber-700 text-xs">
              This action cannot be undone once confirmed.
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              <button
                onClick={() => setOpenConfirm(false)}
                className="flex-1 py-2 rounded-lg border text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleApprove}
                disabled={loading}
                className="flex-1 py-2 rounded-lg bg-cyan-600 text-white text-sm flex items-center justify-center gap-2"
              >
                {loading && (
                  <Loader2 className="animate-spin" size={14} />
                )}
                {loading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}