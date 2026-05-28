import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationPages } from "../utils/getPaginationPages";
import { getRouteApi } from "@tanstack/react-router";
import type { Meta } from "../types";

const routeApi = getRouteApi("/(protected)/clients/");

const defaultMeta = {
  page: 1,
  limit: 1,
  total: 1,
  totalPage: 1,
  currentPage: 1,
  nextPage: 1,
  prevPage: 1,
};

export default function ClientTablePagination({ meta }: { meta?: Meta }) {
  const navigate = routeApi.useNavigate();

  const { currentPage, nextPage, prevPage, totalPage } = meta || defaultMeta;

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

  if (totalPage === 0) return null;

  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrev}
            className={`${!prevPage && "opacity-70 pointer-events-none"}`}
          />
        </PaginationItem>
        {totalPage > 0 &&
          getPaginationPages(currentPage, totalPage).map((page) => (
            <PaginationItem key={page} onClick={() => handlePageClick(page)}>
              <PaginationLink isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            className={`${!nextPage && "opacity-70 pointer-events-none"}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
