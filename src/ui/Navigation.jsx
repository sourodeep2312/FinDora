import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <ul className="flex justify-end  gap-10 text-lg text-amber-200 font-bold">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-amber-500" : "hover:text-amber-500"
          }
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="transactions"
          className={({ isActive }) =>
            isActive ? "text-amber-500" : "hover:text-amber-500"
          }
        >
          Transaction
        </NavLink>
      </li>
      <li>
        <NavLink
          to="account"
          className={({ isActive }) =>
            isActive ? "text-amber-500" : "hover:text-amber-500"
          }
        >
          Account
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
