"use client";

import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    { id: "transactions", title: "Transactions", value: "120", description: "Total count" },
    { id: "debits", title: "Total Debit", value: "₦10,000", description: "Money spent" },
    { id: "credits", title: "Total Credit", value: "₦20,000", description: "Money received" },
    { id: "pending", title: "Pending", value: "₦2,000", description: "Processing" },
  ],
  feb: [
    { id: "transactions", title: "Transactions", value: "200", description: "Total count" },
    { id: "debits", title: "Total Debit", value: "₦15,000", description: "Money spent" },
    { id: "credits", title: "Total Credit", value: "₦35,000", description: "Money received" },
    { id: "pending", title: "Pending", value: "₦5,000", description: "Processing" },
  ],
  mar: [
    { id: "transactions", title: "Transactions", value: "260", description: "Total count" },
    { id: "debits", title: "Total Debit", value: "₦22,000", description: "Money spent" },
    { id: "credits", title: "Total Credit", value: "₦60,000", description: "Money received" },
    { id: "pending", title: "Pending", value: "₦6,000", description: "Processing" },
  ],
};

export function TransactionCards() {

  const currentMonthIndex = new Date().getMonth(); 

  const defaultMonth =
    MONTHS[currentMonthIndex] in MONTHLY_STATS
      ? MONTHS[currentMonthIndex]
      : Object.keys(MONTHLY_STATS).slice(-1)[0];

  const [selectedMonth, setSelectedMonth] = React.useState(defaultMonth);

  const stats = MONTHLY_STATS[selectedMonth] || [];

  return (
    <div className="space-y-4 px-2">
      
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {MONTHS.map((month, index) => {
          const hasData = month in MONTHLY_STATS;
          const isFuture = index > currentMonthIndex;

          const disabled = !hasData || isFuture;
          const isActive = selectedMonth === month;


          return (
            <Button
              key={month}
              size="sm"
              variant={selectedMonth === month ? "default" : "outline"}
              onClick={() => setSelectedMonth(month)}
              disabled={disabled}
              className={`
                px-3 py-1 rounded-full text-sm
                transition capitalize cursor-pointer 
                ${isActive ? "bg-cyan-500 text-white hover:bg-cyan-600" : "bg-transparent border border-gray-300 dark:border-neutral-800 dark:text-white text-gray-700"}
                ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-cyan-700"}
              `}
            >
              {month}
            </Button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-4">
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
    <Card className="relative overflow-hidden rounded-xl p-4 border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition" />

      <CardHeader className="p-0 space-y-2 relative z-10">
        <CardDescription className="text-xs text-muted-foreground">
          {title}
        </CardDescription>

        <CardTitle className="text-lg md:text-xl font-semibold tracking-tight">
          {value}
        </CardTitle>

        <p className="text-xs text-muted-foreground">{description}</p>

        {subtitle && (
          <span className="text-[10px] font-medium text-primary">
            {subtitle}
          </span>
        )}
      </CardHeader>
    </Card>
  );
}