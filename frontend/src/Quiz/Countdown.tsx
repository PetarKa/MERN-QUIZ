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
    const [pausedTimer, setPausedTimer] = useState<boolean>(false)

    const timerCss: CSSProperties = {
        height: '50px',
        background: 'green',
        width: '100%',
        animation: '5s timer infinite linear',
        animationFillMode: 'forwards',
    };


    function ResetBar() {
        //console.log("progressBar.current" + progressBar.current)
        //console.log("progressBar.current.lastChild" + progressBar.current?.lastChild)

        if (progressBar.current && progressBar.current.lastChild) {
            progressBar.current?.removeChild(progressBar.current.lastChild)
        }


        const barDivElement = document.createElement('div')
        barDivElement.classList.add("timer")
        //barDivElement.setAttribute('style',timer)
        progressBar.current?.appendChild(barDivElement)

    }

    useEffect(() => {

        if (resetCountDown == true) {//Reset na odabran odgovor
            //pauziraj tajmer
            //promjeni boju
            //pricekaj sekund
            //vrati boju
            //reset tajmera

            //setPausedTimer(true)

            //setTimeout(() => {
            setTimerClock(TIME);
            useresetCountDown(false);//nakon sta provjerimo da je korisnik kliknuo botun ponocu varijable resetCountDonw vracamo je na pocetnu vrijednost
            //setPausedTimer(false)
            ResetBar();
            //}, 1000);

        }

        if (timerClock == 0) {//Reset na istek vremena
            endOfCountDownEffect(0);
            setTimerClock(TIME);
            ResetBar();
        }


        //TIMER
        //if (pausedTimer == true) {
        const timer = setTimeout(() => {
            setTimerClock(timerClock - 1);
        }, 1000)



        console.log("TIME: " + timerClock)
        return () => { // this should work flawlessly besides some milliseconds lost here and there 
            clearTimeout(timer)
        }
        //}

    }, [timerClock, resetCountDown])

    return (
        <div className='countdown' ref={progressBar}>
            <div className='timer'></div>
        </div>
    )
}

export default Countdown