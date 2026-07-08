import { ChartColumn } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import { cn } from "@/lib/utils";
export const description = "A horizontal bar chart";
const chartData = [
  { name: "Acme Corporation", revenue: 186 },
  { name: "TechStart Inc", revenue: 305 },
  { name: "Design Studio Co", revenue: 237 },
  { name: "Global Ventures", revenue: 20 },
  { name: "Local Coffee Shop", revenue: 209 },
];
const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

type AnalyticsTopClientsByRevenueProps = {
  topClients: any[];
};

export default function AnalyticsTopClientsByRevenue({
  topClients,
}: AnalyticsTopClientsByRevenueProps) {
  const formatCurrency = useCurrencyFormatter();
  const hasData = topClients.length > 0;

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Monthly Income Trend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className={cn(!hasData && "m-auto")}>
        {!hasData && (
          <EmptyState
            title="No income data yet"
            description="Monthly income trends will appear here once you record payments for
          your invoices."
            icon={ChartColumn}
          />
        )}

        {hasData && (
          <ChartContainer config={chartConfig} className="h-60 w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                right: 16,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                hide
              />
              <XAxis dataKey="revenue" type="number" hide />
              <ChartTooltip
                formatter={(value, fieldName, payload) => {
                  const name = payload?.payload?.name;

                  return (
                    <div className="w-full flex gap-2">
                      <div className="h-full w-1 bg-primary rounded-lg"></div>
                      <div>
                        <h1 className="font-medium">{name}</h1>
                        <div className="flex justify-between items-center gap-2">
                          <span className="text-muted-foreground capitalize">
                            {fieldName}
                          </span>
                          <span className="font-mono font-medium text-foreground tabular-nums">
                            {formatCurrency(Number(value))}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }}
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="revenue"
                fill="var(--color-revenue)"
                radius={4}
                barSize={32}
              >
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  offset={8}
                  className="fill-(--color-label)"
                  fontSize={12}
                />
                <LabelList
                  dataKey="revenue"
                  position="insideRight"
                  offset={8}
                  className="fill-(--color-label) font-bold"
                  fontSize={12}
                  formatter={(value) => formatCurrency(Number(value))}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
