import { useQuery } from "@tanstack/react-query";

import { retrievePaymentStats as retrievePaymentStatsApi } from "../api";
import { paymentKeys } from "../queryKeys";

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
