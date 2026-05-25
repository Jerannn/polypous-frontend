import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/analytics/")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return <div>ANALYTICS PAGE</div>;
}
