import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useRetrieveClients from "../hooks/use-retrieve-clients";
import { getRouteApi } from "@tanstack/react-router";
import ClientTablePagination from "./ClientTablePagination";
import ClientTableBody from "./ClientTableBody";
import ClientTableHeader from "./ClientTableHeader";
import ClientTableErrorState from "./ClientTableErrorState";
import ClientTableLoadingState from "./ClientTableLoadingState";

const routeApi = getRouteApi("/(protected)/clients/");

export default function ClientTable() {
  const query = routeApi.useSearch();

  const { data, isLoading, isError } = useRetrieveClients(query);
  const clients = data?.clients ?? [];
  const meta = data?.meta;

  if (isLoading) return <ClientTableLoadingState />;
  if (isError) return <ClientTableErrorState />;

  return (
    <Card className="mt-10">
      <CardHeader>
        <CardTitle>All Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <ClientTableHeader />
          </TableHeader>
          <TableBody>
            <ClientTableBody clients={clients} />
          </TableBody>
          <TableFooter className="bg-transparent">
            <TableRow className="w-full text-right hover:bg-transparent">
              <TableCell colSpan={100} className="pt-4">
                <ClientTablePagination meta={meta} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
