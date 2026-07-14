import { createFileRoute } from "@tanstack/react-router";

import AnalyticsContainer from "@/features/analytics/components/AnalyticsContainer";
import { analyticsQueryOptions } from "@/features/analytics/queries";
import { filterSchema } from "@/features/analytics/schema";

export const Route = createFileRoute("/(protected)/analytics/")({
  component: AnalyticsPage,
  validateSearch: filterSchema.shape.date,
  loaderDeps: ({ search }) => search,
  loader: async ({ context, deps: query }) => {
    void context.queryClient.prefetchQuery(analyticsQueryOptions(query));
  },
});

function AnalyticsPage() {
  return <AnalyticsContainer />;
}
