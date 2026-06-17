import { useSuspenseQuery } from "@tanstack/react-query";

import { overviewQueryOptions } from "../queries";
import DashboardInvoiceStatusPie from "./DashboardInvoiceStatusPie";
import DashboardMonthlyIncomeTrend from "./DashboardMonthlyIncomeTrend";
import DashboardRecentInvoices from "./DashboardRecentInvoices";
import DashboardStats from "./DashboardStats";

export default function DashboardContainer() {
  const { data: overview } = useSuspenseQuery(overviewQueryOptions());

  // to follow
  return (
    <div className="space-y-6">
      <DashboardStats stats={overview.stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardMonthlyIncomeTrend monthlyIncome={overview.monthlyIncome} />
        <DashboardInvoiceStatusPie invoiceStatus={overview.invoiceStatus} />
      </div>
      <DashboardRecentInvoices recentInvoices={overview.recentInvoices} />
    </div>
  );
}
