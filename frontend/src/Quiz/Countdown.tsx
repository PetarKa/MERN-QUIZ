import { useEffect, useState, useRef } from 'react'
import "./css/progressBar.css"

interface ICountdown {
    endOfCountDownEffect: (point: number) => void
    resetCountDown: boolean,
    useresetCountDown: (value: boolean) => void;
}

function Countdown({ endOfCountDownEffect, resetCountDown, useresetCountDown }: ICountdown) {
    const TIME: number = 5;
    const styleWithh: any = { width: "100%" }
    const [timerClock, setTimerClock] = useState<number>(TIME)
    const progressBar = useRef<HTMLDivElement>(null);

    function ResetBar() {
        if (progressBar.current && progressBar.current.lastChild) {
            progressBar.current?.removeChild(progressBar.current.lastChild)
        }

        setTimeout(() => {
            const barDivElement = document.createElement('div')
            barDivElement.classList.add("timer")
            progressBar.current?.appendChild(barDivElement)
        }, 0);
    }

    useEffect(() => {

        console.log()
        if (resetCountDown == true) {//Reset na odabran odgovor
            setTimerClock(TIME);
            useresetCountDown(false);
            ResetBar();
        }

        if (timerClock < 1) {//Reset na istek vremena
            endOfCountDownEffect(0);
            setTimerClock(TIME);
            ResetBar();
        }


        //TIMER
        const timer = setTimeout(() => {
            setTimerClock(timerClock - 1);
        }, 1000)

        return () => { // this should work flawlessly besides some milliseconds lost here and there 
            clearTimeout(timer)
        }

    }, [timerClock, resetCountDown])

    return (
        <div className='countdown' ref={progressBar}>Countdown:{timerClock}
            <div className='timer' ></div>
        </div>
    )
}

export default Countdown