"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type ExpenseItem = {
  label: string;
  amount: number;
};

type ExpenseInsightCardProps = {
  total?: number;
  data?: ExpenseItem[];
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(value);
};

export default function ExpenseInsightCard({
  total = 0,
  data = [],
}: ExpenseInsightCardProps) {
  const hasData = data.length > 0;

  return (
    <Card className="w-full max-w-xs rounded-2xl border shadow-sm hover:shadow-md transition">
      <CardContent className="p-4 space-y-3">
        
        {/* Top */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Expenses • Last 3 days
          </p>

          <div className="p-2 rounded-xl bg-red-50">
            <ArrowUpRight className="w-4 h-4 text-red-500" />
          </div>
        </div>

        {/* Total */}
        <h3 className="text-lg font-semibold tracking-tight">
          {formatCurrency(total)}
        </h3>

        {/* Breakdown OR Empty */}
        {hasData ? (
          <div className="space-y-1">
            {data.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-muted-foreground">
                  {item.label}
                </span>
                <span className="font-medium">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            No expenses recorded
          </p>
        )}

        {/* See more */}
        <Link
          href="/transactions"
          className="text-xs font-medium text-cyan-500 hover:underline inline-block"
        >
          See more →
        </Link>
      </CardContent>
    </Card>
  );
}