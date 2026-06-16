import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chartData = [
  { month: "Jan", income: 80 },
  { month: "Feb", income: 200 },
  { month: "Mar", income: 120 },
  { month: "Apr", income: 190 },
  { month: "May", income: 130 },
  { month: "Jun", income: 140 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function DashboardMonthlyIncomeTrend() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Income Trend</CardTitle>
      </CardHeader>
      <CardContent className="ps-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={chartData}>
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
