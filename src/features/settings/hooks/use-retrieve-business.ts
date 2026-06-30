import { useQuery } from "@tanstack/react-query";

import { retrieveMyBusiness as retrieveMyBusinessApi } from "../api";
import { settingsKeys } from "../queryKeys";

export default function useRetrieveBusiness() {
  const { data: business, isPending: isRetrieving } = useQuery({
    queryKey: settingsKeys.business(),
    queryFn: retrieveMyBusinessApi,
  });

  return { business, isRetrieving };
}
