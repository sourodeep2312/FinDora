import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
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
    <div className="mt-4 flex  items-center justify-between sm:justify-end gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-emerald-500 text-white rounded font-medium text-lg hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed  "
      >
        <ArrowLeftIcon className="w-4 h-4 text-center" />
      </button>

      <span className="text-lg font-medium text-center">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-emerald-500 text-white rounded font-medium text-lg hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed "
      >
        <ArrowRightIcon className="w-4 h-4 text-center" />
      </button>
    </div>
  );
}

export default TransactionTableFooter;
