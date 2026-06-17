import { Link } from "@tanstack/react-router";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { INVOICESTATUSCLASSES } from "@/utils/constants";
import { formatCurrency } from "@/utils/formatCurrency";

import type { RecentInvoice } from "../types";

type DashboardRecentInvoicesProps = {
  recentInvoices: RecentInvoice[];
};

export default function DashboardRecentInvoices({
  recentInvoices,
}: DashboardRecentInvoicesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
        <CardDescription>Your latest invoices activity.</CardDescription>
        <CardAction>
          <Button variant="outline" className="rounded-full" asChild>
            <Link to="/invoices">View All</Link>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <Table>
          <TableBody>
            {recentInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="w-10">
                  <div
                    className={cn(
                      "size-10 font-bold text-[16px] bg-muted/70 flex justify-center items-center rounded-md",
                      INVOICESTATUSCLASSES[invoice.status.toLowerCase()],
                    )}
                  >
                    {invoice.status.charAt(0).toUpperCase()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{invoice.invoiceNumber}</span>
                    <span className="text-xs text-muted-foreground">
                      {invoice.clientName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {format(invoice.dueDate, "MMM dd, yyyy")}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-medium",
                    INVOICESTATUSCLASSES[invoice.status.toLowerCase()],
                  )}
                >
                  {invoice.status.toLowerCase() === "paid" && "+"}
                  {formatCurrency(Number(invoice.total), "USD")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="bg-transparent">
            <TableRow className="w-full text-center hover:bg-transparent">
              <TableCell colSpan={100} className="pt-4">
                <div className="flex justify-center items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 inline-block bg-primary rounded-xs"></span>
                    <span>Paid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 inline-block bg-accent rounded-xs"></span>
                    <span>Unpaid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 inline-block bg-destructive rounded-xs"></span>
                    <span>Overdue</span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
