import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { User } from '../../models/user';
import * as networkAPI from "../../network/apis";
import { LoginCredentials } from '../../network/apis';
import { UnauthorizedError } from '../../errors/http_errors';
import { useState } from 'react';

interface ILogin {
    setLoggedInUser: (value: User | null) => void;
}

function LoginForm({ setLoggedInUser }: ILogin) {
    let navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>();
    const [errorText, setErrorText] = useState<string | null>(null);

    async function onSubmit(credidentials: LoginCredentials) {
        try {

            const result = await networkAPI.login(credidentials);
            setLoggedInUser(result)
            navigate("/home")
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col basis-1/2 self-center justify-start mt-40">
            <div className='text-orange-700'>{errorText}</div>
            <label>Username</label>
            <input {...register('username', { required: true })} className='border-2' />
            {errors.username && <span>This field is required</span>}

            <label className='mt-7'>Password</label>
            <input type='password'{...register('password', { required: true })} className='border-2' />
            {errors.password && <span>This field is required</span>}

            <button type="submit" className='mt-7'>Log in</button>
        </form>

    )
}

export default LoginForm