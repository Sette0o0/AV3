import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";
import type { NivelPermissao } from "../utils/enums";

interface RoleRouteProps {
  allowedRoles: NivelPermissao[];
}

export function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen/>;

  if (!user) return <Navigate to="/login" replace />;

  return allowedRoles.includes(user.nivel_permissao)
    ? <Outlet />
    : <Navigate to="/" replace />
}
