import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import { NavLink, useNavigate } from "react-router-dom";

import { useSignOut } from "../hooks/useSignOut";
import { useState } from "react";
import toast from "react-hot-toast";

function SideNav() {
  const [localError, setLocalError] = useState();
  const navigate = useNavigate();
  const { mutate: signOut, isPending } = useSignOut({
    onSuccess: () => {
      navigate("/signin");
      toast.success("Sign out successfully");
    },
    onError: (err) => {
      setLocalError(err.message);
      toast.error(localError);
    },
  });
  async function handleSubmit(e) {
    e.preventDefault();
    if (isPending) return;
    signOut();
  }
  return (
    <div className="flex flex-col justify-between flex-grow text-amber-200">
      <ul className="flex flex-col gap-6 ml-6 px-5 py-2 text-left text-xl mt-5 font-bold items-start">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-amber-500 border-l-4 border-amber-500 pl-2 font-bold h-full"
                : "text-amber-200 hover:text-amber-500 pl-2"
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive
                ? "text-amber-500 border-l-4 border-amber-500 pl-2 font-bold"
                : "text-amber-200 hover:text-amber-500 pl-2"
            }
          >
            Transactions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "text-amber-500 border-l-4 border-amber-500 pl-2 font-bold"
                : "text-amber-200 hover:text-amber-500 pl-2"
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>{" "}
      {localError && (
        <p className="text-red-400 text-sm text-center mb-2">{localError}</p>
      )}
      <button
        className="px-6 py-3 flex gap-2 items-center text-left text-base hover:text-amber-400 transition-colors duration-200 mb-10 mx-auto disabled:text-amber-100"
        onClick={handleSubmit}
        disabled={isPending}
      >
        <ArrowRightOnRectangleIcon className="w-6 h-6" />{" "}
        {isPending ? "Sign Out..." : "Sign Out"}
      </button>
    </div>
  );
}

export default SideNav;
