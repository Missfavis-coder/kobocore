"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction } from "@/components/ui/card";
import { cn, formatDate, formatCurrency, formatCurr } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState, useMemo } from "react";
import { StatusBadge } from "../../../../components/shared/dashboard/status-badge";
import { transactions } from "@/components/shared/dashboard/sample-data";
import {
  Calendar,
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Loader,
} from "lucide-react";
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

/** ===== KOBOCORE TYPES ===== */
type TxType = "FUNDING" | "EXCHANGE" | "SETTLEMENT" | "WITHDRAWAL";
type TxStatus = "SUCCESS" | "PENDING" | "FAILED" | "HELD" | "DISPUTED";
type Asset = "NGN" | "PTS";

const TransactionTable = () => {
  const isMobile = useIsMobile();

  const [timeRange, setTimeRange] = useState<"90d" | "30d" | "7d">("90d");
  const [typeFilter, setTypeFilter] = useState<TxType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<TxStatus | "all">("all");
  const [search, setSearch] = useState("");

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d");
  }, [isMobile]);

  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [timeRange, typeFilter, statusFilter, search]);

  const filteredData = useMemo(() => {
    return transactions.filter((item) => {
      const date = new Date(item.createdAt);
      const now = new Date();

      const days =
        timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90;

      const start = new Date();
      start.setDate(now.getDate() - days);

      const matchesDate = date >= start;

      const query = search.toLowerCase();

      const matchesSearch =
        item.reference.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query);

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
    <div className="w-full">
      <Card>
        {/* FILTER BAR */}
        <div className="flex items-center justify-between p-2 gap-3 flex-wrap">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search reference or description..."
              className="pl-8 text-sm focus:ring-1 focus:ring-cyan-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 overflow-auto">
            {/* TYPE */}
            <CardAction>
              <ToggleGroup
                type="single"
                value={typeFilter}
                onValueChange={(val) =>
                  val && setTypeFilter(val as TxType | "all")
                }
                variant="outline"
                className="hidden @[767px]/card:flex"
              >
                <ToggleGroupItem value="all">All</ToggleGroupItem>
                <ToggleGroupItem value="FUNDING">Funding</ToggleGroupItem>
                <ToggleGroupItem value="EXCHANGE">Exchange</ToggleGroupItem>
                <ToggleGroupItem value="SETTLEMENT">Settlement</ToggleGroupItem>
                <ToggleGroupItem value="WITHDRAWAL">Withdrawal</ToggleGroupItem>
              </ToggleGroup>

              <Select
                value={typeFilter}
                onValueChange={(v) => setTypeFilter(v as TxType | "all")}
              >
                <SelectTrigger className="w-44 @[767px]/card:hidden cursor-pointer">
                  <span className="font-semibold">Type:</span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="FUNDING">Funding</SelectItem>
                  <SelectItem value="EXCHANGE">Exchange</SelectItem>
                  <SelectItem value="SETTLEMENT">Settlement</SelectItem>
                  <SelectItem value="WITHDRAWAL">Withdrawal</SelectItem>
                </SelectContent>
              </Select>
            </CardAction>

            {/* STATUS */}
            <CardAction>
              <ToggleGroup
                type="single"
                value={statusFilter}
                onValueChange={(val) =>
                  val && setStatusFilter(val as TxStatus | "all")
                }
                variant="outline"
                className="hidden @[767px]/card:flex"
              >
                <ToggleGroupItem value="all">All</ToggleGroupItem>
                <ToggleGroupItem value="SUCCESS">Success</ToggleGroupItem>
                <ToggleGroupItem value="PENDING">Pending</ToggleGroupItem>
                <ToggleGroupItem value="FAILED">Failed</ToggleGroupItem>
                <ToggleGroupItem value="HELD">Held</ToggleGroupItem>
                <ToggleGroupItem value="DISPUTED">Disputed</ToggleGroupItem>
              </ToggleGroup>

              <Select
                value={statusFilter}
                onValueChange={(v) =>
                  setStatusFilter(v as TxStatus | "all")
                }
              >
                <SelectTrigger className="w-44 @[767px]/card:hidden cursor-pointer focus:outline-none">
                  <span className="font-semibold">Status:</span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="SUCCESS">Success</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                  <SelectItem value="HELD">Held</SelectItem>
                  <SelectItem value="DISPUTED">Disputed</SelectItem>
                </SelectContent>
              </Select>
            </CardAction>

            {/* TIME */}
            <CardAction>
              <ToggleGroup
                type="single"
                value={timeRange}
                onValueChange={(val) =>
                  val && setTimeRange(val as "90d" | "30d" | "7d")
                }
                variant="outline"
                className="hidden @[767px]/card:flex"
              >
                <ToggleGroupItem value="90d">3 months</ToggleGroupItem>
                <ToggleGroupItem value="30d">30 days</ToggleGroupItem>
                <ToggleGroupItem value="7d">7 days</ToggleGroupItem>
              </ToggleGroup>

              <Select
                value={timeRange}
                onValueChange={(v) =>
                  setTimeRange(v as "90d" | "30d" | "7d")
                }
              >
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
          <TableHeader className="bg-cyan-500">
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
          {currentItems.length === 0 ? (
    <TableRow>
      <TableCell
        colSpan={7}
        className="text-center py-10 text-muted-foreground"
      >
        No transactions found for your search/filter.
      </TableCell>
    </TableRow>
  ) :
            (currentItems.map((txn) => (
              <TableRow key={txn.id} className="hover:bg-cyan-500/10">
                <TableCell>{formatDate(txn.createdAt)}</TableCell>
                <TableCell className="font-medium">{txn.reference}</TableCell>
                <TableCell className="text-muted-foreground">
                  {txn.description}
                </TableCell>

                <TableCell>{txn.type}</TableCell>

                <TableCell
                  className={cn(
                    "font-semibold",
                    txn.direction === "IN"
                      ? "text-emerald-500"
                      : "text-red-500"
                  )}
                >
            {formatCurr(txn.amount, txn.asset)}
                </TableCell>

                <TableCell>
                  <StatusBadge status={txn.status} />
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download /> Receipt
                      </DropdownMenuItem>

                      {txn.status === "FAILED" && (
                        <DropdownMenuItem className="text-red-500">
                          <Loader /> Retry Payment
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>

          {/* PAGINATION */}
<div className="p-4 flex justify-between items-center text-xs">
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
      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
      disabled={currentPage === 1}
    >
      Prev
    </Button>

    <Button
      size="sm"
      variant="ghost"
      onClick={() =>
        setCurrentPage((p) => Math.min(totalPages, p + 1))
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