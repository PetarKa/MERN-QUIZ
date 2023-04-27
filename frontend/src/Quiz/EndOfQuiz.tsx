import { useNavigate } from 'react-router-dom';

interface IScore {
    score: number;
}

function EndOfQuiz({ score }: IScore) {

    let navigate = useNavigate();

    return (
        <div className="flex flex-col self-center">
            <p>End Of The Quiz</p><br />
            <p>You scored:{score}/5.</p>
            <button className='pt-10 justify-self-center' onClick={() => navigate("/home")}>Return</button>
        </div>
    )
}

export default EndOfQuiz