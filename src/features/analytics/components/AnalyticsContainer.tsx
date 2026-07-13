import { useSuspenseQuery } from "@tanstack/react-query";

import { analyticsQueryOptions } from "../queries";
import AnalyticsInvoiceStatusPie from "./AnalyticsInvoiceStatusPie";
import AnalyticsMonthlyTrend from "./AnalyticsMonthlyTrend";
import AnalyticsStats from "./AnalyticsStats";
import AnalyticsTopClientsByRevenue from "./AnalyticsTopClientsByRevenue";
import AnalyticsFilter from "./AnalyticsFilter";
import { useForm } from "react-hook-form";
import type { Filter } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterSchema } from "../schema";
import { getRouteApi } from "@tanstack/react-router";
import { useState } from "react";

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

  const { data: analytics } = useSuspenseQuery(analyticsQueryOptions(query));

  const onSubmit = (data: Filter) => {
    setIsOpen(false);
    navigate({ search: (prev) => ({ ...prev, ...data.date }) });
  };

  return (
    <div>
      <AnalyticsFilter
        onSubmit={onSubmit}
        control={control}
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        onIsOpen={setIsOpen}
      />
      <AnalyticsStats
        stats={analytics?.stats}
        numberOfMonths={analytics?.monthlyIncome.length}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnalyticsMonthlyTrend
          monthlyIncomeList={analytics?.monthlyIncome || []}
        />
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
