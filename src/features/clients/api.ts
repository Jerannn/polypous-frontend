import { api } from "@/lib/apiClient";

import type { ClientPayload } from "./types";

export const create = async (
  payload: ClientPayload,
): Promise<ClientPayload> => {
  const response = await api("/clients", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data.client;
};
