"use client";

import React, { useState, useMemo } from 'react';
import { 
  Search, Rocket, Users, CreditCard, ShieldCheck, 
  Mail, MessageSquare, ChevronRight, ArrowLeft, Send, CheckCircle2
} from 'lucide-react';

// --- Mock Data ---
const CATEGORIES = [
  { id: 'getting-started', icon: Rocket, title: "Getting Started", desc: "Learn the basics of PayVault", count: 5, color: "bg-cyan-100/30 text-cyan-600 dark:bg-cyan-100/10" },
  { id: 'payers', icon: Users, title: "Managing Payers", desc: "How to add and manage payers", count: 8, color: "bg-slate-50 dark:bg-slate-50/10 text-slate-600" },
  { id: 'payments', icon: CreditCard, title: "Payment Methods", desc: "Understanding payment methods", count: 6, color: "bg-emerald-50 dark:bg-emerald-50/10 text-emerald-600" },
  { id: 'security', icon: ShieldCheck, title: "Security & Privacy", desc: "Keep your account secure", count: 4, color: "bg-orange-50 text-orange-600 dark:bg-orange-50/10" },
];

const ARTICLES = [
  { id: 1, title: "How to add a new payer", category: "Managing Payers", views: "1.2k", content: "To add a new payer, navigate to the Payers tab and click 'Add New'. Fill in the required bank details and save." },
  { id: 2, title: "Setting up payment methods", category: "Payment Methods", views: "980", content: "You can link credit cards or bank accounts. Go to Settings > Payments to manage your active methods." },
  { id: 3, title: "Understanding activity logs", category: "Getting Started", views: "845", content: "Activity logs track every transaction and setting change. You can export these as CSV or PDF." },
  { id: 4, title: "Enabling two-factor authentication", category: "Security & Privacy", views: "750", content: "Keep your account safe by enabling 2FA in the Security tab using Authenticator apps." },
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<typeof ARTICLES[0] | null>(null);
  const [isChatting, setIsChatting] = useState(false);

  
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(art => 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  
  if (selectedArticle) {
    return (
      <div className=" p-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-2 text-gray-500 hover:text-slate-600 mt-4 mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} /> Back to Help Center
        </button>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">{selectedArticle.category}</span>
          <h1 className="lg:text-2xl text-xl font-bold text-gray-900 mt-2 mb-2">{selectedArticle.title}</h1>
          <p className="text-gray-600 leading-relaxed ">{selectedArticle.content}</p>
          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">Was this article helpful?</p>
            <div className="flex gap-4">
              <button className="px-6 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-medium cursor-pointer">Yes</button>
              <button className="px-6 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-medium cursor-pointer">No</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <div className=" border-b dark:border-neutral-800 border-gray-200 mb-8">
        <div className=" px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="lg:text-2xl text-xl tracking-wider font-bold text-gray-900 dark:text-white">Help & Support</h1>
            <p className="text-muted-foreground dark:text-neutral-500 text-xs md:text-sm mt-2 tracking-wider">Find answers and get help with KoboCore</p>
          </div>
        </div>
      </div>

      <main className=" px-4">
        {/* Interactive Search Hero */}
        <section className=" rounded-2xl p-10 border dark:border-gray-800 border- mb-12">
          <h2 className="lg:text-2xl text-xl font-bold mb-6 text-center">How can we help you?</h2>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles, guides, and FAQs..." 
              className="w-full pl-12 pr-4 py-2 bg-gray-50 dark:bg-transparent border border-gray-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
            />
          </div>
        </section>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className=" p-6 rounded-xl border border-gray-100 dark:border-neutral-800 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${cat.color}`}>
                <cat.icon size={24} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{cat.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">{cat.desc}</p>
              <span className="text-xs font-semibold text-emerald-600">{cat.count} articles</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Article List Section */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {searchQuery ? `Search Results (${filteredArticles.length})` : "Popular Articles"}
              </h2>
              {!searchQuery && <button className="text-cyan-600 text-sm font-semibold hover:underline cursor-pointer">View all</button>}
            </div>
            
            <div className="space-y-3">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((art) => (
                  <div 
                    key={art.id} 
                    onClick={() => setSelectedArticle(art)}
                    className="flex justify-between items-center p-5 rounded-xl  border border-gray-100 dark:border-neutral-800  hover:border-cyan-500 hover:shadow-sm cursor-pointer group transition-all"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-cyan-600 dark:group-hover:text-cyan-600 transition-colors dark:text-white">{art.title}</h4>
                      <p className="text-xs text-gray-400 dark:text-gray-300 mt-1">{art.category} • {art.views} views</p>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                  </div>
                ))
              ) : (
                <div className="text-center py-12 rounded-xl border border-dashed border-gray-200">
                  <p className="text-gray-400">No articles found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact & Interaction Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-6">Contact Support</h2>
            
            {/* Email Card */}
            <div className="p-6 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 text-cyan-600 bg-cyan-50 dark:bg-cyan-50/10 rounded-xl"><Mail size={24} /></div>
                <div>
                  <p className="font-bold">Email Support</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Typical reply: 24 hours</p>
                </div>
              </div>
              <a href="mailto:support@payvault.com" className="block w-full text-center py-3 rounded-lg border border-gray-200 font-medium hover:bg-gray-50 transition-colors dark:border-neutral-800">
                support@kobocore.com
              </a>
            </div>

            {/* Live Chat Interactive Card */}
            <div className="p-6 rounded-xl dark:border-neutral-800 border border-gray-100 shadow-sm overflow-hidden relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-50/10 text-slate-600 rounded-xl"><MessageSquare size={24} /></div>
                <div>
                  <p className="font-bold">Live Chat</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Average response: 5 mins</p>
                </div>
              </div>
              
              {isChatting ? (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                   <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-4">
                     Connecting you to an agent...
                   </div>
                   <button 
                    onClick={() => setIsChatting(false)}
                    className="w-full py-2 text-xs text-gray-400 hover:text-red-500"
                   >
                     Cancel
                   </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsChatting(true)}
                  className="w-full py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={16} /> Start Chat
                </button>
              )}
            </div>

            {/* Quick Status Check */}
            <div className="p-4 bg-cyan-50 dark:bg-cyan-50/10 border border-cyan-100 dark:border-cyan-500 rounded-xl flex items-center gap-3">
              <CheckCircle2 size={18} className="text-cyan-600" />
              <p className="text-xs font-medium text-cyan-800">All systems operational</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}