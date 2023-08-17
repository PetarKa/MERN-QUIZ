import * as networkAPI from "../../network/apis";

interface IScore {
    score: number;
    category: string;
}

function EndOfQuiz({ score, category }: IScore) {

    (async function () {
        try {
            const data = {
                points: score,
                category: category,
            }
            await networkAPI.sendData(data)
        } catch (error) {

        }
    })();

    return (
        <>
            <div className='text-3xl w-fit mx-auto mt-20 p-20 border-solid border-2 rounded-lg bg-sky-500'>You answered {score} out of 5 questions correctly.</div>
            {/* <button className='pt-10' onClick={() => navigate("/home")}>Return</button> */}
        </>
    )
}

export default EndOfQuiz