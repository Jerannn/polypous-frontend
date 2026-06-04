import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Meta } from "@/types/shared.types";
import { getPaginationPages } from "@/utils/getPaginationPages";

type DataTablePaginationProps = {
  meta?: Meta;
  onPageChange: (page: number) => void;
};

const defaultMeta = {
  page: 1,
  limit: 1,
  total: 1,
  totalPage: 1,
  currentPage: 1,
  nextPage: null,
  prevPage: null,
};

export default function DataTablePagination({
  meta,
  onPageChange,
}: DataTablePaginationProps) {
  const { currentPage, nextPage, prevPage, totalPage } = meta || defaultMeta;

  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => prevPage && onPageChange(currentPage - 1)}
            className={`${!prevPage && "opacity-70 pointer-events-none"}`}
          />
        </PaginationItem>
        {totalPage > 0 &&
          getPaginationPages(currentPage, totalPage).map((page) => (
            <PaginationItem key={page} onClick={() => onPageChange(page)}>
              <PaginationLink isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => nextPage && onPageChange(currentPage + 1)}
            className={`${!nextPage && "opacity-70 pointer-events-none"}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
