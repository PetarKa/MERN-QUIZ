import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import logo from './logo.jpeg'


interface ILogin {
    isLogin?: boolean,
    setisLogin?: (value: boolean) => void;
}

function LoginPage({ isLogin, setisLogin }: ILogin) {

    let navigate = useNavigate();
    //const [isLogin, setisLogin] = useState(false)
    let email = <></>;
    if (isLogin) {
        email = <label className='pt-7'> E-mail:<br /><input className='border-2 m-1 ml-0 grow' type='text' name='name' /></label>;
    } else {
        email = <></>
    }

    return (
        <div className="flex flex-col">

            {/* <Header isLogin={isLogin} setisLogin={setisLogin} /> */}

            <form className='flex flex-col basis-1/2 self-center justify-start mt-40' onSubmit={() => navigate("/home")}>

                {email}
                <label className='pt-7'>
                    Username:<br />
                    <input className='border-2 m-1 ml-0' type='text' name='name' />
                </label>
                <label className='pt-7'>
                    Password:<br />
                    <input className='border-2 m-1 ml-0' type='text' name='name' />
                </label>

                <input className='border-2 w-20 self-center mt-5 cursor-pointer' type="submit" value={isLogin ? 'Register' : 'Login'} />
            </form>

        </div>
    )
}

export default LoginPage