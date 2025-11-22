import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { PrivateRoute } from "./PrivateRoute";
import { RoleRoute } from "./RoleRoute";

const Login = lazy(() => import("../pages/login"));
const HomeLayout = lazy(() => import("../pages/home"));
const Inicio = lazy(() => import("../pages/home/Inicio"));
const Funcionarios = lazy(() => import("../pages/home/funcionarios"));
const Aeronaves = lazy(() => import("../pages/home/aeronaves"));
const DetalheAeronaveLayout = lazy(() => import("../pages/home/aeronaves/DetalheAeronave"));
const DetalheAeronave = lazy(() => import("../pages/home/aeronaves/DetalheAeronave/Inicio"));
const Peca = lazy(() => import("../pages/home/aeronaves/DetalheAeronave/Peca"));
const Etapa = lazy(() => import("../pages/home/aeronaves/DetalheAeronave/Etapa"));

export const AppRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <PrivateRoute></PrivateRoute>,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        children: [
          { index: true, element: <Inicio /> },
          { path: "aeronaves", element: <Aeronaves /> },
          {
            path: "aeronaves/:id",
            element: <DetalheAeronaveLayout />,
            children: [
              { index: true, element: <DetalheAeronave />},
              { path: "etapa/:etapaId", element: <Etapa /> },
              { path: "peca/:pecaId", element: <Peca /> },
            ],
          },
          {
            element: <RoleRoute allowedRoles={[1]} />,
            children: [
              { path: "funcionarios", element: <Funcionarios /> },
            ],
          },
          { path: "*", element: <Navigate to="/" replace/>},
        ],
      },
    ],
  },
]);
