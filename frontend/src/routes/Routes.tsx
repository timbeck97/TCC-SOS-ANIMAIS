import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { CastrationRequest } from "../pages/castrationRequest/CastrationRequest";
import { PrivateRoute } from "./PrivateRoute";

const PaginaPrivadaTeste = () => <h1>Pagina privada Teste</h1>;
const PaginaPublica = () => <h1>Pagina publica</h1>;

export const Routes = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
          <Route>
            <Route path="/" element={<PaginaPublica />} />
            <Route path="/solicitarCastracao" element={<CastrationRequest />} />
            <Route path="/gerenciar" element={<PrivateRoute />}>
                <Route path="" element={<PaginaPrivadaTeste />} />
                <Route path="private" element={<PaginaPrivadaTeste />} />
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
      return <RouterProvider router={router} future={{v7_startTransition:true}} />;
}