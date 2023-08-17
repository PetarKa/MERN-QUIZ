import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../logo.webp';
import { User } from "../models/user";
import * as networkAPI from "../network/apis";

interface IHeader {
    user: User | null,
    setLoggedInUser: (value: User | null) => void;
}


function Header({ user, setLoggedInUser }: IHeader) {
    let navigate = useNavigate();

    const location = useLocation();

    async function Logout() {
        try {
            await networkAPI.logout();
            navigate("/login")
            setLoggedInUser(null)
        } catch (error) {
            alert("Something went wrong.")
        }
    }

    if (user && location.pathname !== "/login") {
        return (
            <nav className='flex flex-row justify-between '>
                <img className="w-16 h-16" src={logo} alt='logo'></img>
                <nav className='pt-5'>
                    <Link to="/home" className='px-10 '>Home</Link>
                    <Link to="/category" className='px-10 '>Quiz</Link>
                </nav>
                <button className='p-6' onClick={Logout}>Logout</button>
            </nav>
        )
    } else {
        return (<></>)
    }
}

export default Header