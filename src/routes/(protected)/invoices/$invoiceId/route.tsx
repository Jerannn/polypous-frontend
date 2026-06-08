import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/invoices/$invoiceId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
