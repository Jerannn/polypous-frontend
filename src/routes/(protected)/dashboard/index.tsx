import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  return <div>DASHBOARD</div>;
}
