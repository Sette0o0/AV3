import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";

export function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
