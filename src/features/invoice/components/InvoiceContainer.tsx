import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";

export default function InvoiceContainer() {
  return (
    <div className="flex flex-col">
      <Button className="self-end gap-4" size="lg" asChild>
        <Link to="/invoices/new" preload="intent">
          <Plus /> Add Invoice
        </Link>
      </Button>

      <InvoiceFilter />

      <InvoiceTable />
    </div>
  );
}
