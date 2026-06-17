import { api } from "@/lib/apiClient";

export const retrieveOverview = async () => {
  const response = await api("/dashboard/overview", { method: "GET" });

  return response.data.overview;
};
