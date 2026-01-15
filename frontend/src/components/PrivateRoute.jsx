import useAuth from "@/hooks/useAuth";
import { getLocalToken, getLocalUser } from "@/lib/storage";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const isExist = !!getLocalToken() && !!getLocalUser();

  if (!isAuthenticated && !isExist) return <Navigate to="/" replace />;

  return children;
}
