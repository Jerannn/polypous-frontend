import DashboardStats from "./DashboardStats";
import DashboardMonthlyIncomeTrend from "./DashboardMonthlyIncomeTrend";
import DashboardInvoiceStatusPie from "./DashboardInvoiceStatusPie";
import DashboardRecentInvoices from "./DashboardRecentInvoices";

export default function DashboardContainer() {
  return (
    <div className="space-y-6">
      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardMonthlyIncomeTrend />
        <DashboardInvoiceStatusPie />
      </div>
      <DashboardRecentInvoices />
    </div>
  );
}
