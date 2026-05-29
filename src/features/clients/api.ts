import { api } from "@/lib/apiClient";
import type { SuccessResponse } from "@/types/response.types";

import type { Client, ClientPayload, Meta, QueryPayload } from "./types";

export const create = async (
  payload: ClientPayload,
): Promise<ClientPayload> => {
  const response = await api("/clients", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data.client;
};

export const update = async ({
  payload,
  id,
}: {
  payload: ClientPayload;
  id: string;
}): Promise<ClientPayload> => {
  const response = await api(`/clients/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return response.data.client;
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

  const response = await api(`/clients?${params.toString()}`, {
    method: "GET",
  });

  return {
    clients: response.data.clients,
    meta: response.data.meta,
  };
};

export const deleteClient = async (
  id: string,
): Promise<SuccessResponse<{ data: null }>> => {
  const response = await api(`/clients/${id}`, {
    method: "DELETE",
  });

  return response;
};
