// SidebarContext.tsx
"use client"
import { createContext, useState, useEffect,  useRef, useContext } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation"


type SidebarContextType = {
  isOpenMobile: boolean;
  toggleMobile: () => void;
  isCollapsedDesktop: boolean;
  toggleDesktop: () => void;
  sortMenu: PageType;
  handleNavButton: (page: PageType) => void;
  handleClickOutside: () => void;
  handleNewProducts: () =>  void;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  //isMobile: boolean; 
  newProducts: boolean;
};
export type PageType = "Overview" | "Upload" | "Password" | "Settings" | "Notification";

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);


export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used inside SidebarProvider");
  return context;
};

export const SidebarProvider = ({ children }: { children: ReactNode }) => {

  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isCollapsedDesktop, setIsCollapsedDesktop] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [newProducts, setNewProducts]  = useState(false);
  const pathname = usePathname();
  const[sortMenu, setSortMenu] = useState<PageType>("Overview");


  const handleNewProducts = () => {
    setNewProducts(!newProducts)
  }

  const handleNavButton = (pathname: PageType) => {
     setSortMenu(pathname);   
     setIsOpenMobile(false);
  }

  const handleClickOutside = () => {
     setIsOpenMobile(false)
  };



  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
     // setIsMobile(mobile);

      if (mobile) {
        
        setIsCollapsedDesktop(false);
      } else {
        
        setIsOpenMobile(false);
      }

    };
    window.addEventListener("resize", handleResize);
    handleResize(); 
    
    return () => {
       window.removeEventListener("resize", handleResize)
    }
  }, []);
  

  const toggleMobile = () => setIsOpenMobile((prev) => !prev);
  const toggleDesktop = () => setIsCollapsedDesktop((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{ isOpenMobile, sidebarRef, sortMenu, handleNewProducts, newProducts, handleClickOutside,  handleNavButton, toggleMobile, isCollapsedDesktop, toggleDesktop }}
    >
    {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
