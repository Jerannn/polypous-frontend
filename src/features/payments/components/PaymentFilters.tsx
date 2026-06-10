import { Search } from "lucide-react";

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

export default function PaymentFilters() {
  return (
    <Card className="bg-transparent ring-0">
      <CardContent>
        <form>
          <Field>
            <ButtonGroup>
              <InputGroup>
                <InputGroupInput
                  placeholder="Search by invoice number, client, or reference number"
                  // {...register("search")}
                />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                {/* {urlSearch && (
                    <InputGroupAddon
                      align="inline-end"
                      className="cursor-pointer rounded-full p-0.5 mr-1 hover:bg-muted hover:text-accent-foreground"
                      onClick={handleClearSearch}
                    >
                      <X className="" />
                    </InputGroupAddon>
                  )} */}
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
