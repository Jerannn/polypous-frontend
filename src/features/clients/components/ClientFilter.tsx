import { getRouteApi } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const routeApi = getRouteApi("/(protected)/clients/");

type FormValues = {
  search: string;
};

export default function ClientFilter() {
  const navigate = routeApi.useNavigate();
  const { search: urlSearch } = routeApi.useSearch();

  const { control, register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      search: urlSearch,
    },
  });

  const search = useWatch({ control, name: "search" });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    navigate({
      search: (prev) => ({
        ...prev,
        search: data.search,
        page: 1,
      }),
    });
  };

  const handleClearSearch = () => {
    setValue("search", "");
    navigate({
      search: (prev) => ({
        ...prev,
        search: "",
        page: 1,
      }),
    });
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <ButtonGroup>
            <InputGroup className="max-w-xs">
              <InputGroupInput
                placeholder="Search..."
                {...register("search")}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              {search && (
                <InputGroupAddon
                  align="inline-end"
                  className="cursor-pointer rounded-full p-0.5 mr-1 hover:bg-muted hover:text-accent-foreground"
                  onClick={handleClearSearch}
                >
                  <X className="" />
                </InputGroupAddon>
              )}
            </InputGroup>
            <ButtonGroupSeparator />
            <Button type="submit" variant="outline">
              Search
            </Button>
          </ButtonGroup>
        </Field>
      </form>
    </div>
  );
}
