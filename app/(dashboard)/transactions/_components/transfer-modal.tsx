"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function TransferModal() {
  const [loading, setLoading] = React.useState(false);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      toast.success("Transfer successful 🎉", {
        description: "Your money has been sent.",
      });
    }, 1500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Send Money</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Funds</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleTransfer} className="space-y-4 mt-2">
          <input
            type="text"
            placeholder="Recipient Account"
            className="w-full border rounded-md p-2 text-sm"
            required
          />

          <input
            type="number"
            placeholder="Amount (₦)"
            className="w-full border rounded-md p-2 text-sm"
            required
          />

          <Button className="w-full" disabled={loading}>
            {loading ? "Processing..." : "Transfer"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}