import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextInterface";
import { Menu } from "../components/menu/Menu";
import { useState } from "react";

export const PrivateRoute = () => {
    //get context auth
    const { isAutenticated, loading } = useAuthContext();

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex items-center  space-x-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce delay-400"></div>
                <span className="ml-4 text-lg font-medium text-gray-600">Carregando...</span>
            </div>
        </div>
    }
    if (isAutenticated()) {
        return <div className="flex flex-col min-h-0 grow">
            <Menu />
            <div className="flex flex-col grow" style={{ overflowY: 'scroll' }}>
                <Outlet />
            </div>
        </div>



    } else {
        return <Navigate to="/" />
    }

}