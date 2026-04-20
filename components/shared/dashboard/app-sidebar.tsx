"use client"

import * as React from "react"

import { NavMain } from "@/components/shared/dashboard/nav-main"
import { NavUser } from "@/components/shared/dashboard/nav-user"
import { TeamSwitcher } from "@/components/shared/dashboard/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { HomeIcon, CreditCardIcon, BarChart2Icon, SettingsIcon, DollarSignIcon, PieChartIcon, Wallet, Banknote, Bell, LifeBuoy } from "lucide-react"

const data = {
  user: {
    name: "Ojo Adeshola",
    email: "ofavourmi55@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "KoboCore",
      logo: <DollarSignIcon />,
      plan: "Safe Transaction Always",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "/overview",
      icon: <HomeIcon />,
      isActive: true,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: <BarChart2Icon />,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: <Bell />,
    },
    {
      title: "Help & Support",
      url: "/help&support",
      icon: <LifeBuoy />,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <SettingsIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}