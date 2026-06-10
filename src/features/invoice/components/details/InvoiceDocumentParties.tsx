import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

import { useInvoiceDetails } from "../context/InvoiceDetailsContext";

export default function InvoiceDocumentParties() {
  const { invoice } = useInvoiceDetails();
  return (
    <div className="grid grid-cols-2 gap-4">
      <Item variant="muted" size="xs" className="items-start">
        <ItemContent>
          <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground print:text-gray-500">
            FROM
          </h3>
          <ItemTitle>Frelancer</ItemTitle>
          <ItemDescription className="capitalize">
            {invoice?.fullName}
          </ItemDescription>
          <ItemDescription> {invoice?.email}</ItemDescription>
        </ItemContent>
      </Item>

      <Item variant="muted" size="xs">
        <ItemContent>
          <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground print:text-gray-500">
            BILL TO
          </h3>
          <ItemTitle>{invoice?.client.name}</ItemTitle>
          <ItemDescription>{invoice?.client.email}</ItemDescription>
          {invoice?.client.phone && (
            <ItemDescription>{invoice?.client.phone}</ItemDescription>
          )}
          {invoice?.client.address && (
            <ItemDescription>{invoice?.client.address}</ItemDescription>
          )}
        </ItemContent>
      </Item>
    </div>
  );
}
