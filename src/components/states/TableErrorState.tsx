import { useQueryClient } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { clientsKeys } from "../../features/clients/queryKeys";

const routeApi = getRouteApi("/(protected)/clients/");

export default function ClientTableErrorState() {
  const query = routeApi.useSearch();
  const queryClient = useQueryClient();

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: clientsKeys.list(query) });
  };

  return (
    <Card className="mt-10">
      <CardContent className="pt-6">
        <Empty>
          <EmptyMedia variant="icon">
            <AlertCircle className="text-destructive" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Error Loading Clients</EmptyTitle>
            <EmptyDescription>
              Something went wrong while trying to fetch the client list. Please
              try again.
            </EmptyDescription>
          </EmptyHeader>
          <Button type="button" variant="outline" onClick={handleRetry}>
            Try again
          </Button>
        </Empty>
      </CardContent>
    </Card>
  );
}
