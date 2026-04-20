"use client";
import { PageType, useSidebar } from "../providers/sidebar-provider";
import { Bell, Coins, File, Home, Key, Settings, SidebarIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


type NavItem = {
    title: string;
    id: PageType;
    url: string;
    icon: React.ElementType;
  };
const navItems: NavItem[] = [
    {
      title: "Overview",
      id: "Overview",
      url: "/overview",
      icon: Home,
    },
    {
      title: "Upload",
      id: "Upload",
      url: "/upload",
      icon: File,
    },
    {
        title: "Saved Passwords",
        id: "Password",
        url: "/password",
        icon: Key,
      },
    {
      title: "Notification",
      id: "Notification",
      url: "/notification",
      icon: Bell,
    },
    {
      title: "Setting",
      id: "Settings",
      url: "/settings",
      icon: Settings,
    }
];

const Sidebar = () => {
  const {
    isCollapsedDesktop,
    isOpenMobile,
    toggleDesktop,
    handleClickOutside,
    handleNavButton,
  } = useSidebar();

  const isSidebarOpen = isOpenMobile || !isCollapsedDesktop;
  const pathname = usePathname();

  //Disable scroll on mobile sidebar open
  useEffect(() => {
    document.body.style.overflow = isOpenMobile ? "hidden" : "auto";
  }, [isOpenMobile]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpenMobile && (
        <div
          className="fixed z-1892 inset-0  backdrop-blur-[5px]"
          onClick={handleClickOutside}
        />
      )}

      {/* Sidebar */}
      <div className="fixed z-3200 bg-gradient-to-t from-green-50 to-blue-100/10 left-0 top-0">
        <div
          className={`
            fixed left-0 top-0 h-screen flex-col justify-between
            ${isOpenMobile ? "block w-70" : "hidden lg:flex"}
            sticky pt-6 pb-12 z-10 border-r border-neutral-200
            transition-all duration-200
            ${isCollapsedDesktop ? "lg:w-20" : "lg:w-64"}
          `}
        >
          {/* Top */}
          <div>
            <div className={`flex items-center justify-between  ${!isCollapsedDesktop ? "px-4" : "px-6"} `}>
              <div className={`flex items-center  `}>
                {!isCollapsedDesktop && (
                  <h1 className="flex items-center gap-2 text-xl font-bold text-black">
                    <button className="bg-green-950 px-2 py-2 text-white rounded-md"> <Coins/></button>
                    StoreFiles
                  </h1>
                )}
              </div>

              {/* Collapse Button (only desktop) */}
              <div className="ml-2 hidden lg:flex">
                <SidebarIcon className="cursor-pointer" onClick={toggleDesktop} />
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-16 text-16px text-white lg:flex flex-col">
              <nav className="flex-1 space-y-6 px-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.url === "/dashboard"
                       ? pathname === "/dashboard"
                      : pathname.startsWith(item.url);


                  return (
                    <Link href={item.url} key={item.id}>
                      <button
                        onClick={() => handleNavButton(item.id)}
                        className={`
                          w-full flex mt-2 gap-3 px-2 py-3
                          outline-none  transition-all duration-200
                          cursor-pointer rounded-md 
                          ${
                            isActive
                              ? "bg-green-800/30 text-green-950 shadow-blue-500/30"
                              : "text-green-900 hover:bg-green-200/20"
                          }
                          ${
                            isCollapsedDesktop ? "justify-center" : "justify-start"
                          }
                        `}
                      >
                        <Icon className={`shrink-0 ${isActive ? "text-green-950" : "text-green-900"}`} size={20} />
                        {isSidebarOpen && (
                          <span className="text-[14px] font-light">{item.title}</span>
                        )}
                      </button>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Bottom User Section */}
          <div className="px-4">
         
            <div
              className={`
               absolute bottom-5 flex
                ${isCollapsedDesktop ? "mt-50" : "mt-40"}
              `}
            >
              <Link href="/profile">
                <div className={` flex items-center bg-green-200/10 rounded-md p-2 gap-3
              ${isCollapsedDesktop ? "justify-center" : "justify-start"}`}>
                  <div className="bg-green-950 rounded-full h-10 w-10 flex items-center justify-center text-white">
                    A
                  </div>
                  {!isCollapsedDesktop && ( 
                    <div className="text-[14px] overflow-hidden min-w-0">
                      <p className="font-medium truncate">User</p>
                      <p className="text-green-900 text-xs truncate">user@gmail.com</p>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
