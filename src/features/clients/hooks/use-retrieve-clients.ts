import { useQuery } from "@tanstack/react-query";
import { retrieve } from "../api";
import type { QueryPayload } from "../types";

export default function useRetrieveClients(query: QueryPayload) {
  const { page, limit, search } = query;

  const { data, isLoading } = useQuery({
    queryKey: ["clients", page, limit, search],
    queryFn: () => retrieve(query),
  });

  return { data, isLoading };
}
