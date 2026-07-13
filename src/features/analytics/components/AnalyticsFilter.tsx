import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Controller,
  type Control,
  type UseFormHandleSubmit,
} from "react-hook-form";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import type { Filter } from "../types";
import type { DateRange } from "react-day-picker";

type AnalyticsFilter = {
  onSubmit: (data: Filter) => void;
  control: Control<Filter>;
  handleSubmit: UseFormHandleSubmit<Filter>;
  isOpen: boolean;
  onIsOpen: (isOpen: boolean) => void;
};

export default function AnalyticsFilter({
  onSubmit,
  control,
  handleSubmit,
  isOpen,
  onIsOpen,
}: AnalyticsFilter) {
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="analytics-filter-form"
        className="max-w-40 ml-auto"
      >
        <Field>
          <FieldLabel className="justify-end">Date</FieldLabel>
          <FieldDescription className="text-right">
            Filter your analytics here.
          </FieldDescription>
          <Popover open={isOpen} onOpenChange={onIsOpen}>
            <PopoverTrigger asChild>
              <Button>Filter</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <Calendar
                    mode="range"
                    defaultMonth={field.value.from}
                    selected={field.value as DateRange}
                    onSelect={field.onChange}
                    numberOfMonths={1}
                  />
                )}
              />
              <Button
                type="submit"
                form="analytics-filter-form"
                className="mt-2"
              >
                Filter
              </Button>
            </PopoverContent>
          </Popover>
        </Field>
      </form>
    </div>
  );
}
