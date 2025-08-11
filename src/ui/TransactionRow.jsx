import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { format } from "date-fns";

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
        <td className="border  border-gray-300 px-4 py-2 text-center text-lg font-semibold">
          {item.date ? format(new Date(item.date), "dd/MM/yyyy") : ""}
        </td>
        <td
          className={`border  border-gray-300 px-4 py-2 text-center text-lg font-semibold    ${
            item.type === "income" ? "text-emerald-700" : "text-rose-500"
          }`}
        >
          {item.type === "income" ? `+${item.amount}` : `-${item.amount}`}
        </td>
        <td className="border  border-gray-300 px-4 py-2 text-center text-lg font-semibold capitalize">
          {item.source || "-"}
        </td>
        <td className="border  border-gray-300 px-4 py-2 text-center text-lg font-semibold capitalize">
          {item.purpose || "-"}
        </td>
        <td
          className={`border  border-gray-300 px-4 py-2 text-center text-lg font-semibold uppercase
                  ${
                    item.type === "income"
                      ? "text-emerald-700"
                      : "text-rose-500"
                  }`}
        >
          {`${item.type === "income" ? "debit" : "credit"}`}
        </td>
        <td className="border  border-gray-300 px-4 py-2 text-center text-lg font-semibold capitalize">
          {item.note || "-"}
        </td>
        <td className="menu-button border  border-gray-300 px-4 py-2 text-center text-lg font-semibold">
          <button
            className="hover:bg-stone-200 p-1 rounded-lg transition"
            onClick={(e) => handleMenu(itemId, e)}
          >
            <EllipsisVerticalIcon className="h-5 w-5 " />
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
        </td>
      </tr>
    </>
  );
}

export default TransactionRow;
