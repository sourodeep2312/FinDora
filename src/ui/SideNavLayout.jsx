import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Logo from "./Logo";
import SideNav from "./SideNav";

function SideNavLayout() {
  const { data: user } = useUser();

  const [open, setOpen] = useState(false);
  //const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-zinc-800">
      {/* Top Navbar */}
      <header className="flex  sm:flex-row justify-between items-center px-4 sm:px-10 py-2 shadow-md bg-zinc-800 text-white h-auto sm:h-20 gap-2 absolute w-full ">
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="circle cursor-pointer"
          >
            {open ? (
              <Bars3Icon className="w-12 h-12 my-auto transition-transform" />
            ) : (
              <Logo />
            )}
          </button>
          <p className="text-2xl sm:text-3xl font-sans my-auto text-amber-500">
            <span>Fin</span>
            <span className="text-stone-200">Dora</span>
          </p>
        </div>

        <h1 className="text-lg sm:text-xl font-bold text-amber-500 text-center sm:text-left">
          {user?.full_name
            ? `Hello, ${user.full_name}!!!`
            : "Welcome to FinDora!"}
        </h1>
      </header>

      {/* SideNav + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {open && (
          <aside
            className={`flex flex-col justify-between 
    w-full sm:w-64 mt-16 sm:mt-20
    bg-zinc-800 border-t border-zinc-700 
    transform transition-transform duration-300 ease-in-out
    ${open ? "translate-x-0" : "-translate-x-full"}
  
  `}
          >
            <div className="flex flex-col flex-grow">
              <SideNav closeSidebar={() => setOpen(false)} />
            </div>
          </aside>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto mt-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SideNavLayout;
