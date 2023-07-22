import { useEffect, useState } from 'react';
import logo from '../../logo.webp';
import { User } from '../../models/user';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';


interface ILogin {
    loggedInUser: User | null,
    setLoggedInUser: (value: User | null) => void;
}

function LoginPage({ loggedInUser, setLoggedInUser }: ILogin) {
    const [isLogin, setIsLogin] = useState(true);



    useEffect(() => {
        console.log(isLogin)
    }, [isLogin])

    return (
        <div>
            <nav className='flex flex-row justify-between '>
                <img className="w-16 h-16" src={logo} alt='logo'></img>
                <button className='p-6' onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign up' : 'Login'}</button>

            </nav>
            <div className="flex flex-col">

                {isLogin ? <LoginForm setLoggedInUser={setLoggedInUser} /> : <SignupForm setIsLogin={setIsLogin} />}

            </div>
        </div>
    )
}

export default LoginPage