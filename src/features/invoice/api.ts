import { api } from "@/lib/apiClient";

import type { Cursor, Options } from "./types";

export const retrieveOptions = async ({
  pageParam,
  query,
}: {
  pageParam: Cursor;
  query: string;
}): Promise<{ options: Options; nextCursor: Cursor }> => {
  const params = new URLSearchParams();

  if (pageParam) {
    params.set("id", pageParam.id);
    params.set("createdAt", pageParam.createdAt);
  }
  if (query) params.set("query", query);

  const response = await api(`/clients/options?${params.toString()}`, {
    method: "GET",
  });

  return response.data;
};
