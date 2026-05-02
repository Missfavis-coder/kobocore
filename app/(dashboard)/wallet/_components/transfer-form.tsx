"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Send, ShieldCheck, Info, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function TransferForm({
  amount,
  recipient,
  setAmount,
  setRecipient,
  onSubmit,
}: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openPinModal, setOpenPinModal] = useState(false);
  const [pin, setPin] = useState("");

  const isDisabled = !amount || !recipient || loading;

  // STEP 1: VALIDATE → OPEN MODAL
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!recipient.startsWith("0x") || recipient.length < 6) {
      setError("Enter a valid wallet address");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Enter a valid amount");
      return;
    }

    setOpenPinModal(true); // open modal instead of sending
  };

  // STEP 2: CONFIRM WITH PIN
  const handleConfirmTransfer = () => {
    if (pin.length < 4) {
      setError("Enter a valid 4-digit PIN");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      onSubmit?.();

      toast.success("Transfer Successful", {
        description: `${amount} PTS sent to ${recipient.slice(0, 6)}...`,
      });

      // RESET EVERYTHING
      setAmount("");
      setRecipient("");
      setPin("");
      setOpenPinModal(false);
    }, 1500);
  };

  return (
    <>
      <div className="border rounded-2xl lg:p-8 p-5 shadow-sm bg-white dark:bg-transparent space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold tracking-tight">
            Send Transfer
          </h2>

          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide">
            <ShieldCheck size={14} />
            ESCROW ENABLED
          </div>
        </div>

        {/* FORM */}
        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* RECIPIENT */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Recipient Address
            </label>

            <Input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x... or wallet address"
              className="w-full p-4 mt-4 text-sm rounded-xl border focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* AMOUNT */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Amount (PTS)
            </label>

            <Input
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value.replace(/\D/g, ""))
              }
              placeholder="0"
              className="w-full text-lg p-4 mt-4 font-bold rounded-xl border focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* INFO */}
          <div className="bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 p-3 rounded-lg flex gap-3 text-xs">
            <Info size={16} />
            <p>
              Funds are securely held in escrow until delivery is confirmed.
            </p>
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={isDisabled}
            className={cn(
              "w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all",
              isDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600 text-white active:scale-[0.98]"
            )}
          >
            Confirm Transfer <Send size={16} />
          </button>
        </form>
      </div>

      {/* 🔐 PIN MODAL */}
      {openPinModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 w-[90%] max-w-sm rounded-2xl p-6 space-y-5 shadow-xl border dark:border-neutral-800">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Authorize Transfer</h3>
              <button onClick={() => setOpenPinModal(false)}>
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-neutral-500">
              Enter your 4-digit PIN to complete this transaction.
            </p>

            {/* PREVIEW */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-800 text-sm">
              <p>Amount: {amount} PTS</p>
              <p>To: {recipient.slice(0, 10)}...</p>
            </div>

            {/* PIN INPUT */}
            <Input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) =>
                setPin(e.target.value.replace(/\D/g, ""))
              }
              placeholder="•  •  •  •"
              className="text-center text-lg tracking-widest py-5 "
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* ACTION */}
            <button
              onClick={handleConfirmTransfer}
              disabled={loading}
              className="w-full py-3 bg-cyan-600 text-white rounded-xl flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={16} />}
              {loading ? "Processing..." : "Authorize & Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}