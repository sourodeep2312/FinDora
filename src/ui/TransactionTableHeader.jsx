import { useTransactionContext } from "../context/TransactionContext";
import { Filter, DateFilter } from "./Filter";
import Sort from "./Sort";

function TransactionTableHeader() {
  const {
    filterValue,
    sortValue,
    setFilterValue,
    setSortValue,
    dateFilter,
    setDateFilter,
  } = useTransactionContext();
  return (
    <div>
      <div className="flex flex-col xl:flex-row justify-between">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-4 mt-5">
          Transactions
        </h1>

        <div className="font-bold mb-4 md:mt-5 flex flex-col items-end sm:flex-row sm:flex-wrap sm:items-center sm:justify-end gap-2 sm:gap-4 w-full xl:w-auto">
          <Filter
            value={filterValue}
            onChange={setFilterValue}
            className="w-full sm:w-auto"
          />
          <DateFilter
            value={dateFilter}
            onChange={setDateFilter}
            className="w-full sm:w-auto"
          />
          <Sort
            value={sortValue}
            onChange={setSortValue}
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default TransactionTableHeader;
