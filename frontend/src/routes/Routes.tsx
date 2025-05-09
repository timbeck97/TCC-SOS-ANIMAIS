import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { CastrationRequest } from "../pages/castrationRequest/CastrationRequest";
import { PrivateRoute } from "./PrivateRoute";
import { Home } from "../pages/home/Home";
import { PublicRoute } from "./PublicRoute";
import { WaitingList } from "../pages/filaEspera/WaitingList";
import { Castration } from "../pages/castration/Castration";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Configurations } from "../pages/configuration/Configurations";
import { CastrationRequestEdit } from "../pages/castrationRequestEdit/CastrationRequestEdit";
import { Notification } from "../pages/notification/Notification";
import { Status } from "../pages/status/Status";


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
          <Route path="filaEspera" element={<WaitingList />} />
          <Route path="filaEspera/:id" element={<CastrationRequestEdit />} />
          <Route path="castracoes" element={<Castration />} />
          <Route path="castracoes/:id" element={<Castration />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="configuracoes" element={<Configurations />} />
          <Route path="notificacoes" element={<Notification />} />
          <Route path="status" element={<Status />} />
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