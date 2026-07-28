import { Award, ChartBar } from "lucide-react";
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
import EmptyState from "@/features/analytics/components/EmptyState";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import { cn } from "@/lib/utils";

import type { TopClient } from "../types";

export const description = "A horizontal bar chart";

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
  topClients: TopClient[];
};

export default function AnalyticsTopClientsByRevenue({
  topClients,
}: AnalyticsTopClientsByRevenueProps) {
  const formatCurrency = useCurrencyFormatter();
  const hasData = topClients.length > 0;

  const sortedClients = [...topClients].sort((a, b) => b.revenue - a.revenue);
  const topClient = sortedClients[0];

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Top Clients by Revenue</CardTitle>
        <CardDescription>
          {hasData
            ? "Revenue contribution from your highest-paying clients"
            : "No client data available"}
        </CardDescription>
      </CardHeader>
      <CardContent className={cn(!hasData && "m-auto")}>
        {!hasData && (
          <EmptyState
            title="No Client Revenue Data"
            description="Your highest-revenue clients will be displayed here once payments are received and registered."
            icon={ChartBar}
          />
        )}

        {hasData && (
          <ChartContainer config={chartConfig} className="h-60 w-full">
            <BarChart
              accessibilityLayer
              data={sortedClients}
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
      {hasData && (
        <CardFooter className="flex-col items-start gap-1.5 text-xs bg-transparent">
          <div className="flex items-center gap-1 font-medium text-foreground">
            <span>
              Top contributor: <strong>{topClient.name}</strong> with{" "}
              {formatCurrency(topClient.revenue)} in revenue
            </span>
            <Award className="h-4 w-4 text-amber-500" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing top {topClients.length} client
            {topClients.length === 1 ? "" : "s"} by total billing
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
