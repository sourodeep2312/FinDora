import { useState } from "react";
import { createTransaction } from "../services/apiincome";
import Button from "./Button";

function IncomeForm() {
  /*   const [types, setTypes] = useState(null);
  const { data: income, isLoading } = useQuery({
    queryKey: ["income"],
    queryFn: getIncome,
  });
  useEffect(() => {
    if (income && income.length > 0) {
      const extractedTypes = income.map((item) => item.type);
      setTypes(extractedTypes);
    }
  }, [income]);

  if (isLoading) return <Spinner />; */
  const [selectedType, setSelectedType] = useState("");
  return (
    <div className="flex items-center justify-center sha">
      <form
        action={createTransaction}
        className="flex flex-col text-lg  border-zinc-800 bg-white rounded-md shadow-md p-6 w-[28rem]"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Enter your transactions
        </h1>
        <div className="flex items-center gap-4 mb-4">
          <label className="w-24">Type:</label>
          <select
            required
            name="type"
            className="flex-1 border border-zinc-800 rounded-sm px-2 py-1"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="" disabled selected>
              Select income category
            </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="w-24">Amount:</label>
          <input
            type="number"
            required
            name="amount"
            className="flex-1 border border-zinc-800 rounded-sm px-2 py-1"
          />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="w-24">Date:</label>
          <input
            type="date"
            required
            name="date"
            className="flex-1 border border-zinc-800 rounded-sm px-2 py-1"
          />
        </div>

        <div className="flex items-center gap-4 mb-4">
          {selectedType === "income" ? (
            <label className="w-24">Source:</label>
          ) : (
            <label className="w-24">Purpose:</label>
          )}
          {selectedType === "income" ? (
            <select
              required
              name="source"
              className="flex-1 border border-zinc-800 rounded-sm px-2 py-1"
            >
              <option defaultValue="" disabled selected>
                Select income category
              </option>
              <option value="salary">Salary</option>
              <option value="profit">Profits</option>
              <option value="bonus">Bonus</option>
              <option value="gift">Gift</option>
              <option value="freelance">Freelance</option>
              <option value="investment">Investment Income</option>
              <option value="rental">Rental Income</option>
              <option value="dividends">Dividends</option>
              <option value="interest">Interest</option>
              <option value="refunds">Refunds or Rebates</option>
              <option value="grants">Grants or Scholarships</option>
              <option value="royalties">Royalties</option>
              <option value="pension">Pension</option>
              <option value="others">Other</option>
            </select>
          ) : (
            <select
              required
              name="purpose"
              className="flex-1 border border-zinc-800 rounded-sm px-2 py-1"
            >
              <option value="" disabled selected>
                Select expense category
              </option>
              <option value="need">Needs</option>
              <option value="want">Wants</option>
              <option value="investment">Investment</option>
            </select>
          )}
        </div>
        <div className="flex items-center gap-4 mb-4">
          <label className="w-24">Note:</label>
          <textarea
            name="note"
            className="flex-1 border border-zinc-800 rounded-sm px-2 py-1"
          />
        </div>
        <div className="flex justify-between">
          <Button
            type="reset"
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-zinc-800"
          >
            Clear
          </Button>
          <Button
            type="submit"
            className="bg-emerald-700 px-4 py-2 rounded-lg block  text-white  hover:bg-emerald-500 transition"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default IncomeForm;
