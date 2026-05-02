"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";

import { DealsTabs } from "./_components/deals-tabs";
import { DealCard } from "./_components/deal-card";
import { EmptyState } from "./_components/empty-state";



export type DealStatus = "RELEASE_REQUESTED" | "DISPUTED";
export type Deal = {
    id: string;
    recipient: string;
    amount: string;
    status: DealStatus;
    date: string;
  };
  
  export const MOCK_DEALS: Deal[] = [
    {
      id: "KC-TX-101",
      recipient: "@tech_guru",
      amount: "150,000",
      status: "RELEASE_REQUESTED",
      date: "1h ago",
    },
    {
      id: "KC-TX-102",
      recipient: "@design_pro",
      amount: "45,000",
      status: "RELEASE_REQUESTED",
      date: "3h ago",
    },
    {
      id: "KC-TX-103",
      recipient: "@content_hub",
      amount: "12,000",
      status: "RELEASE_REQUESTED",
      date: "5h ago",
    },
    {
      id: "KC-TX-104",
      recipient: "@dev_ops",
      amount: "90,000",
      status: "RELEASE_REQUESTED",
      date: "Yesterday",
    },
    {
      id: "KC-TX-105",
      recipient: "@logic_build",
      amount: "200,000",
      status: "RELEASE_REQUESTED",
      date: "Yesterday",
    },
    {
      id: "KC-TX-DISP-01",
      recipient: "@shady_vendor",
      amount: "500,000",
      status: "DISPUTED",
      date: "2 days ago",
    },
    {
      id: "KC-TX-DISP-02",
      recipient: "@ghost_user",
      amount: "30,000",
      status: "DISPUTED",
      date: "3 days ago",
    },
  ];

export default function MyDealsPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "disputed">("pending");

  const pendingDeals = MOCK_DEALS.filter(
    (d) => d.status === "RELEASE_REQUESTED"
  );

  const disputedDeals = MOCK_DEALS.filter(
    (d) => d.status === "DISPUTED"
  );

  const currentDeals =
    activeTab === "pending" ? pendingDeals : disputedDeals;

  return (
    <div className="  lg:p-6 py-4 px-2 space-y-8">

      {/* ✅ HEADER (kept inline) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            My Deals
          </h1>
          <p className="text-neutral-500 dark:text-cyan-100 text-sm mt-2">
            Review, approve, or challenge your active settlements.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">

{/* Search Input */}
<div className="relative w-full md:w-[280px]">
  
  <Search
    size={16}
    className="absolute left-3 top-1/2 -translate-y-1/2"
  />

  <input
    placeholder="Search ID or user..."
    className="w-full h-11 pl-9 pr-3 text-sm rounded-xl border dark:text-white border-slate-200 dark:border-neutral-800 bg-transparent text-sm outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all dark:shadow-sm"
  />
</div>

{/* Filter Button */}
<button className="h-11 px-3 flex items-center justify-center rounded-xl border border-slate-200 dark:border-neutral-800 transition-all shadow-sm cursor-pointer">
  <Filter size={16} />
</button>

</div>
      </div>

      {/* TABS */}
      <DealsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingDeals.length}
        disputedCount={disputedDeals.length}
      />

      {/* LIST */}
      <div className="space-y-4">
        {currentDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} type={activeTab} />
        ))}

        {currentDeals.length === 0 && (
          <EmptyState
            message={
              activeTab === "pending"
                ? "All clear! No pending approvals."
                : "Great! You have no active disputes."
            }
          />
        )}
      </div>
    </div>
  );
}