import { Navigate, Outlet } from 'react-router-dom'
import { User } from "../models/user"

interface ProtectedRouteProps {
    loggedInUser: User | null,
}

function ProtectedRoute({ loggedInUser }: ProtectedRouteProps) {

    if (!loggedInUser) {
        return <Navigate to="/login" />
    }

    return <Outlet />

    // return (
    //     loggedInUser ? <Outlet /> : <Navigate to="/login" />
    // )
}

export default ProtectedRoute