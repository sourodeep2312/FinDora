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
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-extrabold mb-4 mt-5">All Transactions</h1>
        <div className="text-xl font-bold mb-4 mt-5 flex space-x-4">
          <Filter value={filterValue} onChange={setFilterValue} />
          <DateFilter value={dateFilter} onChange={setDateFilter} />
          <Sort value={sortValue} onChange={setSortValue} />
        </div>
      </div>
    </div>
  );
}

export default TransactionTableHeader;
