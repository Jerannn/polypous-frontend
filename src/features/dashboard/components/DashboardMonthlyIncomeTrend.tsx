import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { MonthlyIncome } from "../types";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type DashboardMonthlyIncomeTrendProps = {
  monthlyIncome: MonthlyIncome[];
};

export default function DashboardMonthlyIncomeTrend({
  monthlyIncome,
}: DashboardMonthlyIncomeTrendProps) {
  const formatCurrency = useCurrencyFormatter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Income Trend</CardTitle>
      </CardHeader>
      <CardContent className="ps-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={monthlyIncome}>
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="month"
              tickLine={true}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              width={85}
              tickFormatter={(value) => formatCurrency(value)}
            />

            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <ChartTooltip
              formatter={(value, name, payload) => {
                const month = payload?.payload?.month;
                return (
                  <div className="w-full flex gap-2">
                    <div className="h-full w-1 bg-primary rounded-lg"></div>
                    <div>
                      <h1 className="font-medium">{month}</h1>
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-muted-foreground capitalize">
                          {name}
                        </span>
                        <span className="font-mono font-medium text-foreground tabular-nums">
                          {formatCurrency(Number(value))}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
              content={<ChartTooltipContent indicator="line" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
