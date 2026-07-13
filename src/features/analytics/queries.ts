import { queryOptions } from "@tanstack/react-query";

import { retrieveAnalytics as retrieveAnalyticsApi } from "./api";
import { analyticsKeys } from "./queryKeys";
import type { Filter } from "./types";

export const analyticsQueryOptions = (filter: Filter["date"]) =>
  queryOptions({
    queryKey: analyticsKeys.filter(filter),
    queryFn: () => retrieveAnalyticsApi(filter),
  });
