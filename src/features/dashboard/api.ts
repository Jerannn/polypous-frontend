import { api } from "@/lib/axios";

import type { Overview } from "./types";

export const retrieveOverview = async (): Promise<Overview> => {
  const response = await api.get("/dashboard/overview");

  return response.data.data.overview;
};
