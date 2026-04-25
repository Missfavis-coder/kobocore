"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, AlertTriangle, Tag, Search } from "lucide-react";

type Notification = {
  id: string;
  type: "TRANSACTION" | "ALERT" | "PROMOTION";
  message: string;
  time: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  { id: "1", type: "TRANSACTION", message: "₦5,000 credited to your account", time: "2 mins ago", read: false },
  { id: "2", type: "ALERT", message: "New login from Chrome on Windows", time: "1 hr ago", read: false },
  { id: "3", type: "PROMOTION", message: "Get 5% cashback on groceries", time: "Yesterday", read: true },
  { id: "4", type: "TRANSACTION", message: "₦2,000 debited for Uber", time: "2 days ago", read: true },
];

export default function Page() {
  const [notifications, setNotifications] = React.useState(initialNotifications);
  const [search, setSearch] = React.useState("");

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const renderIcon = (type: Notification["type"]) => {
    switch (type) {
      case "TRANSACTION":
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case "ALERT":
        return <AlertTriangle className="text-red-500 w-5 h-5" />;
      case "PROMOTION":
        return <Tag className="text-blue-500 w-5 h-5" />;
    }
  };

  const filteredNotifications = notifications.filter(n =>
    n.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="md:p-4 p-2 space-y-4 ">
      <div className="mb-6">
        <h1 className="md:text-2xl text-xl tracking-wider font-bold">
        Notifications
        </h1>
        <p className="text-muted-foreground dark:text-cyan-50 text-xs md:text-sm mt-2 tracking-wider">Stay updated with all your transaction details and others.</p>

      </div>
      {/* Search bar with icon inside */}
      <div className="relative w-1/2 mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
        />
      </div>

      {filteredNotifications.length > 0 ? (
        filteredNotifications.map((notif) => (
          <Card
            key={notif.id}
            className={`border rounded-md ${notif.read ? "border-neutral-300 bg-gray-50 dark:bg-neutral-900 dark:border-neutral-800" : "border-neutral-200 dark:border-cyan-600 bg-white dark:bg-neutral-900"} py-2`}
          >
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {renderIcon(notif.type)}
                <CardTitle className="lg:text-sm text-xs font-medium flex-wrap">{notif.message}</CardTitle>
              </div>
              {!notif.read && (
                <Button className="cursor-pointer" size="sm" variant="ghost" onClick={() => markAsRead(notif.id)}>
                  Mark as read
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs text-gray-500">{notif.time}</CardDescription>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-400">No notifications found</p>
      )}
    </div>
  );
}