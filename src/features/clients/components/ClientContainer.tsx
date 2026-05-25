import { Plus, Search } from "lucide-react";

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

import ClientForm from "./ClientForm";

export default function ClientContainer() {
  return (
    <div className="flex flex-col">
      <ClientForm
        title="New Client"
        description="Add a new client to your database"
        button={
          <Button className="self-end gap-4" size="lg">
            <Plus /> Add Client
          </Button>
        }
      />

      <div className="mt-4">
        <Field>
          <ButtonGroup>
            <InputGroup className="max-w-xs">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              {/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
            </InputGroup>
            <ButtonGroupSeparator />
            <Button variant="outline">Search</Button>
          </ButtonGroup>
        </Field>
      </div>
    </div>
  );
}
