import { createFileRoute } from "@tanstack/react-router";

import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import { overviewQueryOptions } from "@/features/dashboard/queries";
import { queryClient } from "@/lib/queryClient";

export const Route = createFileRoute("/(protected)/dashboard/")({
  component: DashboardPage,
  loader: async () => {
    await queryClient.ensureQueryData(overviewQueryOptions());
  },
});

function DashboardPage() {
  return <DashboardContainer />;
}
