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

  return (
    <Card className="bg-transparent ring-0">
      <CardContent className="flex justify-start gap-4 px-0">
        <StatsCard
          title={"Total Revenue"}
          value={`${formatCurrency(Number(stats.revenue.current))}`}
          description={`${Number(stats.revenue.growth) > 0 ? "📈" : "📉"} ${stats.revenue.growth}% vs previous month`}
          icon={BadgeDollarSign}
        />

        <StatsCard
          title={"Outstanding Revenue"}
          value={`${formatCurrency(Number(stats.outstanding.current))}`}
          description={
            stats.outstanding.growth > 0
              ? `+${stats.outstanding.growth}%`
              : `-${stats.outstanding.growth}%`
          }
          icon={HandCoins}
        />

        <StatsCard
          title={"Total Clients"}
          value={stats.clients.current.toString()}
          description={
            stats.clients.growth > 0
              ? `+${stats.clients.growth}%`
              : `-${stats.clients.growth}%`
          }
          icon={UsersRound}
        />

        <StatsCard
          title={"Total Invoices"}
          value={stats.invoices.current.toString()}
          description={
            stats.invoices.growth > 0
              ? `+${stats.invoices.growth}%`
              : `-${stats.invoices.growth}%`
          }
          icon={ReceiptText}
        />
      </CardContent>
    </Card>
  );
}
