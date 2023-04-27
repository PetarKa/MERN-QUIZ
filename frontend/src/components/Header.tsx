import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../logo.webp'

interface IHeader {
    isLogin?: boolean,
    setisLogin?: (value: boolean) => void;
}


function Header({ isLogin, setisLogin }: IHeader) {
    let navigate = useNavigate();


    const location = useLocation();
    const [header, setheader] = useState<JSX.Element>()

    let LoginHeader;
    let AppHeader: JSX.Element;


    useEffect(() => {
        console.log(isLogin)
        if (location.pathname === "/") {

            LoginHeader = <nav className='flex flex-row justify-between '>
                <img className="w-16 h-16" src={logo} alt='logo'></img>
                <button className='p-6' onClick={() => changeLogin(isLogin)}>{isLogin ? 'Login' : 'Register'}</button>
            </nav>

            setheader(LoginHeader);
        } else {
            AppHeader = <nav className='flex flex-row justify-between'>
                <img className="w-16 h-16" src={logo} alt='logo'></img>
                <nav className='pt-5'>
                    <Link to="/home" className='px-10 '>Home</Link>
                    <Link to="/profilename" className='px-10 '>Profile</Link>
                    <Link to="/category" className='px-10 '>Quiz</Link>
                </nav>
                <button className='p-6' onClick={() => navigate("/")}>Logout</button>
            </nav>
            setheader(AppHeader)
        }

    }, [isLogin, location.pathname])



    function changeLogin(isLogin: boolean | undefined) {

        if (setisLogin !== undefined && isLogin !== undefined) {
            console.log("ifLogin!=undefined:" + isLogin)
            setisLogin(!isLogin);
        }
    }


    return (
        <>
            {header}
        </>
    )
}



export default Header