"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction } from "@/components/ui/card";
import { cn, formatCurr } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState, useMemo, Suspense } from "react";
import { formatDate, formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/dashboard/status-badge";
import { transactions } from "@/components/shared/dashboard/sample-data";
import { Calendar, Search, MoreHorizontal, Eye, Download, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const RecentTransactions = () => {


  return (
    <div className=" w-full p-4 lg:p-4">

     <div className="flex flex-wrap space-y-2  items-center justify-between">
        <div>
          <h1 className="md:text-2xl text-xl font-bold">
            Recent Transactions
          </h1>
        </div>

        <Link href="/transactions" className="text-sm underline cursor-pointer">See More</Link>
      </div>

      <Card className="scrollbar-hide">
        {/* TABLE */}
        <Table >
          <TableHeader className="bg-cyan-500">
            <TableRow >
              <TableHead className="text-white" >Date</TableHead>
              <TableHead className="text-white">Reference</TableHead>
              <TableHead className="text-white">Description</TableHead>
              <TableHead className="text-white">Type</TableHead>
              <TableHead className="text-white">Amount</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Action</TableHead> 
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.slice(0,4).map((txn) => (
              <TableRow key={txn.id} className="hover:bg-cyan-500/10 ">
                <TableCell>{formatDate(txn.createdAt)}</TableCell>
                <TableCell className="text-sm">
                  {txn.reference}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {txn.description}
                </TableCell>
                <TableCell>{txn.type}</TableCell>
                <TableCell
                  className={cn(
                    "font-semibold text-sm",
                    txn.type === "FUNDING"
                      ? "text-emerald-500"
                      : "text-red-500"
                  )}
                >
                  {formatCurr(txn.amount, txn.asset)}
                </TableCell>
                <TableCell>
                  <StatusBadge status={txn.status} />
                </TableCell>

                {/* ACTION BUTTON */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button  className="cursor-pointer" size="icon" variant="ghost">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="cursor-pointer p-1.5" align="end">
                      <DropdownMenuItem className="whitespace-nowrap"><Eye/>View Details</DropdownMenuItem>
                      <DropdownMenuItem className="whitespace-nowrap"><Download/>Receipt</DropdownMenuItem>

                      {txn.status === "FAILED" && (
                        <DropdownMenuItem className="text-red-500 whitespace-nowrap">
                          <Loader/>
                          Retry Payment
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>


      </Card>
    </div>
  );
};


export default RecentTransactions;