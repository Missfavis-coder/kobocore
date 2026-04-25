"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, ArrowRightLeft, Copy, Check } from "lucide-react";

import { WalletCard } from "./_components/wallet-cards";
import { TransferForm } from "./_components/transfer-form";
import { EscrowTable } from "./_components/escrow-table";

export default function Page() {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleCreateTransfer = () => {
    console.log({ amount, recipient });
  };

  return (
    <div className=" lg:p-6 py-4 px-2 lg:space-y-12 space-y-6">
      
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold">Wallet & Funding</h1>
      </header>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-5 space-y-6">

          {/* Fund Wallet */}
          <WalletCard
            icon={<Plus className="text-cyan-600" size={24} />}
            badge={{
              text: "EXTERNAL BANK - NGN",
              className: "bg-slate-100/20 text-cyan-600",
            }}
            title="Fund Wallet"
            description="Top up your NGN ledger via instant bank transfer."
            hoverColor="hover:border-emerald-500"
            action={{
              label: "Initialize Funding",
            }}
          >
          </WalletCard>

          {/* Points Exchange */}
          <WalletCard
            icon={<ArrowRightLeft className="text-slate-500" size={24} />}
            badge={{
              text: "NGN to POINTS",
              className: "bg-cyan-50/20 text-cyan-600",
            }}
            title="Points Exchange"
            description="Convert NGN to Settlement Points (1:1)."
            hoverColor="hover:border-blue-500"
          >
            <div className="flex gap-2 mt-2">
              <button className="flex-1 py-3 border border-slate-200  shadow-3px dark:border-neutral-800 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer">
                Buy Points
              </button>
              <button className="flex-1 py-3 border border-slate-200 shadow-3px dark:border-neutral-800 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer">
                Sell Points
              </button>
            </div>
          </WalletCard>

        </div>

        {/* RIGHT SIDE */}
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

      {/* Escrow Table */}
      <EscrowTable
        onRelease={(id: string) => console.log(id)}
        onDispute={(id: string) =>
          router.push(`/support/dispute?txid=${id}`)
        }
      />
    </div>
  );
}