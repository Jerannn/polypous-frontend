import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "../queryKeys";

export default function useRetrieveRecentInvoices() {
  const {
    data: recentInvoices,
    isPending,
    isError,
  } = useQuery({
    queryKey: dashboardKeys.recent(),
    queryFn: () => {},
  });
  return { recentInvoices, isPending, isError };
}
