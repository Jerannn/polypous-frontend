import { LabelList, Pie, PieChart } from "recharts";
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
  { status: "paid", count: 80, fill: "var(--pie-1)" },
  { status: "unpaid", count: 200, fill: "var(--pie-2)" },
  { status: "overdue", count: 120, fill: "var(--pie-3)" },
];

const chartConfig = {
  paid: {
    label: "Paid",
  },
  unpaid: {
    label: "Unpaid",
  },
  overdue: {
    label: "Overdue",
  },
} satisfies ChartConfig;

export default function DashboardInvoiceStatusPie() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Status</CardTitle>
      </CardHeader>
      <CardContent className="ps-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="var(--foreground)"
                  >
                    {payload.count}
                  </text>
                );
              }}
            >
              <LabelList
                dataKey="status"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value) =>
                  chartConfig[value as keyof typeof chartConfig]?.label
                }
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="status" />} />
            <ChartTooltip content={<ChartTooltipContent nameKey="status" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
