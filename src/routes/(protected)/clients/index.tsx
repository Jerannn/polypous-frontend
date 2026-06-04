import { createFileRoute } from "@tanstack/react-router";

import ClientContainer from "@/features/clients/components/ClientContainer";
import { clientsListQueryOptions } from "@/features/clients/queries";
import { querySchema } from "@/features/clients/schema";
import { queryClient } from "@/lib/queryClient";
import { APP_NAME } from "@/utils/constants";

export const Route = createFileRoute("/(protected)/clients/")({
  validateSearch: querySchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => {
    void queryClient.prefetchQuery(clientsListQueryOptions(deps));
  },
  component: ClientPage,
  head: () => ({
    meta: [{ title: `Clients | ${APP_NAME}` }],
  }),
});

function ClientPage() {
  return <ClientContainer />;
}
