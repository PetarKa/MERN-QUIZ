import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import logo from '../logo.webp'


interface ICategories {
    [key: string]: string;
}


function Category() {
    let navigate = useNavigate();
    useEffect(() => {
        fetchCategories();
    }, [])

    const [Categories, setCategories] = useState<any | null>([]);
    async function fetchCategories() {
        let response = await fetch("https://the-trivia-api.com/api/categories")
        if (response.status === 200) {
            let data = await response.json();

            let values = SortAndCleanArray(Object.values(data))
            let keys = Object.keys(data);
            let category: ICategories = {}
            console.log(category)
            keys.forEach((key, i) => category[key] = values[i])

            setCategories(category)
        } else {
            alert("Can't get categories\nError:" + response.status)
        }
    }

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



    function renderQuiz(key: any) {
        navigate("/quiz", { state: key })
    }

    return (
        <div className="flex flex-col mt-16">


            <div className='flex flex-col self-center'>
                <h2 className="self-center">Choose category</h2>
                <div className="grid grid-cols-5 gap-4">
                    {Object.keys(Categories).map(((name: any) => {
                        return (<button onClick={(event) => renderQuiz(Categories[name])} key={Categories[name]} className='border-2 w-20 self-center mt-5 rounded-lg h-20 w-24 bg-sky-500 border-sky-900 transition duration-500 hover:scale-125'>{name}</button>)
                    }))}
                </div>

            </div>


        </div>
    )
}

export default Category