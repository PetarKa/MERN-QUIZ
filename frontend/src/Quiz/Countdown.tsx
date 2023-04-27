import { useEffect, useState, useRef } from 'react'
import "./css/progressBar.css"

interface ICountdown {
    endOfCountDownEffect: (point: number) => void
    resetCountDown: boolean,
    useresetCountDown: (value: boolean) => void;
}

function Countdown({ endOfCountDownEffect, resetCountDown, useresetCountDown }: ICountdown) {
    const clock: number = 5;
    const styleWithh: any = { width: "100%" }
    const [timerClock, setTimerClock] = useState<number>(clock)


    useEffect(() => {

        if (resetCountDown == true) {//Reset na odabran odgovor
            setTimerClock(clock);
            useresetCountDown(false);
        }

        if (timerClock < 1) {//Reset na istek vremena
            endOfCountDownEffect(0);
            setTimerClock(clock);
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
        <div className='countdown'>Countdown:{timerClock}
            <div className='timer' style={styleWithh}></div>
        </div>
    )
}

export default Countdown