"use client";

import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import TransactionTable from "./_components/table";
import {  TransactionCards } from "./_components/transaction-card";


const TransactionContent = () => {
  

  return (
    <div className="p-2 lg:p-4 md:space-y-8 space-y-6 w-full pb-8 md:pb-12">
      {/* Header */}
      <div className="flex flex-wrap space-y-2  items-center justify-between ">
        <div>
          <h1 className="md:text-2xl text-xl tracking-wider font-bold">
            Transaction History
          </h1>
          <p className="text-muted-foreground dark:text-cyan-50 tracking-wider mt-2 text-xs md:text-sm">
            Manage your income and transactions history.
          </p>
        </div>

        <Button className="text-sm cursor-pointer dark:text-white bg-cyan-500 hover:bg-cyan-600">Download as CSV</Button>
      </div>
      <div>
      <TransactionCards
      />
      <TransactionTable/>
      </div>
    </div>
  );
};

const TransactionPage = () => {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <TransactionContent />
    </Suspense>
  );
};

export default TransactionPage;