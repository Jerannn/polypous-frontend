import { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { useInView } from "react-intersection-observer";

import ActionButtonContent from "@/components/ActionButtonContent";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useDebounce } from "@/hooks/useDebounce";
import { useInvoiceForm } from "../../InvoiceFormContext";
import useRetrieveOptionts from "../../hooks/use-retrieve-optionts";

export default function ClientSelectPopover() {
  const { form, isSubmitting } = useInvoiceForm();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 500);

  const { data, fetchNextPage, isFetchingNextPage, isLoading, hasNextPage } =
    useRetrieveOptionts({ query: debounceQuery.trim() });
  const options = data?.pages.flatMap((page) => page.options) || [];

  const clientId = useWatch({ control: form.control, name: "clientId" });

  const selectedClient =
    options?.find((option) => option.id === clientId) || "";

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="clientId"
          className="justify-start font-normal bg-input/20"
          disabled={isSubmitting}
        >
          {selectedClient ? selectedClient.name : <span>Pick a client</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="max-w-fit w-full p-0" align="start">
        <Controller
          name="clientId"
          control={form.control}
          render={({ field }) => {
            return (
              <Command
                className="w-full"
                key={isLoading ? "loading" : "loaded"}
                shouldFilter={false}
              >
                <CommandInput
                  placeholder="Pick or search a client..."
                  autoFocus
                  value={query}
                  onValueChange={setQuery}
                />
                <CommandList>
                  {isLoading ? (
                    <>
                      <CommandItem disabled>
                        <ActionButtonContent
                          action="Loading..."
                          isLoading={isLoading}
                        />
                      </CommandItem>
                    </>
                  ) : (
                    <CommandGroup heading="Suggestions">
                      <CommandEmpty>No results found.</CommandEmpty>
                      {options?.map((option) => (
                        <CommandItem
                          key={option.id}
                          value={option.id}
                          onSelect={() => {
                            field.onChange(option.id);
                            setOpen(false);
                          }}
                        >
                          {option.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  {hasNextPage && (
                    <>
                      <Separator />
                      <CommandItem disabled ref={ref}>
                        <ActionButtonContent
                          action={isFetchingNextPage ? "Loading..." : ""}
                          isLoading={isFetchingNextPage}
                        />
                      </CommandItem>
                    </>
                  )}
                </CommandList>
              </Command>
            );
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
