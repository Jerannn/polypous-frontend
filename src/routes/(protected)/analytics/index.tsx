import { createFileRoute } from "@tanstack/react-router";

import PendingState from "@/components/states/PendingState";
import AnalyticsContainer from "@/features/analytics/components/AnalyticsContainer";
import { analyticsQueryOptions } from "@/features/analytics/queries";

export const Route = createFileRoute("/(protected)/analytics/")({
  component: AnalyticsPage,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(analyticsQueryOptions());
  },
  pendingComponent: () => <PendingState />,
});

function AnalyticsPage() {
  return <AnalyticsContainer />;
}
