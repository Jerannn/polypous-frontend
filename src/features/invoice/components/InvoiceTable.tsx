import { getRouteApi } from "@tanstack/react-router";
import { UserX } from "lucide-react";

import TableEmptyState from "@/components/states/TableEmptyState";
import TableErrorState from "@/components/states/TableErrorState";
import TableLoadingState from "@/components/states/TableLoadingState";
import DataTable from "@/components/table/DataTable";
import DataTablePagination from "@/components/table/DataTablePagination";
import SkeletonRow from "@/components/table/SkeletonRow";

import useRetrieveInvoice from "../hooks/use-retrieve-invoice";
import type { Invoice } from "../types";
import InvoiceRow from "./InvoiceRow";
import InvoiceTableHeader from "./InvoiceTableHeader";

const routeApi = getRouteApi("/(protected)/invoices/");

export default function InvoiceTable() {
  const query = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const { data, isPending, isError, isFetching } = useRetrieveInvoice(query);
  const invoice = data?.invoices ?? [];
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
    <DataTable<Invoice>
      title="All Invoices"
      isPending={isPending}
      isError={isError}
      isFetching={isFetching}
      items={invoice}
      header={<InvoiceTableHeader />}
      renderRow={(invoice) => <InvoiceRow invoice={invoice} key={invoice.id} />}
      loadingState={
        <TableLoadingState
          title="All Invoices"
          header={<InvoiceTableHeader />}
          skeletonRow={<SkeletonRow type="invoice" />}
        />
      }
      errorState={
        <TableErrorState
          title="Error Loading Invoices"
          description="Something went wrong while trying to fetch the invoice list. Please
              try again."
          onRetry={() => {}}
        />
      }
      emptyState={
        <TableEmptyState
          icon={UserX}
          title="No invoices found"
          description="Try adding a new invoice or adjusting your search filters."
        />
      }
      pagination={
        <DataTablePagination meta={meta} onPageChange={handlePageChange} />
      }
    />
  );
}
