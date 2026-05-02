"use client";

import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TransactionCardProps = {
  id: string;
  title: string;
  value: number | string;
  description: string;
  subtitle?: string;
};

const MONTHS = [
  "jan","feb","mar","apr","may","jun",
  "jul","aug","sep","oct","nov","dec"
];

const MONTHLY_STATS: Record<string, TransactionCardProps[]> = {
  jan: [
    { 
      id: "ngn_vol", 
      title: "Cash Flow", 
      value: "₦450,000", 
      description: "Total money added to your wallet" 
    },
    { 
      id: "pts_exchanged", 
      title: "Points Balance Change", 
      value: "320,000 PTS", 
      description: "Points created from your cash" 
    },
    { 
      id: "escrow", 
      title: "Pending Release", 
      value: "50,000 PTS", 
      description: "Funds waiting to be completed" 
    },
    { 
      id: "disputes", 
      title: "Open Issues", 
      value: "0", 
      description: "No problems this month" 
    },
  ],

  feb: [
    { 
      id: "ngn_vol", 
      title: "Cash Flow", 
      value: "₦820,000", 
      description: "Total money added to your wallet" 
    },
    { 
      id: "pts_exchanged", 
      title: "Points Balance Change", 
      value: "610,000 PTS", 
      description: "Points created from your cash" 
    },
    { 
      id: "escrow", 
      title: "Pending Release", 
      value: "120,000 PTS", 
      description: "Funds waiting to be completed" 
    },
    { 
      id: "disputes", 
      title: "Open Issues", 
      value: "1", 
      description: "Needs your attention", 
      subtitle: "Review now" 
    },
  ],

  mar: [
    { 
      id: "ngn_vol", 
      title: "Cash Flow", 
      value: "₦1,250,000", 
      description: "Total money added to your wallet" 
    },
    { 
      id: "pts_exchanged", 
      title: "Points Balance Change", 
      value: "850,400 PTS", 
      description: "Points created from your cash" 
    },
    { 
      id: "escrow", 
      title: "Pending Release", 
      value: "205,000 PTS", 
      description: "Funds waiting to be completed" 
    },
    { 
      id: "disputes", 
      title: "Open Issues", 
      value: "2", 
      description: "Action needed", 
      subtitle: "Resolve soon" 
    },
  ],
};

export function TransactionCards() {
  const currentMonthIndex = new Date().getMonth();
  const currentMonth = MONTHS[currentMonthIndex];

  const defaultMonth =
    currentMonth in MONTHLY_STATS
      ? currentMonth
      : Object.keys(MONTHLY_STATS)[0];

  const [selectedMonth, setSelectedMonth] = React.useState(defaultMonth);

  const stats = MONTHLY_STATS[selectedMonth] || [];

  return (
    <div className="space-y-5 px-2">

      {/* MONTH SWITCHER */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {MONTHS.map((month, index) => {
          const hasData = month in MONTHLY_STATS;
          const isFuture = index > currentMonthIndex;
          const isActive = selectedMonth === month;
          const disabled = !hasData || isFuture;

          return (
            <Button
              key={month}
              size="sm"
              disabled={disabled}
              onClick={() => setSelectedMonth(month)}
              className={cn(
                "rounded-full px-4 capitalize text-xs font-semibold transition-all duration-200",
                isActive
                  ? "bg-cyan-500 text-white shadow-md scale-105"
                  : "bg-white/60 dark:bg-neutral-900/40 backdrop-blur border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-slate-300",
                !disabled && "hover:scale-105 hover:shadow-sm",
                disabled && "opacity-30 cursor-not-allowed"
              )}
            >
              {month}
            </Button>
          );
        })}
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <TransactionCard key={stat.id} {...stat} />
        ))}
      </div>
    </div>
  );
}

function TransactionCard({
  title,
  value,
  description,
  subtitle,
}: TransactionCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-md p-5 border bg-white/70 dark:bg-neutral-950/40 backdrop-blur-md",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
      )}
    >
      {/* soft glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-cyan-500/10 via-transparent to-slate-500/10" />

      <CardHeader className="p-0 space-y-2 relative z-10">
        <CardDescription className="text-[8px] font-semibold uppercase tracking-widest dark:text-neutral-400 text-neutral-600 whitespace-nowrap ">
          {title}
          {subtitle && (
          <span className="inline-flex w-fit mt-1 px-2 py-1 rounded-md bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
            {subtitle}
          </span>
        )}
        </CardDescription>

        <CardTitle className="text-xl  font-black tracking-tight">
          {value}
        </CardTitle>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>

      </CardHeader>
    </Card>
  );
}