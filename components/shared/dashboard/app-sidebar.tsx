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

import {
  Home,
  WalletCards,
  BarChart2,
  Bell,
  LifeBuoy,
  Settings,
  DollarSign,
  HandHeart,
  Wallet,
} from "lucide-react"


const Icons = {
  home: <Home />,
  wallet: <WalletCards />,
  deals: <HandHeart />,
  transactions: <BarChart2 />,
  notifications: <Bell />,
  support: <LifeBuoy />,
  settings: <Settings />,
  team: <Wallet />,
}


const data = {
  user: {
    name: "Ojo Adeshola",
    email: "ofavourmi55@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },

  teams: [
    {
      name: "KoboCore",
      logo: Icons.team,
      plan: "Safe Transaction Always",
    },
  ],

  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: Icons.home,
      isActive: true,
    },
    {
      title: "Wallet & Funding",
      url: "/wallet",
      icon: Icons.wallet,
    },
    {
      title: "My Deals",
      url: "/deals",
      icon: Icons.deals,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: Icons.transactions,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Icons.notifications,
    },
    {
      title: "Help & Support",
      url: "/help-support",
      icon: Icons.support,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Icons.settings,
    },
  ],
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
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