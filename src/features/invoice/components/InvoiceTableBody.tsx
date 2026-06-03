import type { Invoice } from "../types";
import InvoiceRow from "./InvoiceRow";

type InvoiceTableBodyProps = {
  invoice: Invoice[];
};

export default function InvoiceTableBody({ invoice }: InvoiceTableBodyProps) {
  //   if (invoice.length === 0) return <ClientTableEmptyState />;

  return invoice.map((invoice) => (
    <InvoiceRow key={invoice.id} invoice={invoice} />
  ));
}
