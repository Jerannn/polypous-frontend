import { api } from "@/lib/axios";
import type { Meta } from "@/types/shared.types";

import type {
  Client,
  ClientPayload,
  ClientResponse,
  QueryPayload,
} from "./types";

export const create = async (
  payload: ClientPayload,
): Promise<ClientResponse> => {
  const response = await api.post("/clients", payload);

  return response.data.data.client;
};

export const update = async ({
  payload,
  id,
}: {
  payload: ClientPayload;
  id: string;
}): Promise<ClientResponse> => {
  const response = await api.patch(`/clients/${id}`, payload);

  return response.data.data.client;
};

export const retrieve = async (
  query: QueryPayload,
): Promise<{
  clients: Client[];
  meta: Meta;
}> => {
  const params = new URLSearchParams();

  if (query.page) params.set("page", query.page.toString());
  if (query.limit) params.set("limit", query.limit.toString());
  if (query.search) params.set("search", query.search.toString());

  const response = await api.get("/clients", {
    params,
  });

  return {
    clients: response.data.data.clients,
    meta: response.data.data.meta,
  };
};

export const deleteClient = async (id: string): Promise<boolean> => {
  const response = await api.delete(`/clients/${id}`);

  return response.data.data.isDeleted;
};
