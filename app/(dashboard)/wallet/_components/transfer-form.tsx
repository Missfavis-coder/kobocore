import { Input } from "@/components/ui/input";
import { Send, ShieldCheck, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function TransferForm({
  amount,
  recipient,
  setAmount,
  setRecipient,
  onSubmit,
}: any) {
  const isDisabled = !amount || !recipient;

  return (
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
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!isDisabled) onSubmit();
        }}
      >
        {/* RECIPIENT */}
        <div className="space-y-1">
          <label className="text-xs  font-semibold text-muted-foreground uppercase tracking-wide">
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
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="0.00"
            className="w-full text-lg p-4 mt-4 font-bold rounded-xl border focus:ring-2 focus:ring-cyan-500"
          />

          <p className="text-[10px] mt-4 text-muted-foreground">
            Minimum transfer may apply
          </p>
        </div>

        {/* INFO BOX */}
        <div className="bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 p-3 rounded-lg flex gap-3 text-xs">
          <Info size={16} />
          <p>
            Funds are held securely in escrow until the recipient confirms delivery.
          </p>
        </div>

        {/* CTA */}
        <button
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
  );
}