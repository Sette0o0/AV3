import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { AppRoutes } from "./routes/AppRoutes";

export default function App() {
  return (
    <Suspense>
      <RouterProvider router={AppRoutes} />
    </Suspense>
  );
}
