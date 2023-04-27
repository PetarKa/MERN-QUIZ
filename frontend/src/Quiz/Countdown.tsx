import { useEffect, useState } from 'react'
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


    useEffect(() => { //reset countdown
        if (resetCountDown == true) {
            setTimerClock(clock);
            useresetCountDown(false);
        }
    }, [resetCountDown])


    useEffect(() => {

        if (timerClock < 1) {
            endOfCountDownEffect(0);
            setTimerClock(clock);
        }


        const timer = setTimeout(() => {
            setTimerClock(timerClock - 1);
        }, 1000)

        return () => { // this should work flawlessly besides some milliseconds lost here and there 
            clearTimeout(timer)
        }

    }, [timerClock])

    return (
        <div className='countdown'>Countdown:{timerClock}
            <div className='timer' style={styleWithh}></div>
        </div>
    )
}

export default Countdown