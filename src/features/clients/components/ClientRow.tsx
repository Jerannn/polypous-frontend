import {
  FilePenLine,
  MapPin,
  MapPinXInside,
  Phone,
  PhoneOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import type { Client } from "../types";
import ClientDeleteDialog from "./ClientDeleteDialog";
import ClientForm from "./ClientForm";

type ClientRowProps = {
  client: Client;
};

export default function ClientRow({ client }: ClientRowProps) {
  return (
    <TableRow key={client.id}>
      <TableCell className="max-w-60">
        <span className="block font-bold truncate" title={client.name}>
          {client.name}
        </span>
        <span className="block truncate" title={client.email}>
          {client.email}
        </span>
      </TableCell>
      <TableCell className="max-w-100">
        <span
          className="flex items-center gap-2 truncate"
          title={client.phone ?? undefined}
        >
          {client.phone ? (
            <>
              <Phone className="w-3 h-3 shrink-0" />
              <span className="truncate">{client.phone}</span>
            </>
          ) : (
            <>
              <PhoneOff className="w-3 h-3 shrink-0" />
              <span>No phone</span>
            </>
          )}
        </span>
        <span
          className="flex items-center gap-2 truncate"
          title={client.address ?? undefined}
        >
          {client.address ? (
            <>
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{client.address}</span>
            </>
          ) : (
            <>
              <MapPinXInside className="w-3 h-3 shrink-0" />
              <span>No address</span>
            </>
          )}
        </span>
      </TableCell>
      <TableCell className="text-center">{client.invoiceCount}</TableCell>
      <TableCell className="text-primary text-center">
        ${client.totalPaid}
      </TableCell>
      <TableCell className="text-accent text-center">
        ${client.totalUnpaid}
      </TableCell>
      <TableCell className="flex items-center justify-end text-right space-x-3">
        <ClientForm
          title="Edit Client"
          description="Edit client details"
          action="update"
          initialClient={{
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
            address: client.address,
            notes: client.notes,
          }}
          button={
            <Button variant="ghost">
              <FilePenLine />
            </Button>
          }
        />
        <ClientDeleteDialog clientId={client.id} />
      </TableCell>
    </TableRow>
  );
}
