import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceDetailsProvider } from "../context/InvoiceDetailsContext";
import InvoiceDetailsHeader from "./InvoiceDetailsHeader";
import InvoiceDocument from "./InvoiceDocument";

export default function Invoice() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6 print:p-0">
      <InvoiceDetailsProvider>
        <InvoiceDetailsHeader />
        <div className="grid items-start grid-cols-1 lg:grid-cols-[2fr_350px] gap-4">
          <InvoiceDocument />
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </InvoiceDetailsProvider>
    </div>
  );
}
