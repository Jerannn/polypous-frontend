import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/payments/")({
  component: PaymentPage,
});

function PaymentPage() {
  return <div>PAYMENT PAGE</div>;
}
