"use client";

import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:bg-neutral-700/20 bg-cyan-50 dark:border-white/10 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">

    
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

          <div className="col-span-2 md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold tracking-wider md:tracking-wide">
              Kobocore
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs">
              Modern infrastructure for seamless digital payments and financial experiences.
            </p>

            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="p-2 rounded-lg border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 transition"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href="#"
                className="p-2 rounded-lg border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 transition"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="#"
                className="p-2 rounded-lg border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 transition"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* PRODUCT */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Product</h3>
            <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              <li><Link href="#">Features</Link></li>
              <li><Link href="#">Pricing</Link></li>
              <li><Link href="#">Integrations</Link></li>
              <li><Link href="#">Updates</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              <li><Link href="#">About</Link></li>
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
              <li><Link href="#">Security</Link></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} Kobocore. All rights reserved.</p>

          <div className="flex gap-4">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}