import { Link } from 'react-router-dom';
import { User } from '../models/user';
import * as networkAPI from "../network/apis";
import { useNavigate } from 'react-router';

interface ILoggedInNavbar {
    setLoggedInUser: (value: User | null) => void;
}

function LoggedInNavbar({ setLoggedInUser }: ILoggedInNavbar) {
    let navigate = useNavigate();


    async function Logout() {
        try {
            await networkAPI.logout();
            navigate("/login")
            setLoggedInUser(null)
        } catch (error) {
            alert("Something went wrong.")
        }
    }


    return (
        <><nav className='pt-5'>
            <Link to="/home" className='px-10 '>Home</Link>
            <Link to="/category" className='px-10 '>Quiz</Link>
        </nav>
            <button className='p-6' onClick={Logout}>Logout</button>
        </>
    )
}

export default LoggedInNavbar