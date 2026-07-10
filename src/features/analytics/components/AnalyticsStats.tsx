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

const defaultStats: Stats = {
  totalRevenue: "0",
  averageMonthlyRevenue: "0",
  revenueGrowthPercentage: "0",
  totalClients: "0",
  totalInvoices: "0",
};

type AnalyticsStatsProps = {
  stats?: Stats;
  numberOfMonths?: number;
};

export default function AnalyticsStats({
  stats = defaultStats,
  numberOfMonths = 0,
}: AnalyticsStatsProps) {
  const formatCurrency = useCurrencyFormatter();

  return (
    <Card className="bg-transparent ring-0">
      <CardContent className="flex justify-start gap-4 px-0">
        <StatsCard
          title={"Total Revenue"}
          value={`${formatCurrency(Number(stats.totalRevenue))}`}
          description={`${Number(stats.revenueGrowthPercentage) > 0 ? "📈" : "📉"} ${stats.revenueGrowthPercentage}% vs last month`}
          icon={BadgeDollarSign}
        />

        <StatsCard
          title={"Avg Monthly Revenue"}
          value={`${formatCurrency(Number(stats.averageMonthlyRevenue))}`}
          description={`Over ${numberOfMonths} months`}
          icon={HandCoins}
        />

        <StatsCard
          title={"Total Clients"}
          value={stats.totalClients}
          description={"Active clients"}
          icon={UsersRound}
        />

        <StatsCard
          title={"Total Invoices"}
          value={stats.totalInvoices}
          description={"All time"}
          icon={ReceiptText}
        />
      </CardContent>
    </Card>
  );
}
