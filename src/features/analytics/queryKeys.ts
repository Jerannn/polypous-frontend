import type { Filter } from "./types";

export const analyticsKeys = {
  all: ["analytics"] as const,
  filter: (query: Filter["date"]) => [...analyticsKeys.all, query] as const,
};
