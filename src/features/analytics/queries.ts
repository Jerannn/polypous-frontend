import { queryOptions } from "@tanstack/react-query";

import { retrieveAnalytics as retrieveAnalyticsApi } from "./api";
import { analyticsKeys } from "./queryKeys";

export const analyticsQueryOptions = () =>
  queryOptions({
    queryKey: analyticsKeys.all,
    queryFn: retrieveAnalyticsApi,
  });
