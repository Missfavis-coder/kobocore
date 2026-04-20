"use client"

import * as React from "react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"
import { usePathname } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
    subItems?: {
      title: string
      url: string
      icon?: React.ReactNode
    }[]
  }[]
}) {

  const pathname = usePathname() 


  const isActive = (url: string) => pathname === url

  return (
    <SidebarGroup>
      <SidebarMenu className="mt-4">
        {items.map((item, index) => {
          const active = isActive(item.url)

          return (
            <Link href={item.url} key={item.title} className="mx-2 ">
              <SidebarMenuButton
                className={`flex justify-between items-center py-6 px-4 m-1 gap-2 cursor-pointer rounded-md font-light dark:text-white text-gray-600 hover:bg-cyan-400 hover:text-white ${
                  active ? "bg-cyan-500 text-white" : "hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-4 ">
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </div>
              </SidebarMenuButton>
            </Link>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}