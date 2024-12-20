import { Outlet } from "react-router-dom"
import { Menu } from "../components/menu/Menu"

export const PublicRoute = () => {
    return (
        <div className="flex flex-col min-h-0" >
            <Menu />
            <div style={{ overflowY: 'scroll' }}>
                <Outlet />
            </div>
        </div>
    )
}