import { Outlet } from "react-router-dom"
import { useDevice } from "../context/DeviceContext"

const PublicRoute = () => {
    const {isMobile} = useDevice()
    return (
        <div className={`flex ${isMobile?'flex-col':'flex-row'} min-h-0 grow`} >
            <div className="flex flex-col grow overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}
PublicRoute.displayName = 'PublicRoute';
export default PublicRoute