import { useEffect, useState, useRef } from 'react'
import "./css/progressBar.css"

interface ICountdown {
    nextQuestion: (point: number) => void
    resetCountDown: boolean,
    useresetCountDown: (value: boolean) => void;
}


function Countdown({ nextQuestion, resetCountDown, useresetCountDown }: ICountdown) {
    const TIME: number = 10;
    const [timerClock, setTimerClock] = useState<number>(TIME)
    const progressBar = useRef<HTMLDivElement>(null);


    function ResetBar() {
        if (progressBar.current && progressBar.current.lastChild) {
            progressBar.current?.removeChild(progressBar.current.lastChild)
        }


        const barDivElement = document.createElement('div')
        barDivElement.classList.add("timer")

        progressBar.current?.appendChild(barDivElement)

    }

    useEffect(() => {

        if (resetCountDown === true) {//Reset na odabran odgovor
            setTimeout(() => {
                setTimerClock(TIME);
                useresetCountDown(false);//nakon sta provjerimo da je korisnik kliknuo botun, pomocu varijable resetCountDonw vracamo je na pocetnu vrijednost
                ResetBar();
            }, 850);

        }

        if (timerClock < 1 && resetCountDown === false) {//Zove funkciju u Quiz koja promijeni vrijednost resetCountDown u true
            nextQuestion(0);
        }

        if (resetCountDown === false) {//ako je resetcountdown true timer ce biti pauziran
            const timer = setTimeout(() => {
                setTimerClock(timerClock - 1);
            }, 1000)


            console.log("TIME: " + timerClock)
            return () => { // this should work flawlessly besides some milliseconds lost here and there 
                clearTimeout(timer)
            }
        }



    }, [timerClock, resetCountDown])

    return (
        <div className='countdown' ref={progressBar}>
            <div className='timer'></div>
        </div>
    )
}

export default Countdown