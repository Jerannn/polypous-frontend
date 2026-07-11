import { ChartPie } from "lucide-react";
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
import type { InvoiceStatus } from "@/features/analytics/types";
import { cn } from "@/lib/utils";

import EmptyState from "../../analytics/components/EmptyState";

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
  const hasData = invoiceStatus.length > 0;

  return (
    <Card className="max-w-2xl w-full">
      <CardHeader>
        <CardTitle>Invoice Status</CardTitle>
      </CardHeader>
      <CardContent className={cn(!hasData && "m-auto")}>
        {!hasData && (
          <EmptyState
            title="No status data yet"
            description="Invoice status will appear here once you have invoices."
            icon={ChartPie}
          />
        )}
        {hasData && (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <PieChart>
              <Pie
                data={invoiceStatus.map((invoice) => ({
                  ...invoice,
                  status: invoice.status.toLowerCase(),
                  count: Number(invoice.count),
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
              <ChartTooltip
                content={<ChartTooltipContent nameKey="status" />}
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
