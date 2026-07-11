import { createFileRoute } from "@tanstack/react-router";

import PaymentContainer from "@/features/payments/components/PaymentContainer";
import { paymentsQueryOptions } from "@/features/payments/queries";
import { paymentsQuerySchema } from "@/features/payments/schema";
import { queryClient } from "@/lib/queryClient";

export const Route = createFileRoute("/(protected)/payments/")({
  component: PaymentPage,
  validateSearch: paymentsQuerySchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps: query }) => {
    void queryClient.ensureQueryData(paymentsQueryOptions(query));
  },
});

function PaymentPage() {
  return <PaymentContainer />;
}
