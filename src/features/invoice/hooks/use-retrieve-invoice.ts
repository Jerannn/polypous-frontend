import { useQuery } from "@tanstack/react-query";
import { retrieveInvoice as retrieveInvoiceApi } from "../api";
import { invoiceKeys } from "../queryKeys";

export default function useRetrieveInvoice(id: string) {
  const {
    data: invoice,
    isPending,
    isError,
  } = useQuery({
    queryKey: invoiceKeys.detail(id),
    queryFn: () => retrieveInvoiceApi(id),
  });

  return { invoice, isPending, isError };
}
