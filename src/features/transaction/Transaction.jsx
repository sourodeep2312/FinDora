import { useQuery } from "@tanstack/react-query";
import { getIncome } from "../../services/apiIncome";
import IncomeTable from "../../ui/IncomeTable";
import Spinner from "../../ui/Spinner";
import TransactionTableFooter from "../../ui/TransactionTableFooter";
import TransactionTableHeader from "../../ui/TransactionTableHeader";
import { TransactionProvider } from "../../context/TransactionContext";

function Transaction() {
  const {
    data: income,
    isLoading: isIncomeLoading,
    error: incomeError,
  } = useQuery({
    queryKey: ["transaction"],
    queryFn: getIncome,
  });

  if (isIncomeLoading) return <Spinner />;
  console.log(income, "income data in transaction component");

  return (
    /*   <div>
      <TransactionTableHeader
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        sortValue={sortValue}
        setSortValue={setSortValue}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
      <div className=" bg-stone-100 mt-5 ">
        <IncomeTable
          income={income}
          error={incomeError}
          filterValue={filterValue}
          sortValue={sortValue}
          dateFilter={dateFilter}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        <TransactionTableFooter
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div> */
    <TransactionProvider income={income} error={incomeError}>
      <TransactionTableHeader />

      <IncomeTable transactions={income} />
      <TransactionTableFooter />
    </TransactionProvider>
  );
}

export default Transaction;
