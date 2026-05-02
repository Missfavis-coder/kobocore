"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, ArrowRightLeft, X, Loader2, CheckCircle2 } from "lucide-react";
import { z } from "zod";

import { WalletCard } from "./_components/wallet-cards";
import { TransferForm } from "./_components/transfer-form";
import { EscrowTable } from "./_components/escrow-table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();

  const [wallet, setWallet] = useState({
    ngn: 50000,
    points: 20000,
  });

  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  // FUNDING
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fundingData, setFundingData] = useState<null | any>(null);

  // EXCHANGE
  const [exchangeModal, setExchangeModal] = useState<null | "buy" | "sell" | "withdraw">(null);
  const [inputValue, setInputValue] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateTransfer = () => {
    console.log({ amount, recipient });
  };

  // ZOD SCHEMA
  const getSchema = (type: "buy" | "sell") =>
    z.object({
      amount: z
        .string()
        .regex(/^\d+$/, "Only numbers allowed")
        .refine((val) => {
          const num = Number(val);
          return type === "buy" ? num >= 100 : num >= 1000;
        }, {
          message:
            type === "buy"
              ? "Minimum amount is ₦100"
              : "Minimum is 1,000 points",
        }),
    });

  // FUND WALLET
  const handleInitializeFunding = () => {
    setOpenModal(true);
    setLoading(true);
    setFundingData(null);

    setTimeout(() => {
      setFundingData({
        funding_id: `FUND_${Math.floor(Math.random() * 1000000)}`,
        payment_url: "https://mock-payments.kobocore.io/pay",
        bank_name: "KoboCore Bank",
        account_number: "0123456789",
        account_name: "Ojo Adesola",
      });
      setLoading(false);
    }, 2000);
  };

  const handleAction = () => {
    setError(null);
    const value = Number(inputValue);

    if (exchangeModal !== "withdraw") {
      const schema = getSchema(exchangeModal as "buy" | "sell");
      const parsed = schema.safeParse({ amount: inputValue });

      if (!parsed.success) {
        setError(parsed.error.issues[0].message);
        return;
      }
    }

    if (pin.length < 4) {
      setError("Enter your 4-digit transaction PIN");
      return;
    }

    setLoadingAction(true);

    setTimeout(() => {
      if (exchangeModal === "buy") {
        const points = value * 100;

        setWallet((prev) => ({
          ngn: prev.ngn - value,
          points: prev.points + points,
        }));

        setResult({
          title: "Points Purchased",
          desc: `₦${value.toLocaleString()} converted to ${points.toLocaleString()} points`,
        });

        toast.success("Points Purchased", {
          description: `${points.toLocaleString()} points added to your wallet`,
        });
      }

      if (exchangeModal === "sell") {
        setWallet((prev) => ({
          ngn: prev.ngn + value,
          points: prev.points - value,
        }));

        setResult({
          title: "Conversion Successful",
          desc: `${value.toLocaleString()} points converted to ₦${value.toLocaleString()}`,
        });

        toast.success("Conversion Successful", {
          description: `₦${value.toLocaleString()} credited to your wallet`,
        });
      }

      if (exchangeModal === "withdraw") {
        setResult({
          title: "Withdrawal Initiated",
          desc: "Your withdrawal request is being processed",
        });

        toast.success("Withdrawal Initiated", {
          description: "Funds will arrive in your bank shortly",
        });
      }

      setLoadingAction(false);
    }, 1500);
  };

  return (
    <div className="lg:p-6 py-4 px-2 lg:space-y-12 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Wallet & Funding</h1>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-5 space-y-6">
          <WalletCard
            icon={<Plus className="text-cyan-600" size={24} />}
            badge={{
              text: "EXTERNAL BANK - NGN",
              className: "bg-slate-100/20 text-cyan-600",
            }}
            title="Fund Wallet"
            description="Add funds via bank transfer."
            hoverColor="hover:border-emerald-500"
            action={{
              label: "Initialize Funding",
              onClick: handleInitializeFunding,
            }}
          />

          <WalletCard
            icon={<ArrowRightLeft className="text-slate-500" size={24} />}
            badge={{
              text: "NGN ↔ POINTS",
              className: "bg-cyan-50/20 text-cyan-600",
            }}
            title="Points Exchange"
            description="Convert between Naira and Points instantly."
            hoverColor="hover:border-blue-500"
          >
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setExchangeModal("buy");
                  setInputValue("");
                  setResult(null);
                  setError(null);
                }}
                className="flex-1 py-3 border rounded-xl font-semibold cursor-pointer"
              >
                Buy
              </button>

              <button
                onClick={() => {
                  setExchangeModal("sell");
                  setInputValue("");
                  setResult(null);
                  setError(null);
                }}
                className="flex-1 py-3 border rounded-xl font-semibold cursor-pointer"
              >
                Sell
              </button>
            </div>

          </WalletCard>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-7">
          <TransferForm
            amount={amount}
            recipient={recipient}
            setAmount={setAmount}
            setRecipient={setRecipient}
            onSubmit={handleCreateTransfer}
          />
        </div>
      </div>

      <EscrowTable
        onRelease={(id: string) => console.log(id)}
        onDispute={(id: string) =>
          router.push(`/support/dispute?txid=${id}`)
        }
      />

      {/* EXCHANGE MODAL */}
      {exchangeModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 w-[90%] max-w-md rounded-2xl p-6 space-y-5 shadow-xl border dark:border-neutral-800">
            <div className="flex justify-between">
            <h2 className="text-lg font-bold capitalize">
              {exchangeModal} {exchangeModal !== "withdraw" && "Points"}
            </h2>
            <X onClick={()=>{setExchangeModal(null);
              setInputValue("");        
              setPin("");        
            }} className="cursor-pointer"/>
            </div>


            <p className="text-sm text-neutral-500 dark:text-neutral-300">
              {exchangeModal === "buy" &&
                "Convert your Naira balance into Points at a fixed rate of ₦1 = 100 points."}
              {exchangeModal === "sell" &&
                "Convert your Points back into Naira instantly at the current rate."}
              {exchangeModal === "withdraw" &&
                "Transfer your Naira balance to your linked bank account."}
            </p>

            {/* BALANCE */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-800 text-sm space-y-1">
              <p>NGN: ₦{wallet.ngn.toLocaleString()}</p>
              <p>Points: {wallet.points.toLocaleString()} pts</p>
            </div>

            {!result && (
              <>
                <Input
                  value={inputValue}
                  onChange={(e) =>
                    setInputValue(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter amount"
                  className="py-6"
                  autoComplete="off"
                />

                <Input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) =>
                    setPin(e.target.value.replace(/\D/g, ""))
                  }
                  autoComplete="off"
                  placeholder="Enter 4-digit PIN"
                  className="py-6"
                />

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                  onClick={handleAction}
                  disabled={!inputValue || loadingAction}
                  className="w-full py-3 bg-cyan-500 text-white rounded-xl flex items-center justify-center gap-2"
                >
                  {loadingAction && <Loader2 className="animate-spin" size={16} />}
                  {loadingAction ? "Processing..." : "Confirm"}
                </button>
              </>
            )}

            {/* SUCCESS STATE */}
            {result && (
              <div className="flex flex-col items-center text-center space-y-3 py-4">
                <CheckCircle2 className="text-green-500" size={48} />

                <h3 className="text-lg font-semibold">{result.title}</h3>
                <p className="text-sm dark:text-neutral-300 text-neutral-500">{result.desc}</p>

                <button
                  onClick={() => {
                    setExchangeModal(null);
                    setInputValue("");
                    setPin("");
                    setResult(null);
                  }}
                  className="w-full mt-3 py-3 bg-cyan-500 text-white rounded-xl"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}