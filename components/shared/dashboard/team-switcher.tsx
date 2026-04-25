"use client"

import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Wallet } from "lucide-react"

type Team = {
  name: string
  logo: React.ReactNode
  plan: string
}

export function TeamSwitcher({ teams }: { teams: Team[] }) {
  const [activeTeam] = React.useState<Team>(teams[0])

  if (!activeTeam) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="gap-4 m-2 hover:bg-slate-500/10 data-[state=open]:bg-sidebar-accent"
        >
          {/* LOGO */}
          <div className="flex size-10 items-center justify-center rounded-lg bg-slate-700 dark:bg-cyan-600 text-white p-2">
            {activeTeam.logo ?? <Wallet />}
          </div>

          {/* TEAM INFO */}
          <div className="flex flex-col text-left leading-tight">
            <span className="truncate font-bold text-sm">
              {activeTeam.name}
            </span>
            <span className="truncate text-xs text-neutral-400">
              {activeTeam.plan}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}