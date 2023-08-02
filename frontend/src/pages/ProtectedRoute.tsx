import { Navigate, Outlet } from 'react-router-dom'
import { User } from "../models/user"

interface ProtectedRouteProps {
    loggedInUser: User | null,
}

function ProtectedRoute({ loggedInUser }: ProtectedRouteProps) {

    if (!loggedInUser) {
        alert("Not Authorized.\nPlease log in.")
        return <Navigate to="/login" />
    }

    return <Outlet />
}

export default ProtectedRoute