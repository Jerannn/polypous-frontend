import type { QueryPayload } from "./types";

export const clientsKeys = {
  all: ["clients"] as const,
  list: (params: QueryPayload) => [...clientsKeys.all, params] as const,
};
