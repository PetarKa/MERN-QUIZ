

function Profile() {//triba sa gridom postaviti da je u liniji sve
    return (
        <div className='flex flex-col px-52'>
            <div className='flex flex-row'>
                <p className='pr-20'>Username: John Doe</p>
                <button>Change Username</button>
            </div>

            <div className='flex flex-row'>
                <p className='pr-20'>Email: jDoe@mail.com</p>
                <button>Change Email</button>
            </div>

            <button>Change Password</button>
        </div>
    )
}

export default Profile