
function Home() {
    return (
        <div className="flex flex-col px-52 text-xl">
            <div className="flex-col">
                <h1 className="pb-10">Your Stats</h1>
                <p>Games played: 5</p>
                <p>Favourite category: Movies</p>
                <p>Average score per quiz: 5</p>
            </div>

            <div className="flex-col">
                <h1 className="pb-10 pt-16">Leaderboard</h1>
                <p>User4: 51</p>
                <p>User2: 42</p>
                <p>User3: 25</p>
                <p>User1: 19</p>
            </div>

        </div>
    )
}

export default Home