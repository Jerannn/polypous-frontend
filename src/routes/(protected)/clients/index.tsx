import { createFileRoute } from "@tanstack/react-router";

import ClientContainer from "@/features/clients/components/ClientContainer";
import { clientsListQueryOptions } from "@/features/clients/queries";
import { querySchema } from "@/features/clients/schema";
import { queryClient } from "@/lib/queryClient";

export const Route = createFileRoute("/(protected)/clients/")({
  validateSearch: querySchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => {
    void queryClient.prefetchQuery(clientsListQueryOptions(deps));
  },
  component: ClientPage,
});

function ClientPage() {
  return <ClientContainer />;
}
