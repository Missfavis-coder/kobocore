"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
import { StatusBadge } from "../../../../components/shared/dashboard/status-badge";
import { transactions } from "../../../../components/shared/dashboard/sample-data";
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

const TransactionTable = () => {
  const isMobile = useIsMobile();

  const [timeRange, setTimeRange] = useState("90d");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d");
  }, [isMobile]);

  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return transactions.filter((item) => {
      const date = new Date(item.createdAt);
      const now = new Date();

      let days = 90;
      if (timeRange === "30d") days = 30;
      if (timeRange === "7d") days = 7;

      const start = new Date();
      start.setDate(now.getDate() - days);

      const matchesDate = date >= start;

      const matchesSearch =
        item.reference.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "all" || item.type === typeFilter;

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesDate && matchesSearch && matchesType && matchesStatus;
    });
  }, [timeRange, search, typeFilter, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData]);

  return (
    <div className=" w-full ">

      <Card>
        {/* FILTER BAR */}
        <div className="flex items-center justify-between p-2 gap-3 flex-wrap">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search reference or description..."
              className="pl-8 text-sm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-2 overflow-auto">

            <CardAction>
              <ToggleGroup
                type="single"
                value={typeFilter}
                onValueChange={(val) => val && setTypeFilter(val)}
                variant="outline"
                className="hidden @[767px]/card:flex"
              >
                <ToggleGroupItem value="all">All</ToggleGroupItem>
                <ToggleGroupItem value="DEBIT">Debit</ToggleGroupItem>
                <ToggleGroupItem value="CREDIT">Credit</ToggleGroupItem>
              </ToggleGroup>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40 @[767px]/card:hidden cursor-pointer">
                  <span className="font-semibold">Type:</span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="DEBIT">Debit</SelectItem>
                  <SelectItem value="CREDIT">Credit</SelectItem>
                </SelectContent>
              </Select>
            </CardAction>

            <CardAction>
              <ToggleGroup
                type="single"
                value={statusFilter}
                onValueChange={(val) => val && setStatusFilter(val)}
                variant="outline"
                className="hidden @[767px]/card:flex"
              >
                <ToggleGroupItem value="all">All</ToggleGroupItem>
                <ToggleGroupItem value="SUCCESS">Success</ToggleGroupItem>
                <ToggleGroupItem value="FAILED">Failed</ToggleGroupItem>
                <ToggleGroupItem value="PENDING">Pending</ToggleGroupItem>
              </ToggleGroup>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 @[767px]/card:hidden cursor-pointer">
                  <span className="font-semibold">Status:</span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="SUCCESS">Success</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                </SelectContent>
              </Select>
            </CardAction>

            <CardAction>
              <ToggleGroup
                type="single"
                value={timeRange}
                onValueChange={(val) => val && setTimeRange(val)}
                variant="outline"
                className="hidden @[767px]/card:flex"
              >
                <ToggleGroupItem value="90d">3 months</ToggleGroupItem>
                <ToggleGroupItem value="30d">30 days</ToggleGroupItem>
                <ToggleGroupItem value="7d">7 days</ToggleGroupItem>
              </ToggleGroup>

              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40 @[767px]/card:hidden cursor-pointer">
                  <Calendar />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="90d">3 months</SelectItem>
                  <SelectItem value="30d">30 days</SelectItem>
                  <SelectItem value="7d">7 days</SelectItem>
                </SelectContent>
              </Select>
            </CardAction>
          </div>
        </div>

        {/* TABLE */}
        <Table>
          <TableHeader className="bg-cyan-500 ">
            <TableRow>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Reference</TableHead>
              <TableHead className="text-white">Description</TableHead>
              <TableHead className="text-white">Type</TableHead>
              <TableHead className="text-white">Amount</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentItems.map((txn) => (
              <TableRow key={txn.id} className="hover:bg-cyan-500/10">
                <TableCell>{formatDate(txn.createdAt)}</TableCell>
                <TableCell className="font-medium">
                  {txn.reference}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {txn.description}
                </TableCell>
                <TableCell>{txn.type}</TableCell>
                <TableCell
                  className={cn(
                    "font-semibold",
                    txn.type === "CREDIT"
                      ? "text-emerald-500"
                      : "text-red-500"
                  )}
                >
                  {formatCurrency(txn.amount, txn.type)}
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

                    <DropdownMenuContent className="cursor-pointer" align="end">
                      <DropdownMenuItem><Eye/>View Details</DropdownMenuItem>
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

        {/* PAGINATION */}
        <div className="p-4 flex justify-between text-xs">
          <p>
            {filteredData.length === 0
              ? "0 results"
              : `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                  currentPage * itemsPerPage,
                  filteredData.length
                )} of ${filteredData.length}`}
          </p>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                setCurrentPage((p) => Math.max(1, p - 1))
              }
              disabled={currentPage === 1}
            >
              Prev
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(totalPages, p + 1)
                )
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};


export default TransactionTable;