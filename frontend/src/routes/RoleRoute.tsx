import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";

interface RoleRouteProps {
  allowedRoles: number[];
}

export function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen/>;

  if (!user) return <Navigate to="/login" replace />;

  return allowedRoles.includes(user.cargo)
    ? <Outlet />
    : <Navigate to="/" replace />
}
