import { useQuery } from "@tanstack/react-query";
import { getIncome } from "../../services/apiincome";
import IncomeTable from "../../ui/IncomeTable";
import Spinner from "../../ui/Spinner";

function Transaction() {
  const {
    data: income,
    isLoading: isIncomeLoading,
    error: incomeError,
  } = useQuery({
    queryKey: ["income"],
    queryFn: getIncome,
  });

  if (isIncomeLoading) return <Spinner />;
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-extrabold mb-4 mt-5">All Transactions</h1>
        <p className="text-xl font-bold mb-4 mt-5">Filter/sort</p>
      </div>
      <div className=" bg-stone-100 mt-5 ">
        <IncomeTable income={income} error={incomeError} />
      </div>
    </div>
  );
}

export default Transaction;
