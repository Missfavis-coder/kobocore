
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ShieldCheck, Landmark } from "lucide-react";
import { formatToKobo, cn } from "@/lib/utils";

export function SectionCards() {
  const ngnBalance = 15050000;
  const pointsBalance = 124500;
  const escrowPoint = 113500;

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 gap-4 px-2 lg:grid-cols-3">
        <StatCard
          title="NGN Balance"
          value={formatToKobo(ngnBalance)}
          description="Available for withdrawal or exchange"
          type="cash"
        />

        <StatCard
          title="Settlement Points"
          value={pointsBalance.toLocaleString()}
          description="Available for settlement"
          type="points"
        />

        <StatCard
          title="Escrow Hold"
          value={escrowPoint.toLocaleString()}
          description="Unavailable until conditions are met"
          type="escrow"
        />
      </div>
    </TooltipProvider>
  );
}

function StatCard({
  title,
  value,
  description,
  type,
}: {
  title: string;
  value: string;
  description: string;
  type: "cash" | "points" | "escrow";
}) {
  const isCash = type === "cash";
  const isEscrow = type === "escrow";

  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-xl border border-neutral-200",
        "bg-transparent shadow-none transition-all duration-200 dark:border-neutral-900",
        " hover:shadow-sm"
      )}
    >
      <CardHeader className="relative z-10 p-5">
        <div className="flex items-center justify-between">
          <CardDescription className="text-xs font-medium tracking-wide text-neutral-500">
            {title}
          </CardDescription>

          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg",
              isCash && "bg-cyan-50 text-cyan-600",
              isEscrow && "bg-amber-50 text-amber-600",
              !isCash && !isEscrow && "bg-indigo-50 text-indigo-600"
            )}
          >
            {isCash ? (
              <Landmark size={17} strokeWidth={2} />
            ) : (
              <ShieldCheck size={17} strokeWidth={2} />
            )}
          </div>
        </div>

        <div className="mt-5">
          <CardTitle className="text-2xl font-semibold tracking-tight dark:text-white text-neutral-900">
            {isCash ? value : `${value} pts`}
          </CardTitle>

          <p className="mt-2 text-xs leading-relaxed text-neutral-500">
            {description}
          </p>
        </div>
      </CardHeader>

      <div
        className={cn(
          "pointer-events-none absolute -bottom-10 -right-8 opacity-[0.035]",
          isEscrow ? "text-amber-600" : "text-neutral-400"
        )}
      >
        {isCash ? <Landmark size={150} /> : <ShieldCheck size={150} />}
      </div>
    </Card>
  );
}

