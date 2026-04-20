"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "Income vs Expenses chart (2026)"
const chartData = [
  { date: "2026-01-01", income: 1200, expense: 900 },
  { date: "2026-01-03", income: 1800, expense: 1300 },
  { date: "2026-01-05", income: 1500, expense: 1200 },
  { date: "2026-01-07", income: 2200, expense: 1800 },
  { date: "2026-01-10", income: 2000, expense: 1600 },
  { date: "2026-01-12", income: 2500, expense: 2100 },
  { date: "2026-01-15", income: 3000, expense: 2400 },
  { date: "2026-01-18", income: 2800, expense: 2200 },
  { date: "2026-01-20", income: 3200, expense: 2600 },
  { date: "2026-01-22", income: 3600, expense: 2900 },
  { date: "2026-01-25", income: 4000, expense: 3300 },
  { date: "2026-01-28", income: 0, expense: 0 },
  { date: "2026-02-01", income: 4200, expense: 3500 },
  { date: "2026-02-05", income: 4500, expense: 3700 },
  { date: "2026-02-10", income: 4800, expense: 3900 },
  { date: "2026-02-15", income: 5000, expense: 4200 },
  { date: "2026-02-20", income: 5200, expense: 4400 },
  { date: "2026-02-25", income: 5500, expense: 4700 },
  { date: "2026-03-01", income: 5800, expense: 5000 },
  { date: "2026-03-05", income: 6000, expense: 5200 },
  { date: "2026-03-10", income: 6200, expense: 5400 },
  { date: "2026-03-15", income: 6500, expense: 5600 },
  { date: "2026-03-20", income: 0, expense: 0 },
  { date: "2026-03-25", income: 7000, expense: 6200 },
  { date: "2026-03-29", income: 1200, expense: 10000 },
]



const chartConfig = {
  income: {
    label: "Income",
    color: "var(--color-income)",
  },
  expense: {
    label: "Expenses",
    color: "var(--color-expense)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("90d")
    }
  }, [isMobile])


  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date() 

    let daysToSubtract = 90
    if (timeRange === "30d") daysToSubtract = 30
    else if (timeRange === "7d") daysToSubtract = 7

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    return date >= startDate
  })

  return (
    <Card className="@container/card mt-4">
      <CardHeader>
        <CardTitle className="font-bold text-neutral-700 dark:text-white">Income vs Expenses</CardTitle>
        <CardDescription>
          Financial activity for selected period
        </CardDescription>

        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 @[767px]/card:hidden"
              size="sm"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="md:h-[300px] h-[290px] w-full"
        >
          <AreaChart data={filteredData}>

            <defs>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={1} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
              </linearGradient>

              <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#64748b" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="expense"
              type="natural"
              fill="url(#fillExpense)"
              stroke="var(--color-expense)"
            />

            <Area
              dataKey="income"
              type="natural"
              fill="url(#fillIncome)"
              stroke="var(#64748b)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}