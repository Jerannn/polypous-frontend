import AnalyticsInvoiceStatusPie from "./AnalyticsInvoiceStatusPie";
import AnalyticsMonthlyTrend from "./AnalyticsMonthlyTrend";
import AnalyticsStats from "./AnalyticsStats";
import AnalyticsTopClientsByRevenue from "./AnalyticsTopClientsByRevenue";

export default function AnalyticsContainer() {
  return (
    <div>
      <AnalyticsStats />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnalyticsMonthlyTrend monthlyIncomeList={[]} />
        <AnalyticsInvoiceStatusPie invoiceStatus={[]} />
        <AnalyticsTopClientsByRevenue topClients={[]} />
      </div>
    </div>
  );
}
