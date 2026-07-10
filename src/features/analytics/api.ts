import { api } from "@/lib/axios";

import type { Analytics } from "./types";

export const retrieveAnalytics = async (): Promise<Analytics> => {
  const response = await api.get("/analytics");

  return response.data.data.analytics;
};
