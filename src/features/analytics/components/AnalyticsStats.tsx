import {
  BadgeDollarSign,
  HandCoins,
  ReceiptText,
  UsersRound,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

import StatsCard from "../../../components/StatsCard";
import type { Stats } from "../types";

type AnalyticsStatsProps = {
  stats: Stats;
};

export default function AnalyticsStats({ stats }: AnalyticsStatsProps) {
  const formatCurrency = useCurrencyFormatter();

  const getGrowthDescription = (growth: number, period = "month") =>
    `${growth >= 0 ? "📈 Increased" : "📉 Decreased"} by ${Math.abs(growth)}% compared to last ${period}`;

  return (
    <Card className="bg-transparent ring-0">
      <CardContent className="flex justify-start gap-4 px-0">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats.revenue.total)}
          description={getGrowthDescription(
            stats.revenue.growth,
            stats.revenue.period,
          )}
          icon={BadgeDollarSign}
        />

        <StatsCard
          title="Outstanding Revenue"
          value={formatCurrency(stats.outstanding.total)}
          description={getGrowthDescription(
            stats.outstanding.growth,
            stats.outstanding.period,
          )}
          icon={HandCoins}
        />

        <StatsCard
          title="Total Clients"
          value={stats.clients.total.toString()}
          description={getGrowthDescription(
            stats.clients.growth,
            stats.clients.period,
          )}
          icon={UsersRound}
        />

        <StatsCard
          title="Total Invoices"
          value={stats.invoices.total.toString()}
          description={getGrowthDescription(
            stats.invoices.growth,
            stats.invoices.period,
          )}
          icon={ReceiptText}
        />
      </CardContent>
    </Card>
  );
}
