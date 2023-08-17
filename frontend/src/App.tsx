import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from './components/LoggedInNavbar';
import { User } from "./models/user";
import * as networkAPI from "./network/apis";
import Category from './pages/Category/Category';
import Home from './pages/Home/Home';
import LoginPage from './pages/Login/LoginPage';
import ProtectedRoute from "./pages/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchLoggedInUser() {
            try {
                const result = await networkAPI.getLoggedInUser();
                setLoggedInUser(result);
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        fetchLoggedInUser();
    }, []);


    return (
        <Router >
            <Header user={loggedInUser} setLoggedInUser={setLoggedInUser} />
            {loading ? <div className="relative inset-x-2/4 top-80">Loading</div> :
                <Routes >
                    <Route path="/login" element={<LoginPage setLoggedInUser={setLoggedInUser} />} />
                    <Route element={<ProtectedRoute loggedInUser={loggedInUser} />}>

                        <Route path="/home" element={<Home loggedInUser={loggedInUser} />} />
                        <Route path="/category" element={<Category />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />

                </Routes >}

        </Router>
    )
}

export default App