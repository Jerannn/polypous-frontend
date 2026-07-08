import { ChartPie, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import EmptyState from "@/features/dashboard/components/EmptyState";
import type { InvoiceStatus } from "@/features/dashboard/types";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import { cn } from "@/lib/utils";
export const description = "A line chart with dots";
const chartData = [
  { month: "January", income: 186 },
  { month: "February", income: 305 },
  { month: "March", income: 237 },
  { month: "April", income: 73 },
  { month: "May", income: 209 },
  { month: "June", income: 214 },
];
const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type AnalyticsMonthlyTrendProps = {
  monthlyIncomeList: InvoiceStatus[];
};

export default function AnalyticsMonthlyTrend({
  monthlyIncomeList,
}: AnalyticsMonthlyTrendProps) {
  const formatCurrency = useCurrencyFormatter();
  const hasData = monthlyIncomeList.length > 0;

  return (
    <Card className="max-w-2xl w-full">
      <CardHeader>
        <CardTitle>Invoice Status</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className={cn(!hasData && "m-auto")}>
        {!hasData && (
          <EmptyState
            title="No monthly income data yet"
            description="Monthly income trends will appear here once you record payments for
          your invoices."
            icon={ChartPie}
          />
        )}
        {hasData && (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />

              <YAxis
                width={85}
                tickFormatter={(value) => formatCurrency(value)}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="income"
                type="natural"
                stroke="var(--color-income)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-income)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start text-xs bg-transparent">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
