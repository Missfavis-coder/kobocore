"use client";

import { useSidebar } from "../providers/sidebar-provider";
import { useRef, useState, useEffect, JSX } from "react";
import { usePathname, useRouter } from "next/navigation";
import {  ArrowRightSquare, Bell, Box, Coins, Home, Settings, ShoppingBasket, Sun, User } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useTheme } from "@/lib/hooks/use-theme";
import { Input } from "../ui/input";

const routeConfig: Record<string, { title: string; icon: JSX.Element }> = {
  dashboard: { title: "Dashboard", icon: <Home /> },
  products: { title: "Products", icon: <Box /> },
  categories: { title: "Categories", icon: <Coins /> },
  orders: { title: "Orders", icon: <ShoppingBasket /> },
};


function Navbar() {
  const { isOpenMobile, isCollapsedDesktop } = useSidebar();
  const {toggleTheme}  = useTheme()
  const profileRef = useRef<HTMLDivElement | null>(null);
  const path = usePathname();
  const router = useRouter();
  const last = path.split("/")[path.split("/").length - 1];
  const [showProfile, setShowProfile] = useState(false);
  const current = routeConfig[last] ?? { title: last, icon: null };

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);





  return (
    <header
      className={`
        sticky flex justify-between gap-2 items-center
        lg:px-6 px-2 lg:py-3.5 z-50 py-2 border-b dark:border-neutral-800 border-neutral-200
        transition-all duration-200 bg-[#fffff] text-black 
        ${isCollapsedDesktop ? "lg:ml-4" : "lg:ml-0"}
      `}
    >
        <div className="flex items-center md:gap-4 gap-2">
          <SidebarTrigger className="-ml-1 cursor-pointer dark:text-white" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 dark:border-neutral-600 data-vertical:self-auto"
            />
          <div className="flex items-center ">
           {!isOpenMobile && (
             <Input
              type="text"
              placeholder="Search transactions..."
              autoComplete="off"
              className="
              h-10 px-4 rounded-md
              border border-neutral-300 dark:text-white dark:border-neutral-800 text-sm outline-none
              focus:ring-1 focus:border-none focus:ring-cyan-600
              transition-all md:max-w-60 max-w-50
              "
             />
           )}
          </div>
        </div>
        <div className="flex md:gap-6 gap-2">
         {/* Right */}
         <div className="flex items-center gap-2">
          
         <div className="flex items-center md:gap-2 gap-1">
           <button
            className="flex items-center gap-2"
            >
              <Link href="/notifications" className=" ">
                <Bell className=" w-4 h-4 dark:text-white"/>
              </Link>
           </button>
           <Separator
              orientation="vertical"
              className="mr-1 data-vertical:h-4 dark:border-neutral-600 data-vertical:self-auto"
            />
           <button
            className="flex items-center gap-2"
            >
              <div onClick={toggleTheme} className="border border-neutral-400 dark:border-neutral-800 rounded-full w-8 h-8 flex items-center justify-center text-green-950 dark:text-cyan-700 cursor-pointer shadow-2xl">
                <Sun className=" w-4 h-4"/>
              </div>
           </button>
           <div  className="relative" ref={profileRef}>
           <button
            onClick={() => setShowProfile((prev) => !prev)}
            className="flex items-center gap-2"
            >
              <div className="border border-neutral-400 dark:border-neutral-800 dark:text-cyan-700 rounded-full w-8 h-8 flex items-center justify-center text-slate-600 cursor-pointer shadow-2xl">
                <User className=" w-4 h-4"/>
              </div>
           </button>
           {showProfile && (
            <div className="absolute right-0 mt-4 w-56 rounded-md border border-neutral-200 dark:border-neutral-950 dark:bg-neutral-900 bg-white z-50">
              <div
              className="flex items-center gap-2 px-4 py-2 text-xs "
              onClick={() => setShowProfile(false)}
               >
                <div className="flex flex-col">
                  <span className="font-semibold dark:text-slate-300 text-slate-900">Ojo Adeshola</span>
                  <span className="text-xs dark:text-neutral-300">ofavourmi55@gmail.com</span>
                </div>

              </div>

              <Link
              href="/settings"
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-neutral-500/10 cursor-pointer dark:text-white"
              onClick={() => setShowProfile(false)}
              >
                <Settings size={18} className="text-cyan-500"/>
                Settings
              </Link>

              <hr className="my-1 border-neutral-200 dark:border-neutral-800" />

            <Link
              href="login"
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-neutral-500/10 dark:text-white"
              onClick={() => setShowProfile(false)}
            >
              <ArrowRightSquare size={18} className="text-cyan-500"/>
              Sign out
            </Link>
          </div>
            )}
           </div>
         </div>
         </div>
         </div>
    </header>
  );
}

export default Navbar;
