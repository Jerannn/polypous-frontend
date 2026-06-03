import ClientTableEmptyState from "../../../components/states/TableEmptyState";
import type { Client } from "../types";
import ClientRow from "./ClientRow";

type TableContentSectionProps = {
  clients: Client[];
};

export default function ClientTableBody({ clients }: TableContentSectionProps) {
  if (clients.length === 0) return <ClientTableEmptyState />;

  return clients.map((client) => <ClientRow key={client.id} client={client} />);
}
