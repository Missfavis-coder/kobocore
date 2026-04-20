"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { calculateStats, formatToKobo } from "@/lib/utils";
import { transactions } from "../../../../components/shared/dashboard/sample-data";

// Lucide Icons
import { Wallet, ArrowDownCircle, ArrowUpCircle, TrendingUp } from "lucide-react";

type StatCardProps = {
  id: string;
  title: string;
  value: number | string;
  description: string;
  subtitle?: string;
};

export function SectionCards() {
  const walletBalance = 15050000; // from API
  const { income, expense } = calculateStats(transactions);
  const netValue = income - expense;

  const STATS: StatCardProps[] = [
    {
      id: "balance",
      title: "Balance",
      value: formatToKobo(walletBalance),
      description: "Available wallet balance",
      subtitle: "Safe to spend",
    },
    {
      id: "income",
      title: "Income",
      value: formatToKobo(income),
      description: "Total money received",
      subtitle: "This period",
    },
    {
      id: "expense",
      title: "Expenses",
      value: formatToKobo(expense),
      description: "Total money spent",
      subtitle: "This period",
    },
    {
      id: "net",
      title: "Cash Flow",
      value: formatToKobo(netValue),
      description: "Income minus expenses",
      subtitle: netValue >= 0 ? "Positive flow" : "Negative flow",
    },
  ];

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 gap-4 px-2 lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>
    </TooltipProvider>
  );
}

const statConfig = {
  balance: {
    icon: Wallet,
    color: "text-blue-600 bg-blue-100",
  },
  income: {
    icon: ArrowDownCircle,
    color: "text-green-600 bg-green-100",
  },
  expense: {
    icon: ArrowUpCircle,
    color: "text-red-600 bg-red-100",
  },
  net: {
    icon: TrendingUp,
    color: "", // will set dynamically in component
  },
};

export function StatCard({ id, title, value, description, subtitle }: StatCardProps) {
  const Icon = statConfig[id as keyof typeof statConfig]?.icon;
  let color = statConfig[id as keyof typeof statConfig]?.color || "";


  if (id === "net") {
    color = Number(value.toString().replace(/,/g, "")) >= 0 ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100";
  }

  return (
    <Card className="ring-1 ring-neutral-200 dark:ring-neutral-800 hover:shadow-md transition duration-200">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardDescription className="text-sm text-muted-foreground dark:text-neutral-400">{title}</CardDescription>
          {Icon && (
            <div className={`p-2 rounded-full flex items-center justify-center ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>

        <CardTitle className="text-xl font-bold text-neutral-800 dark:text-white tabular-nums">{value}</CardTitle>

      </CardHeader>
    </Card>
  );
}