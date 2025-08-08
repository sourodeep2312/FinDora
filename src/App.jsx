import { Route, Routes } from "react-router-dom";
import Dashboard from "./features/dashboard/Dashboard";
import Transaction from "./features/transaction/Transaction";

import Account from "./ui/Account";
import NotFound from "./ui/NotFound";
import Settings from "./ui/Settings";
import SignIn from "./ui/SignIn";
import SignUp from "./ui/SignUp";

import SideNavLayout from "./ui/SideNavLayout";
import UserMenuHolder from "./ui/UserMenuHolder";
import ProtectedRouter from "./ui/ProtectedRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="text-center font-semibold text-lg"
      />
      <Routes>
        {/* Layout with nested pages */}

        <Route
          path="/"
          element={
            <ProtectedRouter>
              <SideNavLayout />{" "}
            </ProtectedRouter>
          }
        >
          <Route path="account" element={<Account />} />
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transaction />} />
          <Route path="usermenu" element={<UserMenuHolder />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Standalone pages (not inside AppLayout) */}
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
