"use client"
import { Skeleton } from "@/components/ui/skeleton";
import  { useEffect } from "react";
//import { SectionCards } from "../../components/layouts/dashboard/section-cards";
//import { ChartAreaInteractive } from "../../components/layouts/dashboard/chart-area-interactive";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SectionCards } from "./_components/overview-card";
import { ChartAreaInteractive } from "@/components/shared/dashboard/chat-area-interactive";
import BankCard from "./_components/bank-card";
import RecentTransactions from "./_components/recent-transactions";


const page = () => {
  const router = useRouter();
  

  return (
    <div className="flex bg-background flex-1 flex-col ">
      <div className="@container/main flex flex-1 flex-col ">
      <header className="flex justify-between items-center my-4 px-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-wide">Welcome back, Adeshola</h1>
          <p className="text-neutral-500 dark:text-cyan-100 text-sm mt-2">Here's what's happening with your accounts today.</p>
        </div>
      </header>

        <div className="flex flex-col gap-4 py-4  md:py-6 pb-8 md:pb-10">

          <div className="flex-1 grid lg:grid-cols-3 gap-2 ">

            <div className="mx-2 mb-2 ">
              <BankCard
              />
            </div>

            <div className="lg:col-span-2 flex-col " >
              <SectionCards />
              <ChartAreaInteractive/>
            </div>

          </div>

          <RecentTransactions/>
          
        </div>
      </div>
    </div>
  );
};

export default page;
