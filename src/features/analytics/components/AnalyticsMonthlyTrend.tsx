import { ChartSpline, TrendingDown, TrendingUp } from "lucide-react";
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
import EmptyState from "@/features/analytics/components/EmptyState";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import { cn } from "@/lib/utils";

import type { IncomeTrend } from "../types";
export const description = "A line chart with dots";

const chartConfig = {
  total: {
    label: "Total",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type AnalyticsMonthlyTrendProps = {
  incomeTrend: IncomeTrend[];
};

export default function AnalyticsMonthlyTrend({
  incomeTrend,
}: AnalyticsMonthlyTrendProps) {
  const formatCurrency = useCurrencyFormatter();
  const hasData = incomeTrend.length > 0;

  const percentageThisMonthVsLastMonth = (() => {
    if (incomeTrend.length < 2) return 0;
    const latest = incomeTrend[incomeTrend.length - 1].total;
    const previous = incomeTrend[incomeTrend.length - 2].total;
    if (previous === 0) {
      return latest > 0 ? 100 : 0;
    }
    return ((latest - previous) / previous) * 100;
  })();

  const dateRangeText = (() => {
    if (incomeTrend.length === 0) return "";
    const start = incomeTrend[0].period;
    const end = incomeTrend[incomeTrend.length - 1].period;
    return start === end ? start : `${start} - ${end}`;
  })();

  const test = incomeTrend.map((item) => ({
    ...item,
    income: Number(item.total),
  }));
  console.log(test);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Income Trend</CardTitle>
        <CardDescription>
          {hasData && dateRangeText ? dateRangeText : "No data available"}
        </CardDescription>
      </CardHeader>
      <CardContent className={cn(!hasData && "m-auto")}>
        {!hasData && (
          <EmptyState
            title="No Income Trend Data"
            description="Your monthly revenue growth and payment trends will be plotted here once payments are recorded."
            icon={ChartSpline}
          />
        )}
        {hasData && (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={test}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <YAxis
                width={85}
                tickFormatter={(value) => formatCurrency(value)}
              />

              <ChartTooltip
                formatter={(value, name, payload) => {
                  const period = payload?.payload?.period;

                  return (
                    <div className="w-full h-full flex gap-2">
                      <div className="h-full w-1 bg-primary rounded-lg"></div>
                      <div>
                        <h1 className="font-medium">{period}</h1>
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
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="total"
                type="natural"
                stroke="var(--color-total)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-total)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
      {hasData && (
        <CardFooter className="flex-col items-start gap-1.5 text-xs bg-transparent">
          {incomeTrend.length >= 2 ? (
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              {percentageThisMonthVsLastMonth > 0 ? (
                <>
                  <span>
                    Trending up by {percentageThisMonthVsLastMonth.toFixed(1)}%
                    compared to last month
                  </span>
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </>
              ) : percentageThisMonthVsLastMonth < 0 ? (
                <>
                  <span>
                    Trending down by{" "}
                    {Math.abs(percentageThisMonthVsLastMonth).toFixed(1)}%
                    compared to last month
                  </span>
                  <TrendingDown className="h-4 w-4 text-destructive" />
                </>
              ) : (
                <span>Income remained stable compared to last month</span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <span>Income tracking started</span>
            </div>
          )}
          <div className="leading-none text-muted-foreground">
            Showing total income for the last {incomeTrend.length} month
            {incomeTrend.length === 1 ? "" : "s"}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
