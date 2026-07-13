import { createFileRoute } from "@tanstack/react-router";

import PendingState from "@/components/states/PendingState";
import AnalyticsContainer from "@/features/analytics/components/AnalyticsContainer";
import { analyticsQueryOptions } from "@/features/analytics/queries";
import { filterSchema } from "@/features/analytics/schema";

export const Route = createFileRoute("/(protected)/analytics/")({
  component: AnalyticsPage,
  validateSearch: filterSchema.shape.date,
  loaderDeps: ({ search }) => search,
  loader: async ({ context, deps: query }) => {
    console.log(query);

    await context.queryClient.ensureQueryData(analyticsQueryOptions(query));
  },
  pendingComponent: () => <PendingState />,
});

function AnalyticsPage() {
  return <AnalyticsContainer />;
}
