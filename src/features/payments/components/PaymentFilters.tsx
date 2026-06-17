import { getRouteApi } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const routeApi = getRouteApi("/(protected)/payments/");

type FormValues = {
  search: string;
};

export default function PaymentFilters() {
  const navigate = routeApi.useNavigate();
  const { search: urlSearch } = routeApi.useSearch();

  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      search: urlSearch,
    },
  });

  const onSubmit = (data: FormValues) => {
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
    <Card className="bg-transparent ring-0">
      <CardContent className="px-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <ButtonGroup>
              <InputGroup>
                <InputGroupInput
                  placeholder="Search by invoice number, client, or reference number"
                  {...register("search")}
                />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                {urlSearch && (
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

          {/* date filter here */}
          {/* payment method filter here */}
        </form>
      </CardContent>
    </Card>
  );
}
