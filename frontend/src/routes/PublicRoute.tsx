import { Outlet } from "react-router-dom"
import { Menu } from "../components/menu/Menu"
import { useDevice } from "../context/DeviceContext"

export const PublicRoute = () => {
    const {isMobile} = useDevice()
    return (
        <div className={`flex ${isMobile?'flex-col':'flex-row'} min-h-0 grow`} >
            <Menu />
            <div style={{ overflowY: 'scroll' }}>
                <Outlet />
            </div>
        </div>
    )
}