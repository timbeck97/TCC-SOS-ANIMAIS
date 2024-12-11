import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextInterface";
import { Menu } from "../components/menu/Menu";

export const PrivateRoute = () => {

    //get context auth
    const { isAutenticated } = useAuthContext();



    //TODO
    //autentication logic

    if (isAutenticated()) {
        return <div className="h-full">
            <Menu />
            <Outlet />
        </div>

    } else {
        return <Navigate to="/" />
    }

}