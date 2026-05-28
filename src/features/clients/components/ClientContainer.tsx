import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import ClientForm from "./ClientForm";
import ClientTable from "./ClientTable";
import ClientFilter from "./ClientFilter";

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

      <ClientFilter />

      <ClientTable />
    </div>
  );
}
