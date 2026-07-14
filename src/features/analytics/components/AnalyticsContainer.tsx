import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import PendingState from "@/components/states/PendingState";

import { analyticsQueryOptions } from "../queries";
import { filterSchema } from "../schema";
import type { Filter } from "../types";
import AnalyticsFilter from "./AnalyticsFilter";
import AnalyticsInvoiceStatusPie from "./AnalyticsInvoiceStatusPie";
import AnalyticsMonthlyTrend from "./AnalyticsMonthlyTrend";
import AnalyticsStats from "./AnalyticsStats";
import AnalyticsTopClientsByRevenue from "./AnalyticsTopClientsByRevenue";

const routeApi = getRouteApi("/(protected)/analytics/");

export default function AnalyticsContainer() {
  const query = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit } = useForm<Filter>({
    resolver: zodResolver(filterSchema as any),
    defaultValues: {
      date: query,
    },
  });

  const {
    data: analytics,
    isPending,
    isError,
  } = useQuery(analyticsQueryOptions(query));

  const onSubmit = (data: Filter) => {
    setIsOpen(false);
    navigate({ search: (prev) => ({ ...prev, ...data.date }) });
  };

  if (isPending) return <PendingState />;

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <AnalyticsFilter
        onSubmit={onSubmit}
        control={control}
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        onIsOpen={setIsOpen}
      />
      <AnalyticsStats stats={analytics.stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnalyticsMonthlyTrend incomeTrend={analytics?.incomeTrend || []} />
        <AnalyticsInvoiceStatusPie
          invoiceStatus={analytics?.invoiceStatus || []}
        />
        <AnalyticsTopClientsByRevenue
          topClients={analytics?.topClients || []}
        />
      </div>
    </div>
  );
}
