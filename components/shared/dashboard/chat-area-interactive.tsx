"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "KoboCore Wallet Activity (Income vs Expenses)"

// 🔥 REALISTIC KOBOCODE MOCK DATA (kobo-based)
const chartData = [
  { date: "2026-01-01", income_kobo: 2500000, expense_kobo: 1200000 }, // salary + spending
  { date: "2026-01-03", income_kobo: 0, expense_kobo: 800000 },
  { date: "2026-01-05", income_kobo: 1200000, expense_kobo: 600000 }, // freelance payout
  { date: "2026-01-07", income_kobo: 0, expense_kobo: 450000 },
  { date: "2026-01-10", income_kobo: 3000000, expense_kobo: 1800000 }, // salary cycle
  { date: "2026-01-12", income_kobo: 0, expense_kobo: 900000 },
  { date: "2026-01-15", income_kobo: 500000, expense_kobo: 300000 }, // small transfer
  { date: "2026-01-18", income_kobo: 0, expense_kobo: 700000 },
  { date: "2026-01-20", income_kobo: 1500000, expense_kobo: 1100000 },
  { date: "2026-01-22", income_kobo: 0, expense_kobo: 500000 },
  { date: "2026-01-25", income_kobo: 4000000, expense_kobo: 2500000 }, // big inflow
  { date: "2026-02-01", income_kobo: 0, expense_kobo: 1000000 },
  { date: "2026-02-05", income_kobo: 2000000, expense_kobo: 1200000 },
  { date: "2026-02-10", income_kobo: 0, expense_kobo: 900000 },
  { date: "2026-02-15", income_kobo: 3500000, expense_kobo: 2100000 },
  { date: "2026-02-20", income_kobo: 0, expense_kobo: 1400000 },
  { date: "2026-02-25", income_kobo: 1800000, expense_kobo: 1300000 },
  { date: "2026-03-01", income_kobo: 4200000, expense_kobo: 2600000 },
  { date: "2026-03-05", income_kobo: 0, expense_kobo: 900000 },
  { date: "2026-03-10", income_kobo: 3000000, expense_kobo: 2000000 },
  { date: "2026-03-15", income_kobo: 0, expense_kobo: 1500000 },
  { date: "2026-03-20", income_kobo: 2500000, expense_kobo: 1800000 },
  { date: "2026-03-25", income_kobo: 5000000, expense_kobo: 3200000 },
  { date: "2026-03-29", income_kobo: 1200000, expense_kobo: 4000000 }, // heavy spending day
]

const formatKobo = (kobo: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(kobo / 100)
}

const chartConfig = {
  income_kobo: {
    label: "Income",
    color: "var(--color-income)",
  },
  expense_kobo: {
    label: "Expenses",
    color: "var(--color-expense)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) setTimeRange("90d")
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date()

    let days = 90
    if (timeRange === "30d") days = 30
    if (timeRange === "7d") days = 7

    const start = new Date(referenceDate)
    start.setDate(start.getDate() - days)

    return date >= start
  })

  return (
    <Card className="@container/card mt-4">
      <CardHeader>
        <CardTitle className="font-bold text-neutral-700 dark:text-white">
          KoboCore Wallet Activity
        </CardTitle>
        <CardDescription>
          Income vs Expenses (NGN • Kobo-based ledger)
        </CardDescription>

        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">3 Months</ToggleGroupItem>
            <ToggleGroupItem value="30d">30 Days</ToggleGroupItem>
            <ToggleGroupItem value="7d">7 Days</ToggleGroupItem>
          </ToggleGroup>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="flex w-40 @[767px]/card:hidden" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90d">3 Months</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <AreaChart data={filteredData}>

            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
              </linearGradient>

              <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#64748b" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(val) =>
                new Date(val).toLocaleDateString("en-NG", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <YAxis
              tickFormatter={(v) => `₦${(v / 100000).toFixed(0)}k`}
              axisLine={false}
              tickLine={false}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(val) =>
                    new Date(val).toLocaleDateString("en-NG", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  formatter={(value) => formatKobo(Number(value))}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="expense_kobo"
              type="natural"
              fill="url(#expenseFill)"
              stroke="var(--color-expense)"
            />

            <Area
              dataKey="income_kobo"
              type="natural"
              fill="url(#incomeFill)"
              stroke="var(--color-income)"
            />

          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}