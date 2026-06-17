import { LabelList, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { InvoiceStatus } from "../types";

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

type DashboardInvoiceStatusPieProps = {
  invoiceStatus: InvoiceStatus[];
};

export default function DashboardInvoiceStatusPie({
  invoiceStatus,
}: DashboardInvoiceStatusPieProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Status</CardTitle>
      </CardHeader>
      <CardContent className="ps-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <PieChart>
            <Pie
              data={invoiceStatus.map((invoice) => ({
                ...invoice,
                status: invoice.status.toLowerCase(),
                fill: `var(--pie-${invoice.status.toLowerCase()})`,
              }))}
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
