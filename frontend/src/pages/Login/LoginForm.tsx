import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { User } from '../../models/user';
import * as networkAPI from "../../network/apis";
import { LoginCredentials } from '../../network/apis';

interface ILogin {
    setLoggedInUser: (value: User | null) => void;
}

function LoginForm({ setLoggedInUser }: ILogin) {
    let navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>();

    async function onSubmit(credidentials: LoginCredentials) {
        const result = await networkAPI.login(credidentials);
        console.log(result)
        setLoggedInUser(result)
        navigate("/home")

        console.log(result)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col basis-1/2 self-center justify-start mt-40">

            <label>Username</label>
            <input {...register('username', { required: true })} className='border-2' />
            {errors.username && <span>This field is required</span>}

            <label className='mt-7'>Password</label>
            <input {...register('password', { required: true })} className='border-2' />
            {errors.password && <span>This field is required</span>}
            <button type="submit" className='mt-7'>Submit</button>
        </form>
    )
}

export default LoginForm