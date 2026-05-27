import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FilePenLine,
  MapPin,
  MapPinXInside,
  Phone,
  PhoneOff,
  Trash2,
} from "lucide-react";
import useRetrieveClients from "../hooks/use-retrieve-clients";
import { getRouteApi } from "@tanstack/react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const routeApi = getRouteApi("/(protected)/clients/");

export default function ClientTable() {
  const query = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const { data, isLoading } = useRetrieveClients(query);
  const clients = data?.clients ?? [];
  const meta = data?.meta;

  const handleNext = () => {
    if (!meta?.nextPage) return;

    navigate({
      search: (prev) => ({
        ...prev,
        page: prev.page + 1,
      }),
    });
  };

  const handlePrev = () => {
    if (!meta?.prevPage) return;

    navigate({
      search: (prev) => ({
        ...prev,
        page: prev.page - 1,
      }),
    });
  };

  const handlePageClick = (page: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page,
      }),
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card className="mt-10">
      <CardHeader>
        <CardTitle>All Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-60">Name</TableHead>
              <TableHead className="w-60">Contact</TableHead>
              <TableHead>Invoices</TableHead>
              <TableHead>Total Paid</TableHead>
              <TableHead>Unpaid Balance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">
                  <span className="block font-semibold">{client.name}</span>
                  <span className="block">{client.email}</span>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-2 ">
                    {client.phone ? (
                      <>
                        <Phone className="w-3 h-3" />
                        {client.phone}
                      </>
                    ) : (
                      <>
                        <PhoneOff className="w-3 h-3" />
                        No phone
                      </>
                    )}
                  </span>
                  <span className="flex items-center gap-2 ">
                    {client.address ? (
                      <>
                        <MapPin className="w-3 h-3" />
                        {client.address}
                      </>
                    ) : (
                      <>
                        <MapPinXInside className="w-3 h-3" />
                        No address
                      </>
                    )}
                  </span>
                </TableCell>
                <TableCell>{client.invoiceCount}</TableCell>
                <TableCell className="text-primary">
                  ${client.totalPaid}
                </TableCell>
                <TableCell className="text-accent">
                  ${client.totalUnpaid}
                </TableCell>
                <TableCell className="text-right space-x-3">
                  <Button variant="ghost">
                    <FilePenLine />
                  </Button>
                  <Button variant="destructive">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-transparent">
            <TableRow className="w-full text-right hover:bg-transparent">
              <TableCell colSpan={100} className="pt-4">
                <Pagination className="justify-end">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious onClick={handlePrev} />
                    </PaginationItem>
                    {meta?.totalPage &&
                      Array.from({ length: meta.totalPage }).map((_, index) => (
                        <PaginationItem
                          key={index}
                          onClick={() => handlePageClick(index + 1)}
                        >
                          <PaginationLink
                            isActive={index + 1 === meta.currentPage}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext onClick={handleNext} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
