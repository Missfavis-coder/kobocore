"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ShieldCheck, Landmark } from "lucide-react";
import { formatToKobo } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function SectionCards() {
  const ngnBalance = 15050000;
  const pointsBalance = 124500;
  const escrowPoint = 113500;

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 px-2">
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
        "relative overflow-hidden rounded-md border transition-all duration-100",
        "bg-white/70 dark:bg-neutral-950/40 backdrop-blur-md",
        "hover:-translate-y-1 hover:shadow-xl group "
      )}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />

      <div
        className={cn(
          "absolute top-0 left-0 h-1 w-full"
        )}
      />

      <CardHeader className="p-4 space-y-2 relative z-10">

        <div className="flex justify-between items-start">
          <CardDescription className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            {title}
          </CardDescription>

          <div
            className={cn(
              "p-2.5 rounded-xl",
              isCash
                ? "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30"
                : isEscrow
                ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30"
                : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30"
            )}
          >
            {isCash ? (
              <Landmark size={18} />
            ) : (
              <ShieldCheck size={18} />
            )}
          </div>
        </div>

        <CardTitle className="lg:text-2xl text-xl font-black tracking-tight">
          {isCash ? value : `${value} pts`}
        </CardTitle>

        <p className="text-[10px] text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardHeader>

      <div
        className={cn(
          "absolute -right-8 -bottom-8 opacity-[0.05]",
          isEscrow ? "text-amber-500" : "text-slate-900 dark:text-white"
        )}
      >
        {isCash ? <Landmark size={150} /> : <ShieldCheck size={150} />}
      </div>
    </Card>
  );
}