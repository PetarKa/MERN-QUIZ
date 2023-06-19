import { useLocation } from 'react-router-dom';
import logo from '../logo.webp';
import { User } from "../models/user";
import LoggedInNavbar from './LoggedInNavbar';

interface IHeader {
    user: User | null,
    setLoggedInUser: (value: User | null) => void;
}


function Header({ user, setLoggedInUser }: IHeader) {

    const location = useLocation();

    if (user && location.pathname !== "/login") {
        return (
            <nav className='flex flex-row justify-between '>
                <img className="w-16 h-16" src={logo} alt='logo'></img>
                <LoggedInNavbar setLoggedInUser={setLoggedInUser} />
            </nav>
        )
    } else {
        return (<></>)
    }
}

export default Header