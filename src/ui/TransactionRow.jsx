import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { format } from "date-fns";
import { TableHead } from "./IncomeTable";

function TransactionRow({
  item,
  openMenuId,
  position,
  handleMenu,
  setEditItem,
  deleteTransactionById,
  isLoading,
  isEditing,
}) {
  const { id: itemId } = item;

  return (
    <>
      <tr>
        <TableHead>
          {item.date ? format(new Date(item.date), "dd/MM/yyyy") : ""}
        </TableHead>
        <TableHead
          className={` ${
            item.type === "income" ? "text-emerald-700" : "text-rose-500"
          }`}
        >
          {item.type === "income" ? `+${item.amount}` : `-${item.amount}`}
        </TableHead>
        <TableHead>{item.purpose || "-"}</TableHead>
        <TableHead>{item.source || "-"}</TableHead>
        <TableHead
          className={`hidden md:table-cell
                  ${
                    item.type === "income"
                      ? "text-emerald-700"
                      : "text-rose-500"
                  }`}
        >
          {`${item.type === "income" ? "debit" : "credit"}`}
        </TableHead>
        <TableHead className="hidden md:table-cell">
          {item.note || "-"}
        </TableHead>
        <TableHead>
          <button
            className="hover:bg-stone-200 p-1 rounded-lg transition "
            onClick={(e) => handleMenu(itemId, e)}
          >
            <EllipsisVerticalIcon className="h-5 w-5 text-center" />
          </button>

          {openMenuId === item.id && (
            <ul
              className="dropdown-menu absolute right-0 mt-2 w-12 bg-white shadow-md rounded-md z-50"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                top: position.y,
                left: position.x,
              }}
            >
              <li>
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  // onClick={}
                  onClick={() => {
                    console.log("Editing item:", item);
                    setEditItem(item);
                  }}
                  disabled={isLoading || isEditing}
                >
                  <PencilSquareIcon className="h-5 w-5 " />
                </button>
              </li>
              <li>
                {" "}
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  disabled={isLoading}
                  onClick={() => {
                    console.log("Delete clicked, ID:", item.id);
                    deleteTransactionById(item.id);
                  }}
                >
                  <TrashIcon className="h-5 w-5 " />
                </button>
              </li>
            </ul>
          )}
        </TableHead>
      </tr>
    </>
  );
}

export default TransactionRow;
