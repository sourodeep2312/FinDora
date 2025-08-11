import { useQuery } from "@tanstack/react-query";
import { getIncome } from "../services/apiIncome";
import Spinner from "./Spinner";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Charts() {
  const {
    data: transactions,
    isLoading: isTransactionLoading,
    error: incomeError,
  } = useQuery({
    queryKey: ["transaction"],
    queryFn: getIncome,
  });
  /*   const dataForChart = transactions?.map((transaction) => ({
    date: transaction.date,
    amount: transaction.amount,
    type: transaction.type,
  })); */
  function aggregateByDateAndType(transactions) {
    const result = {};

    transactions.forEach(({ date, amount, type }) => {
      if (!result[date]) result[date] = { date };
      result[date][type] = (result[date][type] || 0) + amount;
    });

    return Object.values(result);
  }
  if (isTransactionLoading) return <Spinner />;
  if (incomeError)
    return (
      <div className="text-4xl px-6 py-19 mt-5 rounded-2xl text-center bg-amber-300 text-zinc-600 font-bold">
        Error loading data:
        <span className="text-rose-700">{incomeError.message}</span>
      </div>
    );
  if (!transactions || transactions.length === 0)
    return (
      <div className="text-4xl px-6 py-19 mt-5 rounded-2xl text-center bg-amber-300 text-zinc-600 font-bold ">
        <h1>
          <p className="my-5">No transactions logged yet.</p>{" "}
          <p className="my-5"> Add Your first transaction to see the charts!</p>
        </h1>
      </div>
    );
  const aggregatedData = aggregateByDateAndType(transactions);
  const totalIncome = aggregatedData.reduce(
    (sum, item) => sum + (item.income || 0),
    0
  );
  const totalExpense = aggregatedData.reduce(
    (sum, item) => sum + (item.expense || 0),
    0
  );

  const pieData = [
    { type: "income", total: totalIncome },
    { type: "expense", total: totalExpense },
  ];

  return (
    <>
      <div className="w-full h-full bg-stone-300 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Transaction Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={aggregatedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <Bar dataKey="income" fill="#819767" />
            <Bar dataKey="expense" fill="#c97c74" />
            <XAxis dataKey="date" tickFormatter={(date) => date.slice(0, 10)} />
            <YAxis />
            <Tooltip
              cursor={{ fill: "transparent" }}
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleDateString();
              }}
              formatter={(value) => `₹${value}`}
              wrapperStyle={{
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            />
            <Legend
              wrapperStyle={{
                fontSize: "20px", // change legend font size
                fontWeight: "semibold",
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full h-full bg-stone-300 p-4 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl  font-bold mb-4">
          Income and Expense Overview
        </h2>
        <div className="flex justify-center items-center h-full">
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={140}
              fill="#8884d8"
              dataKey="total"
              nameKey={(entry) => entry.type}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.type === "income" ? "#819767" : "#c97c74"}
                />
              ))}
            </Pie>
            <Tooltip cursor={{ fill: "transparent" }} />
            <Legend
              height={50}
              wrapperStyle={{
                fontSize: "20px", // change legend font size
                fontWeight: "semibold",
              }}
            />
          </PieChart>
        </div>
      </div>
    </>
  );
}
