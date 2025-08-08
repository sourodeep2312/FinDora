import {
  EllipsisVerticalIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { format } from "date-fns";
import { useEffect, useState } from "react";

function IncomeTable({ income, error }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [position, setPosition] = useState(null);

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

  if (error) return <p className="text-red-600">Error loading data.</p>;
  function handleMenu(id, e) {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left - 10,
      y: rect.top + 25 + window.scrollY,
    });
    setOpenMenuId((openId) => (openId === id ? null : id));
  }

  return (
    <div className=" shadow-md rounded-lg mt-4">
      <table className="min-w-full border border-gray-700 text-left rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border  border-gray-300 px-4 py-2 text-center text-xl">
              Date
            </th>
            <th className="border  border-gray-300 px-4 py-2 w-32 text-center text-xl">
              Amount
            </th>
            <th className="border  border-gray-300 px-4 py-2 text-center text-xl ">
              Source
            </th>
            <th className="border  border-gray-300 px-4 py-2  text-center text-xl">
              Purpose
            </th>
            <th className="border  border-gray-300 px-1 py-2 text-center text-xl">
              Type
            </th>
            <th className="border  border-gray-300 px-2 py-2 w-md text-center text-xl">
              Note
            </th>
            <th className="border  border-gray-300 px-4 py-2 text-center text-xl">
              {" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {income?.map((item) => (
            <tr key={item.id}>
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
                  onClick={(e) => handleMenu(item.id, e)}
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
                      <button className="block px-4 py-2 text-sm hover:bg-gray-100">
                        <PencilSquareIcon className="h-5 w-5 " />
                      </button>
                    </li>
                    <li>
                      {" "}
                      <button className="block px-4 py-2 text-sm hover:bg-gray-100">
                        <TrashIcon className="h-5 w-5 " />
                      </button>
                    </li>
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IncomeTable;
