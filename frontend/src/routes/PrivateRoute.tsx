import { Navigate, Outlet } from "react-router-dom";
import { Menu } from "../components/menu/Menu";
import { useAuthContext } from "../context/AuthContextInterface";
import { useDevice } from "../context/DeviceContext";


export const PrivateRoute = () => {

    const { isAutenticated, loading } = useAuthContext();
    const {isMobile} = useDevice()


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
    if (!loading && isAutenticated()) {
        return <div className={`flex ${isMobile?'flex-col':'flex-row'} min-h-0 grow`}>
            <Menu />
            <div className="flex flex-col grow overflow-auto">
                <Outlet />
            </div>
        </div>


    } else {
        return <Navigate to="/" />
    }

}