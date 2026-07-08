import { createFileRoute } from "@tanstack/react-router";

import AnalyticsContainer from "@/features/analytics/components/AnalyticsContainer";

export const Route = createFileRoute("/(protected)/analytics/")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return <AnalyticsContainer />;
}
