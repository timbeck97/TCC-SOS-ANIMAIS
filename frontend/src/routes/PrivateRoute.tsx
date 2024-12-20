import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextInterface";
import { Menu } from "../components/menu/Menu";

export const PrivateRoute = () => {

    //get context auth
    const { isAutenticated } = useAuthContext();



    //TODO
    //autentication logic

    if (isAutenticated()) {
        return <div className="flex flex-col min-h-0">
            <Menu />
            <div style={{overflowY:'scroll'}}>
                <Outlet/>
            </div>
        </div>
        
        

    } else {
        return <Navigate to="/" />
    }

}