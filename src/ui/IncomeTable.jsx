import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteTransaction, updateTransaction } from "../services/apiIncome";
import IncomeForm from "./IncomeForm";
import Modal from "./Modal";
import TransactionRow from "./TransactionRow";
import { useTransactionContext } from "../context/TransactionContext";

function IncomeTable() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Adjust as needed
  const { paginatedTransaction, error } = useTransactionContext();

  const [openMenuId, setOpenMenuId] = useState(null);
  const [position, setPosition] = useState(null);
  const [editItem, setEditItem] = useState(null);

  // Delete mutation
  const { mutate: deleteTransactionById, isLoading: isDeleting } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
      toast.success("Transaction deleted successfully");
      setOpenMenuId(null);
    },
    onError: (err) => {
      console.error("Failed to delete transaction:", err);
      toast.error("Failed to delete transaction");
    },
  });

  // Edit mutation
  const { mutate: editTransaction, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, updatedData }) => updateTransaction(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
      toast.success("Transaction updated successfully");
      setEditItem(null);
      setOpenMenuId(null);
      navigate("/transactions"); // Redirect after edit
    },
    onError: (err) => {
      console.error("Failed to update transaction:", err);
      toast.error("Failed to update transaction");
    },
  });

  const handleDelete = (id) => deleteTransactionById(id);

  const handleEdit = (id, updatedData) => {
    editTransaction({ id, updatedData });
  };

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        !e.target.closest(".menu-button") &&
        !e.target.closest(".dropdown-menu")
      ) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenu = (id, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left - 10,
      y: rect.top + 25 + window.scrollY,
    });
    setOpenMenuId((openId) => (openId === id ? null : id));
  };

  if (error) return;
  <p className="text-red-600">Error loading data.</p>;
  console.log("editItem in IncomeTable:", editItem);
  return (
    <div className="shadow-md rounded-lg mt-4 overflow-x-auto">
      {editItem && (
        <Modal isOpen={true} onClose={() => setEditItem(null)}>
          <IncomeForm
            mode="edit"
            transaction={editItem}
            onSubmit={(updatedData) => handleEdit(editItem.id, updatedData)}
            isLoading={isEditing}
            onClose={() => setEditItem(null)}
          />
        </Modal>
      )}

      <table className="min-w-full border border-gray-700 text-left rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>Source</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="hidden md:table-cell">Note</TableHead>
            <TableHead>Action</TableHead>
          </tr>
        </thead>
        <tbody>
          {paginatedTransaction.length > 0 ? (
            paginatedTransaction.map((item) => (
              <TransactionRow
                key={item.id}
                item={item}
                openMenuId={openMenuId}
                position={position}
                setOpenMenuId={setOpenMenuId}
                handleMenu={handleMenu}
                setEditItem={setEditItem} // <-- Pass setEditItem to open modal
                deleteTransactionById={handleDelete}
                isLoading={isDeleting}
              />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No transactions
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default IncomeTable;
export function TableHead({ children, className = "" }) {
  return (
    <th
      className={`
        border border-gray-300 
        px-2 py-1 text-xs
        sm:px-3 sm:py-2 sm:text-sm 
        md:px-4 md:py-2 md:text-base 
        text-center
        ${className}
      `}
    >
      {children}
    </th>
  );
}
