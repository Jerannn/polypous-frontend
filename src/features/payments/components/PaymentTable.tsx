import { getRouteApi } from "@tanstack/react-router";
import { UserX } from "lucide-react";

import TableEmptyState from "@/components/states/TableEmptyState";
import TableErrorState from "@/components/states/TableErrorState";
import TableLoadingState from "@/components/states/TableLoadingState";
import DataTable from "@/components/table/DataTable";
import DataTablePagination from "@/components/table/DataTablePagination";
import SkeletonRow from "@/components/table/SkeletonRow";

import useRetrievePayments from "../hooks/use-retrieve-payments";
import type { PaymentListItem } from "../types";
import PaymentRow from "./PaymentRow";
import PaymentTableHeader from "./PaymentTableHeader";

const routeApi = getRouteApi("/(protected)/payments/");

export default function PaymentTable() {
  const query = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const { data, isError, isPending, isFetching } = useRetrievePayments({
    query,
  });
  const payments = data?.payments ?? [];
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
    <DataTable<PaymentListItem>
      title="All Invoices"
      isPending={isPending}
      isError={isError}
      isFetching={isFetching}
      items={payments}
      header={<PaymentTableHeader />}
      renderRow={(payment) => <PaymentRow payment={payment} key={payment.id} />}
      loadingState={
        <TableLoadingState
          title="All Payments"
          header={<PaymentTableHeader />}
          skeletonRow={<SkeletonRow rowCount={query.limit} columnCount={7} />}
        />
      }
      errorState={
        <TableErrorState
          title="Error Loading Payments"
          description="Something went wrong while trying to fetch the payment list. Please
              try again."
          onRetry={() => {}}
        />
      }
      emptyState={
        <TableEmptyState
          icon={UserX}
          title="No payments found"
          description="Try adding a new payment or adjusting your search filters."
        />
      }
      pagination={
        <DataTablePagination meta={meta} onPageChange={handlePageChange} />
      }
    />
  );
}
