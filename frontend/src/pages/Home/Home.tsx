
interface QuizFrequency {
    [key: string]: number;
}

function Home() {

    const playerData = {
        gamesNumber: 0,
        favCategory: "Science",
        avgScore: 3,
        bestCategory: "Movies"
    }

    const leaderboardData = {
        user1: 54,
        user2: 23,
        user3: 17,
        user4: 5
    }

    const quizFreq: QuizFrequency = {
        'Art & Literature': 67,
        'Film & TV': 34,
        'Food & Drink': 33,
        'General Knowledge': 28,
        'Geography': 26,
        'History': 25,
        'Music': 20,
        'Science': 15,
        'Society & Culture': 8,
        'Sport & Leisure': 2
    }

    console.log(quizFreq)

    const quizCategories = [
        'Art & Literature', 'Film & TV', 'Food & Drink', 'General Knowledge', 'Geography', 'History', 'Music', 'Science', 'Society & Culture', 'Sport & Leisure'
    ]

    return (
        <div className="flex flex-col lg:max-w-screen-lg md:max-w-screen-md mx-auto text-xl ">

            <div className="flex space-x-4">
                <div className="flex flex-col rounded-lg bg-sky-500 w-2/5 pl-4 pt-4 h-auto">
                    <h1 className="mb-10">Your Stats</h1>
                    <div className="flex flex-col flex-grow justify-between md:py-5">
                        <p className="pb-2">Games played: 5</p>
                        <p className="pb-2">Best category: Science</p>
                        <p className="pb-2">Favourite category: Movies</p>
                        <p className="pb-2">Average score per quiz: 5</p>
                    </div>
                </div>

                <div className="flex-col grow rounded-lg bg-sky-500 pl-4 pt-4 w-2/5">
                    <h1 className="mb-10 ">Most played quizes</h1>
                    {<ul className="flex flex-col md:flex-row md:flex-wrap">
                        {Object.keys(quizFreq).map(key => <li key={key} className="md:w-1/2 p-1 self-center">{key}: {quizFreq[key]}</li>)}
                        {/* {quizCategories.map((category, index) => (
                            <li key={category} className="md:w-1/2 p-1 self-center">{index + 1}. {category}</li>
                        ))} */}
                    </ul>}
                </div>
            </div>



            <div className="flex-col mt-16 rounded-lg bg-sky-500">
                <h1 className=" pl-5 pb-10">Leaderboard</h1>
                <div className="flex justify-between my-3">
                    <div className="pl-10">User1</div>
                    <div className="pr-10">Score</div>
                </div>
                <div className="flex justify-between my-3">
                    <div className="pl-10">User2</div>
                    <div className="pr-10">Score</div>
                </div>
                <div className="flex justify-between my-3">
                    <div className="pl-10">User3</div>
                    <div className="pr-10">Score</div>
                </div>
                <div className="flex justify-between my-3">
                    <div className="pl-10">User4</div>
                    <div className="pr-10">Score</div>
                </div>
            </div>

        </div>
    )
}

export default Home