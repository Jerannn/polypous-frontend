import { useInfiniteQuery } from "@tanstack/react-query";

import { retrieveOptions as retrieveOptionsApi } from "../api";
import { invoiceKeys } from "../queryKeys";
import type { Cursor } from "../types";

type useRetrieveOptiontsProps = {
  query: string;
};

export default function useRetrieveOptionts({
  query,
}: useRetrieveOptiontsProps) {
  return useInfiniteQuery({
    queryKey: invoiceKeys.options(query),
    queryFn: ({ pageParam }) => retrieveOptionsApi({ pageParam, query }),
    initialPageParam: null as Cursor,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
  });
}
