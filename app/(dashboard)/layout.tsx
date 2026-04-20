import { AppSidebar } from "@/components/shared/dashboard/app-sidebar";
import { NavMain } from "@/components/shared/dashboard/nav-main";
import Navbar from "@/components/shared/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar variant="sidebar" />
      <SidebarInset className="bg-background flex flex-col h-svh overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden lg:px-4 px-2">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
