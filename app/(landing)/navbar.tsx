"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { HeadsetIcon, Sun } from "lucide-react";
import { navigationLink } from "@/components/config/settings";
//import { useAuth } from "@/app/components/providers/auth-provider";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/hooks/use-theme";


export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();
    const pathname = usePathname();
    const {toggleTheme}  = useTheme()

	//const { isAuthenticated } = useAuth();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
        <header className="fixed top-4 md:top-8 left-0 right-0 z-50 px-4">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5 md:py-4 flex items-center justify-between border border-neutral-200 rounded-full bg-card dark:bg-neutral-800/50 backdrop-blur-lg dark:border-neutral-800">
                <div className="flex items-center">
                    <Link href="/">
                       <span className="font-bold text-[16px]"><span className="text-cyan-500">Kobo</span>Core</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navigationLink.map(({ name, link }, index) => {
                        const isActive = pathname === link;
                        return (
                            <Link
                                key={`${name}-${index}`}
                                href={link}
                                className={` capitalize text-[15px] ${isActive ? "font-bold text-cyan-500" : " hover:text-neutral-600 hover:dark:text-neutral-400"}`}
                            >
                                {name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop CTA Buttons */}
                <div className="hidden md:flex items-center space-x-4">

                    <button
                        className="flex items-center gap-2"
                     >
                      <div onClick={toggleTheme} className="border border-neutral-400 dark:border-neutral-800 rounded-full w-8 h-8 flex items-center justify-center text-green-950 dark:text-cyan-700 cursor-pointer shadow-2xl">
                       <Sun className=" w-4 h-4"/>
                      </div>
                    </button>
                    <button
                        onClick={() => (router.push("/login"))}
                        className="p-2 bg-cyan-500 text-sm text-white rounded-md transition-colors text-bold cursor-pointer hover:bg-cyan-400"
                        aria-label="Support"
                    >
                        Get Started
                    </button>
                </div>

                {/* Mobile Hamburger Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 text-foreground"
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 z-40 bg-black/10 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={toggleMenu}
                >
                    <div
                        className="fixed top-18 left-4 right-4 bg-card/40 rounded-md border border-border animate-in fade-in zoom-in-95 slide-in-from-top-5 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <nav className="flex flex-col p-6 space-y-4">
                            {navigationLink.map(({ name, link }, index) => {
                                const isActive = pathname === link;
                                return (
                                    <Link
                                        key={`${name}-${index}`}
                                        href={link}
                                        className={`capitalize text-[15px] transition-colors ${
                                        isActive
                                    ? "font-bold text-cyan-500"
                                     : " hover:text-neutral-700"}`}
                                        onClick={toggleMenu}
                                    >
                                        {name}
                                    </Link>
                                );
                            })}
                            <div className="pt-4 border-t border-border flex flex-col space-y-3">
                                <button
                                    className="flex items-center text-[15px] justify-center bg-cyan-500 text-white gap-2 w-full text-center border border-border px-6 py-3 rounded-md font-medium hover:bg-cyan-400 transition-colors cursor-pointer"
                                >
                                    Get Started
                                    
                                </button>
                               {/*** <button
                                    onClick={() => {
                                        router.push(isAuthenticated ? "/dashboard" : "/login");
                                        toggleMenu();
                                    }}
                                    className="block w-full text-center bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                                >
                                    {isAuthenticated ? "Dashboard" : "Sign In"}
                                </button> */}
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}
