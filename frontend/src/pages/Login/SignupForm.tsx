import { useForm } from 'react-hook-form';
import * as networkAPI from "../../network/apis";
import { SignUpCredentials } from '../../network/apis';
import { useState } from 'react';
import { ConflictError } from '../../errors/http_errors';

interface ISignupForm {
    setIsLogin: (value: boolean) => void,
}

function SignupForm({ setIsLogin }: ISignupForm) {

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpCredentials>();
    const [errorText, setErrorText] = useState<string | null>(null);

    async function onSubmit(credidentials: SignUpCredentials) {

        try {
            const result = await networkAPI.signUp(credidentials);
            console.log(result)
            setIsLogin(true);
            alert("You have succesfully Signed up! \nPlease Log in.")

            console.log(credidentials)
        } catch (error) {
            if (error instanceof ConflictError) {
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

            <label className='mt-7'>Email</label>
            <input type='email'{...register('email', { required: true })} className='border-2' />
            {errors.email && <span>This field is required</span>}

            <label className='mt-7'>Password</label>
            <input {...register('password', { required: true })} className='border-2' />
            {errors.password && <span>This field is required</span>}

            <button type="submit" className='mt-7'>Signup</button>
        </form>
    )
}

export default SignupForm