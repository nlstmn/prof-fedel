import { Navigate, Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export const AuthWrapper = () => {
    const location = useLocation()

    const userLogged = JSON.parse(localStorage.getItem("userLogged"))
    console.log('AuthWrapper 1 ', localStorage.getItem("userLogged"))
    console.log('AuthWrapper 2 ', userLogged)

    return userLogged
        ? <Outlet />
        : <Navigate
            to="/"
            replace
            state={{ from: location }}
        />
}