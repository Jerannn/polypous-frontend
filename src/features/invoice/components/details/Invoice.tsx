import { InvoiceDetailsProvider } from "../context/InvoiceDetailsContext";
import InvoiceDetailsHeader from "./InvoiceDetailsHeader";
import InvoiceDocument from "./InvoiceDocument";
import PaymentHistory from "./PaymentHistory";
import PaymentSummary from "./PaymentSummary";

export default function Invoice() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-6 print:p-0">
      <InvoiceDetailsProvider>
        <InvoiceDetailsHeader />
        <div className="grid items-start grid-cols-1 lg:grid-cols-[2fr_350px] gap-4">
          <InvoiceDocument />
          <div className="space-y-4">
            <PaymentSummary />
            <PaymentHistory />
          </div>
        </div>
      </InvoiceDetailsProvider>
    </div>
  );
}
