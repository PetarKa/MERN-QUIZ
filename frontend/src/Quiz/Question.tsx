import React from 'react'

interface Quiz {
    quiz: {
        question: string,
        wrongAnswers: string[],
        correctAnswer: string
    };
    nextQuestion: (point: number) => void
}

function Question({ quiz, nextQuestion }: Quiz) {//prima objekt tipa quiz[0] koji sadrzi naslov tocno pitanje i kriva pitanja

    function Answers(currentQuestion: any) {//izvlaci odgovore iz objekta npr Quiz[0] i pretvara ih u jsx
        var answers = currentQuestion.wrongAnswers.map((answer: string) => <button className='border-2 border-black w-max self-center p-2' value={0} onClick={e => checkAnswer(e)}>{answer}</button>);
        answers.push(<button className='border-2 border-black w-max self-center p-2' value={1} onClick={e => checkAnswer(e)}>{quiz.correctAnswer}</button>)
        answers = RandomiseAnswers(answers);
        return answers.map((button: any) => button);
    }

    function RandomiseAnswers(answArray: any) {
        for (let i = answArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answArray[i], answArray[j]] = [answArray[j], answArray[i]];
        }

        return answArray;
    }

    function checkAnswer(e: any) {
        console.log(e.target.style);
        nextQuestion(parseInt(e.target.value));
    }

    return (
        <div className="col-start-2 flex flex-col justify-center px-20">

            <h1 className="self-center justify-center">{quiz.question}</h1>
            <div className='flex flex-col justify-center space-y-4 pt-10'>{Answers(quiz)}</div>
        </div>
    )
}

export default React.memo(Question)