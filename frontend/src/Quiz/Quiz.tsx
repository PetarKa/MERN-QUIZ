import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Question from './Question';
import EndOfQuiz from './EndOfQuiz';
import Countdown from './Countdown';

function Quiz() {
    const location = useLocation();//u ovaj hook mozemo staviti state koji je povezan sa url-om stranice

    const [Quiz, setQuiz] = useState<any | null>([{}])
    const [Loading, setLoading] = useState(true)
    const [questionIndex, setquestionIndex] = useState(0);
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState<number>(0);
    const [resetCountdown, setresetCountdown] = useState(false);

    useEffect(() => {
        fetchQuiz();
    }, [])

    function nextQuestion(point: number) {

        setTimeout(() => {
            setScore(score + point);
            setresetCountdown(true);

            if (questionIndex < Quiz.length - 1) {
                setquestionIndex(questionIndex + 1);
            } else {
                setShowResult(true);
            }
        }, 1000);

    }

    async function fetchQuiz() {//dobavlja kviz
        let response = await fetch(`https://the-trivia-api.com/api/questions?categories=${location.state}&limit=5&difficulty=easy`)
        if (response.status === 200) {
            let data = await response.json()
            setQuiz(SortAndCleanQuiz(data));
            setLoading(false)
            console.log(Quiz)
        } else {
            alert(response.status)
        }
    }

    function SortAndCleanQuiz(arr: any) {
        let quiz = []
        for (let i = 0; i < arr.length; i++) {
            let question = {
                question: arr[i].question,
                wrongAnswers: arr[i].incorrectAnswers,
                correctAnswer: arr[i].correctAnswer
            }
            quiz.push(question);
        }
        console.log(quiz);
        return quiz;
    }


    function Render() {
        if (showResult === false) {
            return (
                <div className='flex flex-col justify-center mx-auto mt-20 w-1/2 h-full border-solid border-2 rounded-lg bg-sky-500'>
                    <Countdown endOfCountDownEffect={nextQuestion} resetCountDown={resetCountdown} useresetCountDown={setresetCountdown} />
                    <Question quiz={Quiz[questionIndex]} nextQuestion={nextQuestion} />
                </div>
            )
        } else {
            console.log("END OF QUIZ")
            return <EndOfQuiz score={score} />
        }
        A();
    }


    return (
        <>{Loading ? <h1 className='relative center'>LOADING</h1> : Render()}</>
    )
}

function A() {

}

export default Quiz