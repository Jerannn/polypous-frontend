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
            <YAxis />

            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
