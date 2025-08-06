import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Logo from "./Logo";

function AppLayout() {
  return (
    <div className=" overflow-auto min-h-screen bg-stone-100 mx-auto flex flex-col text-zinc-800  ">
      <header className="flex justify-between items-center px-10 py-1 shadow-md  bg-zinc-800">
        <Logo />
        <Navigation />
      </header>
      <main className="mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
