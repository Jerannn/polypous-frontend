import { getRouteApi } from "@tanstack/react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useRetrieveInvoice from "../hooks/use-retrieve-invoice";
import InvoiceTableBody from "./InvoiceTableBody";
import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTablePagination from "./InvoiceTablePagination";

const routeApi = getRouteApi("/(protected)/invoices/");

export default function InvoiceTable() {
  const query = routeApi.useSearch();

  const { data, isPending, isError } = useRetrieveInvoice(query);
  const invoice = data?.invoices ?? [];
  const meta = data?.meta;

  if (isPending) return <p>loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <Card
      className={`mt-10 transition-opacity ${isPending ? "opacity-60" : ""}`}
    >
      <CardHeader>
        <CardTitle>All Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <InvoiceTableHeader />
          </TableHeader>
          <TableBody>
            <InvoiceTableBody invoice={invoice} />
          </TableBody>
          <TableFooter className="bg-transparent">
            <TableRow className="w-full text-right hover:bg-transparent">
              <TableCell colSpan={100} className="pt-4">
                <InvoiceTablePagination meta={meta} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
