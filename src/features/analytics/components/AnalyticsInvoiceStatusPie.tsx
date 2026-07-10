import { AlertCircle, ChartPie, CheckCircle2 } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import EmptyState from "@/features/analytics/components/EmptyState";
import { cn } from "@/lib/utils";

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

type AnalyticsInvoiceStatusPieProps = {
  invoiceStatus: InvoiceStatus[];
};

export default function AnalyticsInvoiceStatusPie({
  invoiceStatus,
}: AnalyticsInvoiceStatusPieProps) {
  const hasData = invoiceStatus.length > 0;

  const totalInvoices = invoiceStatus.reduce(
    (acc, curr) => acc + Number(curr.count),
    0,
  );
  const paidCount =
    invoiceStatus.find((i) => i.status.toLowerCase() === "paid")?.count || 0;
  const overdueCount =
    invoiceStatus.find((i) => i.status.toLowerCase() === "overdue")?.count || 0;

  const paidPercentage =
    totalInvoices > 0 ? (paidCount / totalInvoices) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Status</CardTitle>
        <CardDescription>
          Overview of paid, unpaid, and overdue invoices
        </CardDescription>
      </CardHeader>
      <CardContent className={cn(!hasData && "m-auto")}>
        {!hasData && (
          <EmptyState
            title="No Invoice Status Data"
            description="A visual breakdown of your paid, unpaid, and overdue invoices will appear here once you generate invoices."
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
      {hasData && (
        <CardFooter className="flex-col items-start gap-1.5 text-xs bg-transparent mt-auto">
          {overdueCount > 0 ? (
            <div className="flex items-center gap-1.5 font-medium text-destructive/80">
              <span>
                Attention: {overdueCount} invoice{overdueCount === 1 ? "" : "s"}{" "}
                {overdueCount === 1 ? "is" : "are"} overdue
              </span>
              <AlertCircle className="h-4 w-4" />
            </div>
          ) : totalInvoices > 0 ? (
            <div className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-500">
              <span>
                Great! {paidPercentage.toFixed(0)}% of invoices are fully paid
              </span>
              <CheckCircle2 className="h-4 w-4" />
            </div>
          ) : (
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <span>Invoice status tracking active</span>
            </div>
          )}
          <div className="leading-none text-muted-foreground">
            Showing status breakdown for {totalInvoices} total invoice
            {totalInvoices === 1 ? "" : "s"}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
