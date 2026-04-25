"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Check, Wallet, ArrowRightLeft, Send } from "lucide-react";
import { formatToKobo } from "@/lib/utils";

interface Recipient {
  id: number;
  name: string;
  accountNumber: string;
  bankName: string;
  avatar?: string;
  isInitial?: boolean;
}

const banks = [
  { code: "opay", name: "OPay" },
  { code: "palmpay", name: "PalmPay" },
  { code: "gtbank", name: "GTBank" },
  { code: "wema", name: "Wema Bank" },
  { code: "ecobank", name: "Ecobank" }
];

export default function BankCardWithTransfer() {
  const address = "UQYGHHJSJ123gt";
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (err) {
      console.error("Copy failed", err);
    }
  };
  const walletBalance = 15050000; 


  return (
    <Card className="w-full rounded-md flex flex-col overflow-hidden shadow-3px ring-1 ring-neutral-200 dark:ring-neutral-800 ">

      <CardContent className="flex-1 flex flex-col justify-center items-center relative">
        <div className="relative w-full flex justify-center mt-4">
          <div className="relative w-[90%] max-w-[450px] aspect-[1.586/1] bg-gradient-to-br from-cyan-600 to-slate-800 text-white rounded-2xl p-6 shadow-2xl z-10 flex flex-col justify-between transform transition-transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <span className="text-xs md:text-sm font-medium opacity-90">KoboCore</span>
              <div className="w-8 h-6 md:w-10 md:h-8 bg-gradient-to-br from-yellow-300 to-yellow-500/70 rounded-md border border-white/20" />
            </div>
            <div className="py-2 md:py-3">
              <p className="text-sm md:text-xl tracking-[0.15em] font-mono">•••• •••• •••• 1234</p>
              <p className="text-[9px] md:text-[10px] mt-1 opacity-60 font-mono">08/29</p>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-[10px] md:text-xs opacity-70 uppercase">Ojo Adeshola</span>
              <span className="text-lg md:text-2xl font-black italic tracking-tight">VISA</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-5 mt-auto pb-8 w-full">

  {/* BALANCE */}
  <div className="flex flex-col gap-1">
    <span className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">
      Balance
    </span>
    <span className="text-lg font-black text-slate-900 dark:text-white">
      {formatToKobo(walletBalance)}
    </span>
  </div>

  {/* WALLET ADDRESS */}
  <div
    onClick={handleCopy}
    className="flex items-center justify-between w-full px-3 py-2 rounded-md border dark:border-neutral-800 bg-muted/40 hover:bg-muted transition cursor-pointer group"
  >
    <div className="flex flex-col">
      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
        Wallet Address
      </span>
      <span className="text-sm font-semibold text-slate-800 dark:text-white truncate max-w-[180px]">
        {address}
      </span>
    </div>

    <span className="text-gray-400 group-hover:text-cyan-500 transition">
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </span>
  </div>

  {/* ACTION HEADER */}
  <h3 className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">
    Quick Actions
  </h3>

  {/* ACTION BUTTONS */}
  <div className="grid grid-cols-1 gap-3 w-full">

    <button className="flex items-center gap-2 border dark:border-neutral-800 bg-white dark:bg-transparent text-slate-800 dark:text-white px-4 py-2.5 rounded-xl text-sm font-bold transition hover:bg-slate-100 dark:hover:bg-neutral-900 active:scale-95 cursor-pointer">
      <Wallet size={16} />
      Fund NGN
    </button>

    <button className="flex items-center gap-2 border dark:border-neutral-800 bg-white dark:bg-transparent text-slate-800 dark:text-white px-4 py-2.5 rounded-xl text-sm font-bold transition hover:bg-slate-100 dark:hover:bg-neutral-900 active:scale-95 cursor-pointer">
      <ArrowRightLeft size={16} />
      Exchange
    </button>

    <button className="flex items-center gap-2 border dark:border-neutral-800 bg-white dark:bg-transparent text-slate-800 dark:text-white px-4 py-2.5 rounded-xl text-sm font-bold transition hover:bg-slate-100 dark:hover:bg-neutral-900 active:scale-95 cursor-pointer">
      <Send size={16} />
      Transfer
    </button>

  </div>
</CardFooter>
    </Card>
  );
}