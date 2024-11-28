import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextInterface";

export const PrivateRoute = () => {

    //get context auth
    const { isAutenticated } = useAuthContext();


   
    //TODO
    //autentication logic
  
    if (isAutenticated()) {
        return <Outlet />;
    }else{
        return <Navigate to="/" />
    }
    
}