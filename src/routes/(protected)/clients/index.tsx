import { createFileRoute } from "@tanstack/react-router";

import ClientContainer from "@/features/clients/components/ClientContainer";
import { clientsListQueryOptions } from "@/features/clients/queries";
import { querySchema } from "@/features/clients/schema";

export const Route = createFileRoute("/(protected)/clients/")({
  validateSearch: querySchema,
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) => {
    void context.queryClient.prefetchQuery(clientsListQueryOptions(deps));
  },
  component: ClientPage,
});

function ClientPage() {
  return <ClientContainer />;
}
