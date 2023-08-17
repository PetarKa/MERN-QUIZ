import { useEffect, useState } from "react";
import Quiz from "../Quiz/Quiz";

interface ICategories {
    [key: string]: string;
}


function Category() {
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizState, setQuizState] = useState({ url: '', name: '' });

    useEffect(() => {
        async function fetchCategories() {
            try {
                let response = await fetch("https://the-trivia-api.com/api/categories")

                let data = await response.json();
                console.log(data)
                let values = SortAndCleanArray(Object.values(data))
                let keys = Object.keys(data);
                let category: ICategories = {}
                keys.forEach((key, i) => category[key] = values[i])

                setCategories(category)
            } catch (error) {
                console.log(error)
            }
        }

        fetchCategories();
    }, [])

    const [Categories, setCategories] = useState<any | null>([]);


    function SortAndCleanArray(arr: any) {
        let categoryArray = [];
        for (let i = 0; i < arr.length; i++) {//sorting
            arr[i].sort((a: any, b: any) => b.length - a.length)
        }

        for (let i = 0; i < arr.length; i++) {
            categoryArray.push(arr[i][0])
        }
        return categoryArray;
    }


    function renderQuiz(key: string, name: string) {
        setQuizState({
            url: key,
            name: name
        })
        setShowQuiz(true)
    }

    return (<>
        {showQuiz ? <Quiz url={quizState.url} name={quizState.name} /> : <div className="flex flex-col mt-16">

            <div className='flex flex-col self-center'>
                <h2 className="self-center">Choose category</h2>
                <div className="grid grid-cols-5 gap-4">
                    {Object.keys(Categories).map(((name: any) => {
                        return (<button onClick={(event) => renderQuiz(Categories[name], name)} key={Categories[name]} className='border-2 w-20 self-center mt-5 rounded-lg h-20 w-24 bg-sky-500 border-sky-900 transition duration-500 hover:scale-125'>{name}</button>)
                    }))}
                </div>

            </div>

        </div>}
    </>

    )
}

export default Category