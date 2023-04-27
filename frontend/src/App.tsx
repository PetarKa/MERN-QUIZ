import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Category from './Category/Category';
import Quiz from './Quiz/Quiz';
import LoginPage from './Login/LoginPage';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Header from './components/Header';
import { useState } from "react";

function App() {

    const [isLogin, setIsLogin] = useState(false);

    return (
        <Router >
            <Header isLogin={isLogin} setisLogin={setIsLogin} />
            <Routes >
                <Route path="/" element={<LoginPage isLogin={isLogin} setisLogin={setIsLogin} />} />
                <Route path="/Category" element={<Category />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profilename" element={<Profile />} />

            </Routes >
        </Router>
    )
}

export default App