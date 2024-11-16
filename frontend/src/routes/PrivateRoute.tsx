import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextInterface";

export const PrivateRoute = () => {

    //get context auth
    const { isAutenticated } = useAuthContext();

    useEffect(() => {
        console.log("Auth component mounted");
    }, []);
    //TODO
    //autentication logic
  
    if (isAutenticated()) {
        return <Outlet />;
    }else{
        return <Navigate to="/" />
    }
    
}