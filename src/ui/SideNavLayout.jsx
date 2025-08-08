import { useState } from "react";
import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import SideNav from "./SideNav";
import { Bars3Icon } from "@heroicons/react/24/solid";

function SideNavLayout() {
  const [open, setOpen] = useState(false);
  //const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col flex-1 bg-stone-100 text-zinc-800">
      {/* Top Navbar */}
      <header className="flex justify-between items-center px-10 py-2 shadow-md bg-zinc-800 text-white h-20">
        <div className="flex flex-row ">
          <button
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            className="circle cursor-pointer"
          >
            {open ? (
              <Bars3Icon className="w-16 h-16 my-auto transition-transform " />
            ) : (
              <Logo />
            )}
          </button>
          <p className="text-4xl font-sans my-auto text-amber-500">
            <span>Fin</span>
            <span className="text-stone-200">Dora</span>
          </p>
        </div>

        {/*  <img
          src="/profile pic.png"
          alt="profile pic"
          className="h-16 w-16 circle"
        /> */}
      </header>

      {/* SideNav + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {open && (
          <aside
            className={`flex flex-col justify-between w-64 bg-zinc-800 border-t border-zinc-700 transform transition-transform duration-700 ease-in-out ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex flex-col justify-between min-h-full flex-grow">
              <SideNav />
            </div>
          </aside>
        )}

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SideNavLayout;
