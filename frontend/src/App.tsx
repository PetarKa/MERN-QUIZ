import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from './components/Header';
import { User } from "./models/user";
import * as networkAPI from "./network/apis";
import Category from './pages/Category/Category';
import Home from './pages/Home/Home';
import LoginPage from './pages/Login/LoginPage';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from "./pages/ProtectedRoute";
import Quiz from './pages/Quiz/Quiz';

function App() {

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);


    useEffect(() => {//dodat isLoading?<Loading>: Route
        async function fetchLoggedInUser() {
            try {
                const user = await networkAPI.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
            }
        }
        fetchLoggedInUser();
    }, []);


    console.log("App.tsx")
    console.log(loggedInUser)


    return (
        <Router >
            <Header user={loggedInUser} setLoggedInUser={setLoggedInUser} />
            <Routes >
                <Route path="/login" element={<LoginPage loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
                <Route element={<ProtectedRoute loggedInUser={loggedInUser} />}>

                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/profilename" element={<Profile />} />
                </Route>
            </Routes >
        </Router>
    )
}

export default App