import {
  FilePenLine,
  MapPin,
  MapPinXInside,
  Phone,
  PhoneOff,
} from "lucide-react";
import { toast } from "sonner";

import ConfirmDeletionModal from "@/components/ConfirmDeletionModal";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import useDeleteClient from "../hooks/use-delete-client";
import type { Client } from "../types";
import ClientForm from "./ClientForm";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

type ClientRowProps = {
  client: Client;
};

export default function ClientRow({ client }: ClientRowProps) {
  const { deleteClient, isDeleting, isError } = useDeleteClient();

  const formatCurrency = useCurrencyFormatter();

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
        {formatCurrency(client.totalPaid)}
      </TableCell>
      <TableCell className="text-accent text-center">
        {formatCurrency(client.totalUnpaid)}
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
        <ConfirmDeletionModal
          onConfirm={async () => {
            const isDeleted = await deleteClient(client.id);
            if (isDeleted) toast.success("Client deleted successfully!");

            return isDeleted;
          }}
          isPending={isDeleting}
          errorMessage={isError ? "Error deleting client" : undefined}
          description="Are you sure you want to delete this client? This action cannot be reversed after confirmation."
        />
      </TableCell>
    </TableRow>
  );
}
