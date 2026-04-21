"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeftRight, Banknote, ChevronRight, PhoneCall, Upload, UserPlus } from "lucide-react";
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
  { code: "ecobank", name: "Ecobank" },
];

export default function BankCardWithTransfer() {
  const [step, setStep] = React.useState(1);
  const [selectedRecipient, setSelectedRecipient] =
    React.useState<Recipient | null>(null);

  const [amount, setAmount] = React.useState("");

  const [accountNumber, setAccountNumber] = React.useState("");
  const [bankCode, setBankCode] = React.useState("");

  const [resolvedName, setResolvedName] = React.useState("");
  const [resolving, setResolving] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const [pinnedRecipients, setPinnedRecipients] =
    React.useState<Recipient[]>([
      {
        id: 1,
        name: "Ada",
        accountNumber: "0123456789",
        bankName: "GTBank",
      },
      {
        id: 2,
        name: "Tunde",
        accountNumber: "9876543210",
        bankName: "Access Bank",
      },
    ]);

  // 🔥 Simulate backend resolve
  const resolveAccount = () => {
    if (accountNumber.length !== 10 || !bankCode) return;

    setResolving(true);
    setResolvedName("");

    setTimeout(() => {
      setResolvedName("OJO ADESHOLA");
      setResolving(false);
    }, 1000);
  };

  React.useEffect(() => {
    resolveAccount();
  }, [accountNumber, bankCode]);

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedRecipient && !resolvedName) {
        return toast.error(
          "Enter valid account details and wait for verification"
        );
      }
    }

    if (step === 2 && (!amount || Number(amount) <= 0)) {
      return toast.error("Enter a valid amount!");
    }

    setStep((prev) => prev + 1);
  };

  const handleSend = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const name = selectedRecipient?.name || resolvedName;
      const bank =
        selectedRecipient?.bankName ||
        banks.find((b) => b.code === bankCode)?.name;

      toast.success("Transfer Successful", {
        description: `₦${amount} sent to ${name}`,
      });

      // ✅ Save verified recipient
      if (!selectedRecipient) {
        setPinnedRecipients((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            name: resolvedName,
            accountNumber,
            bankName: bank || "",
          },
        ]);
      }

      // reset
      setStep(1);
      setSelectedRecipient(null);
      setAmount("");
      setAccountNumber("");
      setBankCode("");
      setResolvedName("");
    }, 1500);
  };
  const walletBalance = 15050000; 


  return (
    <Card className="w-full rounded-3xl flex flex-col overflow-hidden shadow-3px ring-1 ring-neutral-200 dark:ring-neutral-800 ">

      <CardContent className="flex-1 flex flex-col justify-center items-center relative">
        <div className="relative w-full flex justify-center mt-4">
          <div className="relative w-[90%] max-w-[410px] aspect-[1.586/1] bg-gradient-to-br from-cyan-600 to-slate-800 text-white rounded-2xl p-6 shadow-2xl z-10 flex flex-col justify-between transform transition-transform hover:-translate-y-1">
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


      <CardFooter className="flex-col items-start gap-3 mt-auto pb-10">
        <div className="flex gap-2 items-center">
          <span className="text-gray-400 uppercase font-semibold tracking-wider text-xs" >Balance: </span>
          <span className="font-bold text-slate-800 dark:text-white">{formatToKobo(walletBalance)}</span>
        </div>
        <h3 className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
          Quick Transfer
        </h3>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full cursor-pointer hover:bg-slate-600 hover:text-white">
              Transfer <ArrowLeftRight />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transfer Funds</DialogTitle>
            </DialogHeader>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="flex flex-col gap-4 mt-4">
                <p className="text-sm dark:text-gray-300 text-gray-500">
                  Select recipient or enter account
                </p>

                {/* PINNED */}
                <div className="flex gap-2 overflow-x-auto">
                  {pinnedRecipients.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => setSelectedRecipient(user)}
                      className={`p-2 border rounded-xl ${
                        selectedRecipient?.id === user.id
                          ? "border-cyan-500"
                          : ""
                      }`}
                    >
                      {user.name}
                    </button>
                  ))}
                </div>

                {/* NEW ENTRY */}
                {!selectedRecipient && (
                  <>
                    <input
                      placeholder="Account Number"
                      className="border p-3 rounded-xl"
                      value={accountNumber}
                      onChange={(e) =>
                        setAccountNumber(e.target.value)
                      }
                    />

                    <select
                      className="border p-3 rounded-xl dark:bg-black"
                      value={bankCode}
                      onChange={(e) =>
                        setBankCode(e.target.value)
                      }
                    >
                      <option value="">Select Bank</option>
                      {banks.map((bank) => (
                        <option key={bank.code} value={bank.code}>
                          {bank.name}
                        </option>
                      ))}
                    </select>

                    {resolving && (
                      <p className="text-sm text-gray-400">
                        Verifying account...
                      </p>
                    )}

                    {resolvedName && (
                      <div className="p-3 bg-green-50 rounded-xl">
                        <p className="font-semibold text-green-600">
                          {resolvedName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {
                            banks.find(
                              (b) => b.code === bankCode
                            )?.name
                          }
                        </p>
                      </div>
                    )}
                  </>
                )}

                <Button className="cursor-pointer" onClick={handleNextStep}>
                  Next
                </Button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="flex flex-col gap-4 mt-4">
                <input
                  type="number"
                  placeholder="₦0.00"
                  className="border p-3 rounded-xl"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <Button 
                className="cursor-pointer"
                onClick={handleNextStep}>
                  Confirm Recipient
                </Button>

                <Button
                className="cursor-pointer"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="flex flex-col gap-4 mt-4">
                <div className="border p-4 rounded-xl">
                  <p>
                    <b>Name:</b>{" "}
                    {selectedRecipient?.name ||
                      resolvedName}
                  </p>
                  <p>
                    <b>Account:</b>{" "}
                    {selectedRecipient?.accountNumber ||
                      accountNumber}
                  </p>
                  <p>
                    <b>Bank:</b>{" "}
                    {selectedRecipient?.bankName ||
                      banks.find(
                        (b) => b.code === bankCode
                      )?.name}
                  </p>
                  <p>
                    <b>Amount:</b> ₦{amount}
                  </p>
                </div>

                <Button
                  onClick={handleSend}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Money"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* QUICK LIST */}
        <div className="flex justify-between w-full mt-3">
          <p className="text-sm text-gray-400">
            Quick transfer
          </p>
          <ChevronRight />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {pinnedRecipients.slice(0,3).map((user) => (
            <button
              key={user.id}
              className="p-2 border rounded-xl text-xs"
            >
              {user.name}
            </button>
          ))}
          <div className="p-2 border rounded-xl">
            <UserPlus size={14} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}