import { createFileRoute } from "@tanstack/react-router";

import ClientContainer from "@/features/clients/components/ClientContainer";

export const Route = createFileRoute("/(protected)/clients/")({
  component: ClientPage,
});

function ClientPage() {
  return <ClientContainer />;
}
