import { Outlet } from "react-router-dom"
import { Menu } from "../components/menu/Menu"

export const PublicRoute = () => {
    return (
        <div>
            <Menu />
            <Outlet />
        </div>
    )
}