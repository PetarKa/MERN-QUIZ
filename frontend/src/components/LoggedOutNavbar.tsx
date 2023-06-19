import React from 'react'

interface IHeader {
    isLogin: boolean,
    setisLogin: (value: boolean) => void,
}

function LoggedOutNavbar({ isLogin, setisLogin }: IHeader) {
    return (
        <button className='p-6' onClick={() => setisLogin(!isLogin)}>{isLogin ? 'Login' : 'Register'}</button>
    )
}

export default LoggedOutNavbar