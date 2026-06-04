import { getRouteApi } from "@tanstack/react-router";
import { UserX } from "lucide-react";

import TableEmptyState from "@/components/states/TableEmptyState";
import DataTable from "@/components/table/DataTable";
import DataTablePagination from "@/components/table/DataTablePagination";
import SkeletonRow from "@/components/table/SkeletonRow";

import TableErrorState from "../../../components/states/TableErrorState";
import TableLoadingState from "../../../components/states/TableLoadingState";
import useRetrieveClients from "../hooks/use-retrieve-clients";
import type { Client } from "../types";
import ClientRow from "./ClientRow";
import ClientTableHeader from "./ClientTableHeader";

const routeApi = getRouteApi("/(protected)/clients/");

export default function ClientTable() {
  const query = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const { data, isPending, isError, isFetching } = useRetrieveClients(query);
  const clients = data?.clients ?? [];
  const meta = data?.meta;

  const handlePageChange = (page: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page,
      }),
    });
  };

  return (
    <DataTable<Client>
      title="All Invoices"
      isPending={isPending}
      isError={isError}
      isFetching={isFetching}
      items={clients}
      header={<ClientTableHeader />}
      renderRow={(client) => <ClientRow client={client} key={client.id} />}
      loadingState={
        <TableLoadingState
          title="All Clients"
          header={<ClientTableHeader />}
          skeletonRow={<SkeletonRow type="client" />}
        />
      }
      errorState={
        <TableErrorState
          title="Error Loading Clients"
          description="Something went wrong while trying to fetch the client list. Please
              try again."
          onRetry={() => {}}
        />
      }
      emptyState={
        <TableEmptyState
          icon={UserX}
          title="No invoices found"
          description="Try adding a new client or adjusting your search filters."
        />
      }
      pagination={
        <DataTablePagination meta={meta} onPageChange={handlePageChange} />
      }
    />
  );
}
