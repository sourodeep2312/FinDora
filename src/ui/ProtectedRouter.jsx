import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function ProtectedRouter({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" replace />;
  return children;
}

export default ProtectedRouter;
