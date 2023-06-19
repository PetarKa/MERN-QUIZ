import React, { useMemo, useState } from 'react'

interface Quiz {
    quiz: {
        question: string,
        wrongAnswers: string[],
        correctAnswer: string
    };
    nextQuestion: (point: number) => void
}

function Question({ quiz, nextQuestion }: Quiz) {//prima objekt tipa quiz[0] koji sadrzi naslov tocno pitanje i kriva pitanja

    const buttonStyle: string = 'border-2 border-black my-5 mx-20 self-center p-2 rounded-md hover:bg-amber-200';
    const buttonStyleCorrect: string = 'border-2 border-black my-5 mx-20 self-center p-2 rounded-md bg-green-500';
    const buttonStyleWrong: string = 'border-2 border-black my-5 mx-20 self-center p-2 rounded-md bg-red-500';


    const memoizedAnswers = useMemo(() => Answers(quiz), [quiz]);

    function Answers(currentQuestion: any) {//izvlaci odgovore iz objekta npr Quiz[0] i pretvara ih u jsx
        console.log("Answers function")
        var answers = currentQuestion.wrongAnswers.map((answer: string) => <button className={buttonStyle} value={0} onClick={e => checkAnswer(e)}>{answer}</button>);
        answers.push(<button className={buttonStyle} value={1} onClick={e => checkAnswer(e)}>{quiz.correctAnswer}</button>)//izdvojen zato sta mu moramo dodati value 1
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
        if (parseInt(e.target.value) == 0) {
            e.target.className = buttonStyleWrong;

        } else {
            e.target.className = buttonStyleCorrect;

        }

        nextQuestion(parseInt(e.target.value));

        setTimeout(() => {
            e.target.className = buttonStyle;
        }, 1000);


    }

    return (
        <div className="flex flex-col justify-center w-full pb">

            <h1 className="self-center justify-center">{quiz.question}</h1>
            <div className='grid grid-cols-2 grid-rows-2 gap-4 px-auto my-5'>{memoizedAnswers}</div>
        </div>
    )
}

export default React.memo(Question)