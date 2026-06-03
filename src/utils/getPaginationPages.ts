const visiblePages = 4;

export const getPaginationPages = (currentPage: number, totalPage: number) => {
  if (!totalPage) return [];

  let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
  let endPage = startPage + visiblePages - 1;

  if (endPage > totalPage) {
    endPage = totalPage;
    startPage = endPage - visiblePages + 1;
  }

  if (startPage < 1) startPage = 1;

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => index + startPage,
  );
};
