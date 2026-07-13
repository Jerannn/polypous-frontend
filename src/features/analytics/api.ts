import { api } from "@/lib/axios";

import type { Analytics, Filter } from "./types";

export const retrieveAnalytics = async (
  filter: Filter["date"],
): Promise<Analytics> => {
  const params = new URLSearchParams();

  if (filter.from) params.set("from", filter.from.toISOString());
  if (filter.to) params.set("to", filter.to.toISOString());

  const response = await api.get("/analytics", { params });

  return response.data.data.analytics;
};
