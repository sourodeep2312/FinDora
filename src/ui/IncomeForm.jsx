import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateTransaction } from "../hooks/CreateTransaction";
import { useUpdateTransaction } from "../hooks/UpdateTransaction";
import Button from "./Button";
import SpinnerMini from "./SpinnerMini";
import { format } from "date-fns";
function IncomeForm({ mode = "create", onClose, transaction }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Keep track of the selected type separately for the <select>
  const [selectedType, setSelectedType] = useState("");

  // Form state for all transaction fields
  const [transactionData, setTransactionData] = useState({
    type: "",
    amount: "",
    date: "",
    source: "",
    purpose: "",
    note: "",
  });

  // When editing, fill the form with transaction data
  useEffect(() => {
    if (mode === "edit" && transaction) {
      setSelectedType(transaction.type || "");
      setTransactionData({
        type: transaction.type || "",
        amount: transaction.amount || "",
        date: transaction.date || "",
        source: transaction.source || "",
        purpose: transaction.purpose || "",
        note: transaction.note || "",
      });
    } else if (mode === "create") {
      // Reset form for create mode
      setSelectedType("");
      setTransactionData({
        type: "",
        amount: "",
        date: "",
        source: "",
        purpose: "",
        note: "",
      });
    }
  }, [mode, transaction]);

  // Mutations
  console.log(
    useCreateTransaction({
      onSuccess: () => {},
    })
  );
  const { mutate: createTransaction, isPending: isCreating } =
    useCreateTransaction({
      onSuccess: () => {
        toast.success("Transaction created");
        onClose?.();
        queryClient.invalidateQueries("transactions");
      },
    });

  const { mutate: updateTransaction, isPending: isUpdating } =
    useUpdateTransaction({
      onSuccess: () => {
        toast.success("Transaction updated");
        onClose?.();
        navigate("/transactions");
        queryClient.invalidateQueries("transactions");
      },
    });

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData.entries());

    if (mode === "create") {
      createTransaction(formData);
    } else if (mode === "edit" && transaction?.id) {
      updateTransaction({ id: transaction.id, updatedData: dataObj });
      console.log("Updated data:", transaction.id, dataObj);
    }
  }

  const isLoading = isCreating || isUpdating;
  console.log("isLoading:", isCreating);

  return (
    <div className="flex items-center justify-center">
      <form
        className="flex flex-col text-lg border-zinc-800 rounded-md p-6 w-[28rem]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-center">
          {mode === "create" ? "Enter your transactions" : "Edit Transaction"}
        </h1>

        <FormRow label="Type">
          <select
            required
            name="type"
            disabled={isLoading}
            className="sm:w-40        
    text-lg
     sm:text-base flex-1 border border-zinc-800 rounded-sm px-2 py-1"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setTransactionData({
                ...transactionData,
                type: e.target.value,
                // Reset source and purpose on type change
                source: "",
                purpose: "",
              });
            }}
          >
            <option value="" disabled>
              Select income category
            </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </FormRow>

        <FormRow label="Amount">
          <input
            type="number"
            required
            disabled={isLoading}
            name="amount"
            value={transactionData.amount}
            onChange={(e) =>
              setTransactionData({ ...transactionData, amount: e.target.value })
            }
            className="flex-1 border border-zinc-800 rounded-sm px-2 py-1"
          />
        </FormRow>

        <FormRow label="Date">
          <input
            type="date"
            required
            disabled={isLoading}
            name="date"
            value={
              transactionData.date
                ? format(new Date(transactionData.date), "yyyy-MM-dd")
                : ""
            }
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                date: e.target.value,
              })
            }
            className="flex-1 border border-zinc-800 rounded-sm px-2 py-1"
          />
        </FormRow>

        {selectedType && (
          <FormRow label={selectedType === "income" ? "Source:" : "Purpose:"}>
            <select
              required
              value={
                selectedType === "income"
                  ? transactionData.source
                  : transactionData.purpose
              }
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  [selectedType === "income" ? "source" : "purpose"]:
                    e.target.value,
                })
              }
              name={selectedType === "income" ? "source" : "purpose"}
              className="flex-1 border border-zinc-800 rounded-sm px-2 py-1"
              disabled={isLoading}
            >
              <option value="">
                {selectedType === "income"
                  ? "Select income source"
                  : "Select expense purpose"}
              </option>

              {selectedType === "income" ? (
                <>
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
                </>
              ) : (
                <>
                  <option value="need">Needs</option>
                  <option value="want">Wants</option>
                  <option value="investment">Investment</option>
                </>
              )}
            </select>
          </FormRow>
        )}

        <FormRow label="Note:">
          <textarea
            name="note"
            value={transactionData.note}
            onChange={(e) =>
              setTransactionData({ ...transactionData, note: e.target.value })
            }
            disabled={isLoading}
            className="flex-1 border border-zinc-800 rounded-sm px-3 py-2"
          />
        </FormRow>

        <div className="flex justify-between px-2">
          <Button
            type="reset"
            disabled={isLoading}
            onClick={() => {
              setSelectedType("");
              setTransactionData({
                type: "",
                amount: "",
                date: "",
                source: "",
                purpose: "",
                note: "",
              });
            }}
            className="bg-stone-500/80 px-4 py-2 rounded-lg hover:bg-stone-400/80 transition text-zinc-800"
          >
            Clear
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-emerald-700 px-4 py-2 rounded-lg text-white hover:bg-emerald-500 transition disabled:bg-emerald-200"
          >
            {isLoading ? (
              <SpinnerMini />
            ) : mode === "create" ? (
              "Submit"
            ) : (
              "Edit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

function FormRow({ label, children }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <label className="w-24 px-2 text-xl font-semibold">{label}</label>
      {children}
    </div>
  );
}

export default IncomeForm;
