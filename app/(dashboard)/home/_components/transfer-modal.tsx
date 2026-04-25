"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, ChevronRight, UserPlus } from "lucide-react";
import { toast } from "sonner";

// ---------- TYPES ----------
interface Recipient {
  id: number;
  name: string;
  accountNumber: string;
  bankName: string;
}

// ---------- BANKS ----------
const banks = [
  { code: "opay", name: "OPay" },
  { code: "palmpay", name: "PalmPay" },
  { code: "gtbank", name: "GTBank" },
  { code: "wema", name: "Wema Bank" },
  { code: "ecobank", name: "Ecobank" },
];

// ---------- COMPONENT ----------
export function TransferModal({
  walletBalance,
  pinnedRecipients,
  setPinnedRecipients,
  formatToKobo,
}: {
  walletBalance: number;
  pinnedRecipients: Recipient[];
  setPinnedRecipients: React.Dispatch<React.SetStateAction<Recipient[]>>;
  formatToKobo: (n: number) => string;
}) {
  const [step, setStep] = React.useState(1);

  const [selectedRecipient, setSelectedRecipient] =
    React.useState<Recipient | null>(null);

  const [accountNumber, setAccountNumber] = React.useState("");
  const [bankCode, setBankCode] = React.useState("");
  const [resolvedName, setResolvedName] = React.useState("");
  const [resolving, setResolving] = React.useState(false);

  const [amount, setAmount] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // ---------- MOCK RESOLVE ----------
  React.useEffect(() => {
    if (accountNumber.length === 10 && bankCode) {
      setResolving(true);
      setResolvedName("");

      setTimeout(() => {
        setResolvedName("OJO ADESHOLA");
        setResolving(false);
      }, 1000);
    }
  }, [accountNumber, bankCode]);

  const nextStep = () => setStep((s) => s + 1);

  const handleSend = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      toast.success("Transfer Successful", {
        description: `₦${amount} sent successfully`,
      });

      // save recipient
      if (!selectedRecipient && resolvedName) {
        setPinnedRecipients((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            name: resolvedName,
            accountNumber,
            bankName:
              banks.find((b) => b.code === bankCode)?.name || "",
          },
        ]);
      }

      // reset
      setStep(1);
      setSelectedRecipient(null);
      setAccountNumber("");
      setBankCode("");
      setResolvedName("");
      setAmount("");
    }, 1200);
  };

  return (
    <div className="w-full mt-4">
      {/* BALANCE */}
      <div className="flex gap-2 items-center mb-3">
        <h3 className="text-xs  text-gray-400 uppercase font-semibold">
          Balance:
        </h3>

        <span className="text-sm font-bold">
          {formatToKobo(walletBalance)}
        </span>
      </div>

      {/* MODAL */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full cursor-pointer">
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
              <p className="text-sm text-gray-500">
                Select recipient or enter account
              </p>

              {/* pinned */}
              <div className="flex gap-2 overflow-x-auto">
                {pinnedRecipients.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => setSelectedRecipient(user)}
                    className="p-2 border rounded-xl"
                  >
                    {user.name}
                  </button>
                ))}
              </div>

              {/* manual entry */}
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
                    className="border p-3 rounded-xl"
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
                    <p className="text-green-600 font-semibold">
                      {resolvedName}
                    </p>
                  )}
                </>
              )}

              <Button onClick={nextStep}>Next</Button>
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

              <Button onClick={nextStep}>Confirm</Button>

              <Button variant="outline" onClick={() => setStep(1)}>
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
                  {selectedRecipient?.name || resolvedName}
                </p>
                <p>
                  <b>Amount:</b> ₦{amount}
                </p>
              </div>

              <Button onClick={handleSend}>
                {loading ? "Sending..." : "Send Money"}
              </Button>

              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* QUICK ACTIONS */}
      <div className="flex justify-between w-full mt-4 text-sm text-gray-400">
        <p>Quick transfer</p>
        <ChevronRight />
      </div>

      <div className="flex gap-2 overflow-x-auto mt-2">
        {pinnedRecipients.slice(0, 3).map((user) => (
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
    </div>
  );
}