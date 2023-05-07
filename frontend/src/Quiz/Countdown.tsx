import { useEffect, useState, useRef, CSSProperties } from 'react'
import "./css/progressBar.css"

interface ICountdown {
    endOfCountDownEffect: (point: number) => void
    resetCountDown: boolean,
    useresetCountDown: (value: boolean) => void;
}


function Countdown({ endOfCountDownEffect, resetCountDown, useresetCountDown }: ICountdown) {
    const TIME: number = 10;
    const styleWithh: any = { width: "100%" }
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

        if (resetCountDown == true) {//Reset na odabran odgovor
            setTimerClock(TIME);
            useresetCountDown(false);//nakon sta provjerimo da je korisnik kliknuo botun ponocu varijable resetCountDonw vracamo je na pocetnu vrijednost
            ResetBar();
        }

        if (timerClock == 0) {//Zove funckioju u Quiz koja promijeni vrijednost resetCountDown u true
            endOfCountDownEffect(0);
        }


        const timer = setTimeout(() => {
            setTimerClock(timerClock - 1);
        }, 1000)


        console.log("TIME: " + timerClock)
        return () => { // this should work flawlessly besides some milliseconds lost here and there 
            clearTimeout(timer)
        }


    }, [timerClock, resetCountDown])

    return (
        <div className='countdown' ref={progressBar}>
            <div className='timer'></div>
        </div>
    )
}

export default Countdown