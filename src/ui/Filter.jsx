export function Filter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-sm w-[160px] md:text-2xl px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
    >
      <option value="all">All Transactions</option>
      <option value="income">Income Only</option>
      <option value="expense">Expenses Only</option>
    </select>
  );
}

export function DateFilter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-sm w-[160px] md:text-2xl px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
    >
      <option value="all">All Dates</option>
      <option value="last_7_days">Last 7 Days</option>
      <option value="last_30_days">Last 30 Days</option>
      <option value="this_month">This Month</option>
      <option value="last_month">Last Month</option>
      <option value="this_year">This Year</option>
    </select>
  );
}

DateFilter;
