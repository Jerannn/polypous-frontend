import { useQuery } from "@tanstack/react-query";
import { paymentKeys } from "../queryKeys";
import { retrievePaymentStats as retrievePaymentStatsApi } from "../api";

export default function useRetrievePaymentStats() {
  const {
    data: stats,
    isPending,
    isError,
  } = useQuery({
    queryKey: paymentKeys.stats(),
    queryFn: () => retrievePaymentStatsApi(),
  });
  return { stats, isPending, isError };
}
