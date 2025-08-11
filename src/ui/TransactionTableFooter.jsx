import { useTransactionContext } from "../context/TransactionContext";

function TransactionTableFooter() {
  const { currentPage, setCurrentPage, itemsPerPage, totalItems } =
    useTransactionContext();

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  return (
    <div className="mt-4 flex justify-end">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-emerald-500 text-white rounded font-medium text-lg hover:bg-emerald-400"
      >
        Prev
      </button>
      <span className="mx-2 my-auto text-lg font-medium">
        Page {currentPage} of {totalPages}{" "}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-emerald-500 text-white rounded font-medium text-lg hover:bg-emerald-400"
      >
        Next
      </button>
    </div>
  );
}

export default TransactionTableFooter;
