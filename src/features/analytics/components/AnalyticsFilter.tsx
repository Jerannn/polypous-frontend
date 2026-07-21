import { endOfMonth, format, startOfMonth, subDays, subMonths } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown, X } from "lucide-react";
import type { DateRange } from "react-day-picker";
import {
  type Control,
  Controller,
  type UseFormHandleSubmit,
  useWatch,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { Filter } from "../types";

type AnalyticsFilterProps = {
  onSubmit: (data: Filter) => void;
  control: Control<Filter>;
  handleSubmit: UseFormHandleSubmit<Filter>;
  isOpen: boolean;
  onIsOpen: (isOpen: boolean) => void;
  onClear: () => void;
};

export default function AnalyticsFilter({
  onSubmit,
  control,
  handleSubmit,
  isOpen,
  onIsOpen,
  onClear,
}: AnalyticsFilterProps) {
  const dateValue = useWatch({ control, name: "date" });

  const formatDateRange = (from?: Date | string, to?: Date | string) => {
    if (!from && !to) return "All time";

    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    if (fromDate && toDate) {
      if (format(fromDate, "yyyy-MM-dd") === format(toDate, "yyyy-MM-dd")) {
        return format(fromDate, "MMM d, yyyy");
      }
      return `${format(fromDate, "MMM d, yyyy")} - ${format(toDate, "MMM d, yyyy")}`;
    }
    if (fromDate) {
      return `Since ${format(fromDate, "MMM d, yyyy")}`;
    }
    if (toDate) {
      return `Until ${format(toDate, "MMM d, yyyy")}`;
    }
    return "All time";
  };

  const isPresetActive = (
    preset: "7d" | "30d" | "this-month" | "last-month" | "all"
  ) => {
    if (!dateValue?.from && !dateValue?.to) return preset === "all";
    if (preset === "all") return !dateValue?.from && !dateValue?.to;

    const currentFrom = dateValue?.from ? new Date(dateValue.from) : null;
    const currentTo = dateValue?.to ? new Date(dateValue.to) : null;

    if (!currentFrom || !currentTo) return false;

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const fmt = (d: Date) => format(d, "yyyy-MM-dd");

    if (preset === "7d") {
      const targetFrom = subDays(today, 7);
      return fmt(currentFrom) === fmt(targetFrom) && fmt(currentTo) === fmt(today);
    }
    if (preset === "30d") {
      const targetFrom = subDays(today, 30);
      return fmt(currentFrom) === fmt(targetFrom) && fmt(currentTo) === fmt(today);
    }
    if (preset === "this-month") {
      const targetFrom = startOfMonth(today);
      return fmt(currentFrom) === fmt(targetFrom) && fmt(currentTo) === fmt(today);
    }
    if (preset === "last-month") {
      const lastMonth = subMonths(today, 1);
      const targetFrom = startOfMonth(lastMonth);
      const targetTo = endOfMonth(lastMonth);
      return fmt(currentFrom) === fmt(targetFrom) && fmt(currentTo) === fmt(targetTo);
    }

    return false;
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-border/60 pb-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Analytics Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Monitor your revenue growth, invoice pipelines, and client contributions.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        id="analytics-filter-form"
        className="flex items-center gap-2 shrink-0"
      >
        <Popover open={isOpen} onOpenChange={onIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              type="button"
              className="h-10 px-4 flex items-center gap-2.5 font-medium border-border bg-card hover:bg-muted/50 cursor-pointer shadow-sm hover:text-foreground"
            >
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                {formatDateRange(dateValue?.from, dateValue?.to)}
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground opacity-60 ml-1" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0 flex flex-col md:flex-row bg-card border border-border shadow-2xl rounded-xl overflow-hidden z-50" align="end">
            <Controller
              name="date"
              control={control}
              render={({ field }) => {
                const handlePresetClick = (preset: "7d" | "30d" | "this-month" | "last-month" | "all") => {
                  const today = new Date();
                  let from: Date | undefined;
                  let to: Date | undefined = today;

                  if (preset === "7d") {
                    from = subDays(today, 7);
                  } else if (preset === "30d") {
                    from = subDays(today, 30);
                  } else if (preset === "this-month") {
                    from = startOfMonth(today);
                  } else if (preset === "last-month") {
                    const lastMonth = subMonths(today, 1);
                    from = startOfMonth(lastMonth);
                    to = endOfMonth(lastMonth);
                  } else {
                    from = undefined;
                    to = undefined;
                  }

                  field.onChange({ from, to });
                };

                return (
                  <>
                    {/* Preset options sidebar */}
                    <div className="w-full md:w-44 border-b md:border-b-0 md:border-r border-border p-3 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible shrink-0 bg-muted/20">
                      <button
                        type="button"
                        onClick={() => handlePresetClick("all")}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 md:shrink ${
                          isPresetActive("all")
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        All Time
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePresetClick("7d")}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 md:shrink ${
                          isPresetActive("7d")
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Last 7 Days
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePresetClick("30d")}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 md:shrink ${
                          isPresetActive("30d")
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Last 30 Days
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePresetClick("this-month")}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 md:shrink ${
                          isPresetActive("this-month")
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        This Month
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePresetClick("last-month")}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 md:shrink ${
                          isPresetActive("last-month")
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Last Month
                      </button>
                    </div>

                    {/* Calendar & Footer Container */}
                    <div className="flex flex-col p-3">
                      <Calendar
                        mode="range"
                        defaultMonth={field.value?.from ? new Date(field.value.from) : undefined}
                        selected={field.value as DateRange}
                        onSelect={field.onChange}
                        numberOfMonths={1}
                        className="rounded-md border border-border/60 bg-card"
                      />
                      <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-border">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs font-semibold cursor-pointer"
                          onClick={() => {
                            field.onChange({ from: undefined, to: undefined });
                          }}
                        >
                          Clear
                        </Button>
                        <Button
                          type="submit"
                          form="analytics-filter-form"
                          size="sm"
                          className="h-8 text-xs font-semibold cursor-pointer"
                        >
                          Apply Filter
                        </Button>
                      </div>
                    </div>
                  </>
                );
              }}
            />
          </PopoverContent>
        </Popover>

        {/* Quick clear button on toolbar if dates are selected */}
        {(dateValue?.from || dateValue?.to) && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-muted-foreground hover:text-destructive border border-border bg-card hover:bg-destructive/10 cursor-pointer shadow-sm"
            onClick={onClear}
            title="Clear date filter"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </form>
    </div>
  );
}
