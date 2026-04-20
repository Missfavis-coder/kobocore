"use client";

import Navbar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="min-h-screen px-6 py-20 mt-25 max-w-6xl mx-auto">
      
      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="md:text-4xl text-2xl tracking-wide font-serif">
          Simple, <span className="text-cyan-600 tracking-wider italic">transparent</span>  pricing
        </h1>
        <p className="text-muted-foreground md:text-[15px] texxt-sm font-body">
          Only pay when you use KoboCore. No hidden charges.
        </p>
      </div>

      <div className="mt-20 grid md:grid-cols-3 gap-6">
  {[
    {
      title: "You only pay when you use it",
      desc: "No subscriptions or maintenance fees. Just simple usage-based pricing.",
    },
    {
      title: "Transparent caps",
      desc: "Every transaction has a maximum fee, so you’re always in control.",
    },
    {
      title: "Fast and reliable",
      desc: "Enjoy instant transfers without hidden bank charges.",
    },
  ].map((item) => (
    <div key={item.title} className="p-6 border rounded-2xl">
      <h3 className="font-heading text-lg">{item.title}</h3>
      <p className="text-sm text-muted-foreground mt-2">
        {item.desc}
      </p>
    </div>
  ))}
</div>

      {/* Table */}
      <div className="mt-16">
        <h2 className="md:text-2xl text-xl font-heading mb-6">Full breakdown</h2>
        <div className="border rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <tbody>
              {[
                ["Account creation", "Free"],
                ["Wallet funding", "Free"],
                ["Local transfers", "1.5% (max ₦2,000)"],
                ["International transfers", "3.9% + ₦100"],
                ["Withdrawals", "Free"],
              ].map(([item, price]) => (
                <tr key={item} className="border-b">
                  <td className="p-4">{item}</td>
                  <td className="p-4 font-medium">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
        <h2 className="md:text-2xl text-[22px] tracking-wider text-cyan-600">
          Start sending money smarter
        </h2>
        <Button className="mt-4 dark:text-cyan-600 px-4 py-2 dark:bg-cyan-50 bg-cyan-500 text-cyan-50">Create Free Account</Button>
      </div>
    </div>
  );
}