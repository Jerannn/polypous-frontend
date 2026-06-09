import { createFileRoute } from "@tanstack/react-router";

import PaymentContainer from "@/features/payments/components/PaymentContainer";

export const Route = createFileRoute("/(protected)/payments/")({
  component: PaymentPage,
});

function PaymentPage() {
  return <PaymentContainer />;
}
