import React, { createContext, useState, useMemo, useContext } from "react";

// 1. Create context
const TransactionContext = createContext();

// 2. Define provider component correctly with function keyword or arrow function
export function TransactionProvider({ children, income }) {
  // 3. useState hooks must be called inside component body (not outside or missing)
  const [filterValue, setFilterValue] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortValue, setSortValue] = useState("date_desc"); // default to a valid sort
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // 4. totalItems should count filtered+sorted items, not raw income length
  // So compute totalItems after filtering & sorting inside useMemo below

  // 5. useMemo for filtered, sorted, paginated data
  const paginatedTransaction = useMemo(() => {
    if (!Array.isArray(income) || income.length === 0) return [];

    const now = new Date();
    const getDateRange = (filtered) => {
      switch (filtered) {
        case "last_7_days":
          return [new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), now];
        case "last_30_days":
          return [new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), now];
        case "this_month":
          return [new Date(now.getFullYear(), now.getMonth(), 1), now];
        case "last_month": {
          const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const end = new Date(now.getFullYear(), now.getMonth(), 0);
          return [start, end];
        }
        case "this_year":
          return [new Date(now.getFullYear(), 0, 1), now];
        default:
          return [null, null];
      }
    };
    const [startDate, endDate] = getDateRange(dateFilter);

    // Filter
    let filtered = income.filter((item) => {
      if (filterValue === "income" && item.type !== "income") return false;
      if (filterValue === "expense" && item.type !== "expense") return false;

      if (startDate && endDate) {
        const itemDate = new Date(item.date);
        if (isNaN(itemDate)) return false;
        if (itemDate < startDate || itemDate > endDate) return false;
      }

      return true;
    });

    // Sort
    const sorted = filtered.slice().sort((a, b) => {
      switch (sortValue) {
        case "date_desc": {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (isNaN(dateA) || isNaN(dateB)) return 0;
          return dateB - dateA;
        }
        case "date_asc": {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (isNaN(dateA) || isNaN(dateB)) return 0;
          return dateA - dateB;
        }
        case "amount_desc":
          return (b.amount || 0) - (a.amount || 0);
        case "amount_asc":
          return (a.amount || 0) - (b.amount || 0);
        case "type":
          return (a.type || "").localeCompare(b.type || "");
        case "category":
          return (a.category || "").localeCompare(b.category || "");
        case "source":
          return (a.source || "").localeCompare(b.source || "");
        case "recently_edited": {
          const editedA = new Date(a.editedAt || 0);
          const editedB = new Date(b.editedAt || 0);
          return editedB - editedA;
        }
        default:
          return 0;
      }
    });

    // Pagination slice
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sorted.slice(startIndex, endIndex);
  }, [income, filterValue, dateFilter, sortValue, currentPage, itemsPerPage]);

  // totalItems needs to be the length of filtered+sorted data without pagination
  // Let's compute totalFilteredCount similarly to paginatedTransaction but without slicing
  const totalFilteredCount = useMemo(() => {
    if (!Array.isArray(income) || income.length === 0) return 0;

    const now = new Date();
    const getDateRange = (filtered) => {
      switch (filtered) {
        case "last_7_days":
          return [new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), now];
        case "last_30_days":
          return [new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), now];
        case "this_month":
          return [new Date(now.getFullYear(), now.getMonth(), 1), now];
        case "last_month": {
          const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const end = new Date(now.getFullYear(), now.getMonth(), 0);
          return [start, end];
        }
        case "this_year":
          return [new Date(now.getFullYear(), 0, 1), now];
        default:
          return [null, null];
      }
    };
    const [startDate, endDate] = getDateRange(dateFilter);

    return income.filter((item) => {
      if (filterValue === "income" && item.type !== "income") return false;
      if (filterValue === "expense" && item.type !== "expense") return false;

      if (startDate && endDate) {
        const itemDate = new Date(item.date);
        if (isNaN(itemDate)) return false;
        if (itemDate < startDate || itemDate > endDate) return false;
      }

      return true;
    }).length;
  }, [income, filterValue, dateFilter]);

  // 6. Provide values in context
  return (
    <TransactionContext.Provider
      value={{
        filterValue,
        setFilterValue,
        dateFilter,
        setDateFilter,
        sortValue,
        setSortValue,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        paginatedTransaction,
        totalItems: totalFilteredCount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

// 7. Hook to use context safely
export function useTransactionContext() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
}
