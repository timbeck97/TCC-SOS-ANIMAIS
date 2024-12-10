import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { CastrationRequest } from "../pages/castrationRequest/CastrationRequest";
import { PrivateRoute } from "./PrivateRoute";
import { FilaEspera } from "../pages/filaEspera/FIlaEspera";
import { Menu } from "../components/menu/Menu";
import { Home } from "../pages/home/Home";
import { PublicRoute } from "./PublicRoute";


export const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<PublicRoute />} >
          <Route path="" element={<Home />} />
          <Route path="/solicitarCastracao" element={<CastrationRequest />} />
        </Route>

        <Route path="/gerenciar" element={<PrivateRoute />}>
          <Route path="" element={<Navigate to="filaEspera" />} />
          <Route path="filaEspera" element={<FilaEspera />} />
        </Route>
      </Route>

    ),
    {
      future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true
      },
    },

  );
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
}