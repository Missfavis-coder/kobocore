"use client";

type Props = {
  activeTab: "pending" | "disputed";
  setActiveTab: (tab: "pending" | "disputed") => void;
  pendingCount: number;
  disputedCount: number;
};

export function DealsTabs({
  activeTab,
  setActiveTab,
  pendingCount,
  disputedCount,
}: Props) {
  return (
    <div className="flex gap-4 border-b border-slate-200 dark:border-neutral-800 ">
      {/* Pending */}
      <button
        onClick={() => setActiveTab("pending")}
        className={`pb-4 px-2 text-sm font-bold relative cursor-pointer ${
          activeTab === "pending"
            ? "text-slate-900 dark:text-white"
            : "text-gray-400  hover:text-gray-400"
        }`}
      >
        Needs Approval
        <span className="ml-2 bg-slate-900 text-white px-2 py-0.5 rounded-full text-[10px]">
          {pendingCount}
        </span>

        {activeTab === "pending" && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900 dark:bg-cyan-600 rounded-t-full" />
        )}
      </button>

      {/* Disputed */}
      <button
        onClick={() => setActiveTab("disputed")}
        className={`pb-4 px-2 text-sm font-bold relative cursor-pointer ${
          activeTab === "disputed"
            ? "text-red-600"
            : "text-slate-400 dark:text-white hover:text-slate-600"
        }`}
      >
        In Dispute
        <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px]">
          {disputedCount}
        </span>

        {activeTab === "disputed" && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-t-full" />
        )}
      </button>
    </div>
  );
}