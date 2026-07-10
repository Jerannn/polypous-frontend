import { useSuspenseQuery } from "@tanstack/react-query";

import { analyticsQueryOptions } from "../queries";
import AnalyticsInvoiceStatusPie from "./AnalyticsInvoiceStatusPie";
import AnalyticsMonthlyTrend from "./AnalyticsMonthlyTrend";
import AnalyticsStats from "./AnalyticsStats";
import AnalyticsTopClientsByRevenue from "./AnalyticsTopClientsByRevenue";

export default function AnalyticsContainer() {
  const { data: analytics } = useSuspenseQuery(analyticsQueryOptions());

  return (
    <div>
      <AnalyticsStats
        stats={analytics?.stats}
        numberOfMonths={analytics?.monthlyIncome.length}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnalyticsMonthlyTrend
          monthlyIncomeList={analytics?.monthlyIncome || []}
        />
        <AnalyticsInvoiceStatusPie
          invoiceStatus={analytics?.invoiceStatus || []}
        />
        <AnalyticsTopClientsByRevenue
          topClients={analytics?.topClients || []}
        />
      </div>
    </div>
  );
}
