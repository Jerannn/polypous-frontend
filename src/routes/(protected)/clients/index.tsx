import { createFileRoute } from "@tanstack/react-router";

import ClientContainer from "@/features/clients/components/ClientContainer";
import { querySchema } from "@/features/clients/schema";

export const Route = createFileRoute("/(protected)/clients/")({
  validateSearch: querySchema,
  component: ClientPage,
});

function ClientPage() {
  return <ClientContainer />;
}
