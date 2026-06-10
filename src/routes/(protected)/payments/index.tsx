import { createFileRoute } from "@tanstack/react-router";

import PaymentContainer from "@/features/payments/components/PaymentContainer";
import { paymentsQueryOptions } from "@/features/payments/queries";
import { paymentsQuerySchema } from "@/features/payments/schema";
import { queryClient } from "@/lib/queryClient";
import { APP_NAME } from "@/utils/constants";

export const Route = createFileRoute("/(protected)/payments/")({
  component: PaymentPage,
  validateSearch: paymentsQuerySchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps: query }) => {
    void queryClient.ensureQueryData(paymentsQueryOptions(query));
  },
  head: () => ({
    meta: [{ title: `Payments | ${APP_NAME}` }],
  }),
});

function PaymentPage() {
  return <PaymentContainer />;
}
