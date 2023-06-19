import { Navigate, Outlet } from 'react-router-dom'
import { User } from "../models/user"

interface ProtectedRouteProps {
    loggedInUser: User | null,
}

function ProtectedRoute({ loggedInUser }: ProtectedRouteProps) {

    console.log("Protected route")
    console.log(loggedInUser)
    return (
        loggedInUser ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoute