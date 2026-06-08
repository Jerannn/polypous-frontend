import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import InvoiceFilter from "./InvoiceFilter";
import InvoiceTable from "./InvoiceTable";

export default function InvoiceContainer() {
  return (
    <div className="flex flex-col">
      <Button className="self-end gap-4" size="lg" asChild>
        <Link to="/invoices/new">
          <Plus /> Add Invoice
        </Link>
      </Button>

      <InvoiceFilter />

      <InvoiceTable />
    </div>
  );
}
