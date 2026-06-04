import { useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";

export default function InvoiceContainer() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <Button
        className="self-end gap-4"
        size="lg"
        onClick={() =>
          navigate({
            to: "/invoices/new",
          })
        }
      >
        <Plus /> Add Invoice
      </Button>

      <InvoiceFilter />

      <InvoiceTable />
    </div>
  );
}
