import React, { useState } from 'react'
import logo from './logo.jpeg'

function FrontPage() {

    const [isLogin, setisLogin] = useState(false)
    let email = <></>;
    if (isLogin) {
        email = <label> E-mail:<input className='border-2 m-1 grow' type='text' name='name' /></label>;
    } else {
        email = <></>
    }

    return (
        <div className='flex flex-col h-screen'>

            <nav className='flex flex-row justify-between '>
                <img className="w-16 h-16" src={logo} alt='logo'></img>
                <button className='p-6' onClick={() => setisLogin(!isLogin)}>{isLogin ? 'Register' : 'Login'}</button>
            </nav>

            <form className='flex flex-col basis-1/2 self-center justify-center'>

                {email}
                <label>
                    Username:
                    <input className='border-2 m-1' type='text' name='name' />
                </label>
                <label>
                    Password:
                    <input className='border-2 m-1' type='text' name='name' />
                </label>
                <button className='border-2 w-20 self-center mt-5'>{isLogin ? 'Register' : 'Login'}</button>
            </form>

        </div>
    )
}

export default FrontPage