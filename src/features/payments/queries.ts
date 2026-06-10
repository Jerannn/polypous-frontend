import { queryOptions } from "@tanstack/react-query";

import { retrievePayments } from "./api";
import { paymentKeys } from "./queryKeys";
import type { PaymentQueryPayload } from "./types";

export const paymentsQueryOptions = (query: PaymentQueryPayload) =>
  queryOptions({
    queryKey: paymentKeys.list(query),
    queryFn: () => retrievePayments(query),
  });
