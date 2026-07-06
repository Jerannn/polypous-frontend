import { createFileRoute } from "@tanstack/react-router";

import PendingState from "@/components/states/PendingState";
import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import { overviewQueryOptions } from "@/features/dashboard/queries";

export const Route = createFileRoute("/(protected)/dashboard/")({
  component: DashboardPage,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(overviewQueryOptions());
  },
  pendingComponent: () => <PendingState />,
});

function DashboardPage() {
  return <DashboardContainer />;
}
