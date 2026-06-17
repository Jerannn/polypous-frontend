import { queryOptions } from "@tanstack/react-query";

import { retrieveOverview as retrieveOverviewApi } from "./api";
import { dashboardKeys } from "./queryKeys";

export const overviewQueryOptions = () =>
  queryOptions({
    queryKey: dashboardKeys.overview(),
    queryFn: retrieveOverviewApi,
  });
