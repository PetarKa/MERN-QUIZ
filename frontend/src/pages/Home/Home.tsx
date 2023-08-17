import { useEffect, useState } from "react";
import { IDATA } from "../../models/data";
import * as networkAPI from "../../network/apis";
import { UnauthorizedError } from '../../errors/http_errors';
import { useNavigate } from "react-router-dom";
import { User } from "../../models/user"

interface IUser {
    loggedInUser: User | null
}

function Home({ loggedInUser }: IUser) {
    let navigate = useNavigate();

    const [DATA, setDATA] = useState<IDATA | null>(null)

    useEffect(() => {
        async function getData() {
            try {
                const data = await networkAPI.getData();
                setDATA(data)
            } catch (error) {
                if (error instanceof UnauthorizedError) {
                    navigate("/login")
                }
                console.error(error);
            }
        }
        getData();

    }, [])

    if (!DATA) {
        return (<div></div>)
    }

    const { userData, topCategories, usersScores } = DATA || {};

    return (<>
        {
            <div className="flex flex-col lg:max-w-screen-lg md:max-w-screen-md mx-auto text-xl ">

                <div className="flex space-x-4">
                    <div className="flex flex-col rounded-lg bg-sky-500 w-2/5 pl-4 pr-4 pt-4 h-auto">
                        <h1 className="mb-10">Your Stats {loggedInUser?.username}</h1>
                        <div className="flex flex-col flex-grow justify-between md:py-5">
                            <p className="pb-2 flex justify-between"><span>Score:</span> <span>{userData.totalScore}</span></p>
                            <p className="pb-2 flex justify-between"><span>Games played:</span> <span>{userData.gamesPlayed}</span></p>
                            <p className="pb-2 flex justify-between"><span>Best category:</span> <span>{userData.bestCategory}</span></p>
                            <p className="pb-2 flex justify-between"><span>Favourite category:</span> <span>{userData.favouriteCategory}</span></p>
                            <p className="pb-2 flex justify-between"><span>Average score per quiz:</span> <span>{userData.averageScore}</span></p>
                        </div>
                    </div>

                    <div className="flex-col grow rounded-lg bg-sky-500 pl-4 pt-4 w-2/5">
                        <h1 className="mb-10 ">Most played quizes</h1>
                        {<ul className="flex flex-col md:flex-row md:flex-wrap">
                            {Object.keys(topCategories[0]).map((key: any) => <li key={key} className="md:w-1/2 p-1 self-center">{key}: {topCategories[0][key as keyof typeof topCategories[0]]}</li>)}
                        </ul>}
                    </div>
                </div>


                <div className="flex-col mt-16 rounded-lg bg-sky-500">
                    <h1 className=" pl-5 pb-10">Leaderboard</h1>
                    <div className="overflow-y-auto h-48">
                        {usersScores.map(el => (
                            <div key={el.username} className="flex justify-between my-3">
                                <div className="pl-10">{el.username}</div>
                                <div className="pr-10">{el.score}</div>
                            </div>)
                        )}
                    </div>
                </div>
            </div>
        }
    </>
    )
}

export default Home