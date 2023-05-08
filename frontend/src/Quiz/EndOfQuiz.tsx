import { useNavigate } from 'react-router-dom';

interface IScore {
    score: number;
}

function EndOfQuiz({ score }: IScore) {

    let navigate = useNavigate();

    return (
        <>
            <div className='text-3xl w-fit mx-auto mt-20 p-20 border-solid border-2 rounded-lg bg-sky-500'>You answered {score} out of 5 questions correctly.</div>
            {/* <button className='pt-10' onClick={() => navigate("/home")}>Return</button> */}
        </>
    )
}

export default EndOfQuiz