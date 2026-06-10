import { useInvoiceDetails } from "../context/InvoiceDetailsContext";

export default function InvoiceNotes() {
  const { invoice } = useInvoiceDetails();

  if (!invoice.notes) return null;

  return (
    <div className="pt-6 border-t border-border/40 space-y-2">
      <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground print:text-gray-500">
        NOTES & TERMS
      </p>
      <p className="text-xs text-muted-foreground print:text-gray-500 leading-relaxed max-w-2xl font-normal">
        {invoice.notes}
      </p>
    </div>
  );
}
