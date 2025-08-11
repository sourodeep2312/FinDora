function Sort({ value, onChange }) {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
      >
        <option value="date_desc">Date (Newest first)</option>
        <option value="date_asc">Date (Oldest first)</option>
        <option value="amount_desc">Amount (High → Low)</option>
        <option value="amount_asc">Amount (Low → High)</option>
        <option value="type">Type (Income/Expense)</option>
        <option value="category">Category / Purpose</option>
        <option value="source">Source (A–Z)</option>
        <option value="recently_edited">Recently Edited</option>
      </select>
    </div>
  );
}

export default Sort;
