import Image from "next/image";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const renderPageNumbers = () => {
    const createPageArray: number[] = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

    const middlePageCondition =
      currentPage === totalPages ||
      currentPage === totalPages - 1 ||
      currentPage === totalPages - 2;
    const middlePages =
      totalPages > 4
        ? [
            currentPage === 1 || currentPage === 2 || currentPage === 3
              ? 2
              : middlePageCondition
              ? totalPages - 3
              : currentPage - 1,
            currentPage === 1 || currentPage === 2 || currentPage === 3
              ? 3
              : middlePageCondition
              ? totalPages - 2
              : currentPage,
            currentPage === 1 || currentPage === 2 || currentPage === 3
              ? 4
              : middlePageCondition
              ? totalPages - 1
              : currentPage + 1,
          ]
        : createPageArray;
    return (
      <ul className="flex">
        {middlePages.map((page, index) => (
          <li key={index} onClick={() => onPageChange(page)}>
            <button
              className={`w-8 h-8 rounded-full ${
                currentPage === page ? "bg-black text-white" : ""
              }`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="flex">
        {totalPages > 4 ? (
          <>
            <button
              onClick={() =>
                currentPage > 1 ? onPageChange(currentPage - 1) : null
              }
            >
              <Image
                src="/arrow-left.svg"
                alt="arrow-left"
                width={16}
                height={16}
              />
            </button>
            <button
              className={`${
                currentPage === 1
                  ? "w-8 h-8 rounded-full bg-black text-white"
                  : "w-8 h-8 rounded-full"
              }`}
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            <span className="w-8 h-8 text-center">...</span>
          </>
        ) : null}
        {renderPageNumbers()}
        {totalPages > 4 ? (
          <>
            <span className="w-8 h-8 text-center">...</span>
            <button
              className={`${
                currentPage === totalPages
                  ? "w-8 h-8 rounded-full bg-black text-white"
                  : "w-8 h-8 rounded-full"
              }`}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
            <button
              onClick={() =>
                totalPages > currentPage ? onPageChange(currentPage + 1) : null
              }
            >
              <Image
                src="/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </button>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default Pagination;
