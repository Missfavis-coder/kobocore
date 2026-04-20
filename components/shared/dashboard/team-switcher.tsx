"use client"

import * as React from "react"

import {
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Wallet } from "lucide-react"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ReactNode
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [Team, SetTeam] = React.useState(teams)

  if (!Team) {
    return null
  }

  return (
    <SidebarMenu className="">
      <SidebarMenuItem >
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-slate-500/10 gap-4 m-2 "
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-slate-700 dark:bg-cyan-600 text-sidebar-primary-foreground p-2">
                <Wallet/>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {Team.map((t, index) =>(
                  <div key={index} tabIndex={index} className="grid flex-1 text-left text-sm ">
                     <span className="truncate font-bold">{t.name}</span>
                     <span className="truncate text-xs">{t.plan}</span>
                  </div>
                ))}
              </div>
            </SidebarMenuButton>
            <DropdownMenuSeparator />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
