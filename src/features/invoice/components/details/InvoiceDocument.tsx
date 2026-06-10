import { Card, CardContent } from "@/components/ui/card";

import InvoiceDocumentHeader from "./InvoiceDocumentHeader";
import InvoiceDocumentItemsTable from "./InvoiceDocumentItemsTable";
import InvoiceDocumentParties from "./InvoiceDocumentParties";
import InvoiceNotes from "./InvoiceNotes";
import InvoiceTotals from "./InvoiceTotals";

export default function InvoiceDocument() {
  return (
    <Card className="p-6 sm:p-10 print:shadow-none">
      <InvoiceDocumentHeader />
      <CardContent className="px-0 space-y-10">
        <InvoiceDocumentParties />
        <InvoiceDocumentItemsTable />
        <InvoiceTotals />
        <InvoiceNotes />
        {/* <div className="space-y-2.5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground print:text-gray-500">
                PROJECT SUMMARY
              </p>
              <div className="space-y-1 text-xs">
                <p className="font-semibold text-foreground print:text-black text-sm">
                  Professional branding & logo design
                </p>
                <p className="text-muted-foreground print:text-gray-500 leading-relaxed font-normal">
                  Professional branding and logo design services for Local
                  Coffee Shop. Includes concept development, revisions, and
                  final asset delivery.
                </p>
              </div>
            </div> */}
      </CardContent>
    </Card>
  );
}
