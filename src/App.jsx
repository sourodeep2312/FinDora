import { Route, Routes } from "react-router-dom";
import Dashboard from "./features/dashboard/Dashboard";
import Login from "./features/login/Login";
import Transaction from "./features/transaction/Transaction";

import NotFound from "./ui/NotFound";
import AppLayout from "./ui/AppLayout";
import Account from "./ui/Account";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transaction />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
