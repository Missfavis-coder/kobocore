
"use client";

import { useEffect, useState } from "react";
import { SectionCards } from "./_components/overview-card";
import { ChartAreaInteractive } from "@/components/shared/dashboard/chat-area-interactive";
import BankCard from "./_components/bank-card";
import RecentTransactions from "./_components/recent-transactions";
import { supabase } from "@/lib/supabase/client";

const Page = () => {
  const [firstName, setFirstName] = useState("there");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const fullName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        "";

      const name = fullName.split(" ")[0];

      setFirstName(name || "there");
    };

    getUser();
  }, []);

  return (
    <div className="flex flex-1 flex-col bg-background">
      <div className="@container/main flex flex-1 flex-col">
        <header className="my-4 flex items-center justify-between px-2">
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-slate-900 dark:text-white">
              Welcome back, {firstName}
            </h1>

            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
              Here's what's happening with your accounts today.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-4 py-4 pb-8 md:py-6 md:pb-10">
          <div className="grid flex-1 gap-2 lg:grid-cols-3">
            <div className="mx-2 mb-2">
              <BankCard />
            </div>

            <div className="flex-col lg:col-span-2">
              <SectionCards />
              <ChartAreaInteractive />
            </div>
          </div>

          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};

export default Page;

