import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { UserDataModel, CategoryModel } from "../models/data"
import { assertIsDefined } from "../util/assertIsDefined";



export const createUserData: RequestHandler<unknown, unknown, unknown, unknown> = async (req, res, next) => {

    const authenticatedUserId = req.session.userId;

    try {
        const newUserData = await UserDataModel.create({
            userId: authenticatedUserId,
            gamesPlayed: 0,
            bestCategory: {
                "Art & literature": 0,
                "Film & TV": 0,
                "Food & Drink": 0,
                "General Knowledge": 0,
                "Geography": 0,
                "History": 0,
                "Music": 0,
                "Science": 0,
                "Society & Culture": 0,
                "Sport & Leisure": 0,
            },
            favouriteCategory: {
                "Art & literature": 0,
                "Film & TV": 0,
                "Food & Drink": 0,
                "General Knowledge": 0,
                "Geography": 0,
                "History": 0,
                "Music": 0,
                "Science": 0,
                "Society & Culture": 0,
                "Sport & Leisure": 0,
            },
            averageScore: 0,
            totalScore: 0,
        })

        res.status(201).json(newUserData);

    } catch (error) {
        next(error)
    }
}



export const getData: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        const gData = await UserDataModel.find().populate('userId', 'username');//agregacija
        const data = await UserDataModel.findOne({ userId: authenticatedUserId }).lean();// exec zaminit sa lean i onda maknit to json
        if (!data) {
            throw createHttpError(404, "User data not found");
        }

        const resData = formatData(data, gData);
        res.status(200).send(resData);
    } catch (error) {
        next(error);
    }
}



interface UpdateBody {
    category: string,
    points: number
}
export const updateData: RequestHandler<unknown, unknown, UpdateBody, unknown> = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    const updatedField = req.body.category;
    const points = req.body.points;

    try {

        //assertIsDefined(authenticatedUserId);


        await CategoryModel.findOneAndUpdate({}, { $inc: { [updatedField]: 1 } }).exec()//updatea global_Data
        console.log("funkcija")
        const data = await UserDataModel.findOne({ userId: authenticatedUserId }).exec();
        if (!data) {
            throw createHttpError(404, "User data not found");
        }

        data.gamesPlayed++;
        data.bestCategory[updatedField as keyof typeof data.bestCategory] = points;
        data.favouriteCategory[updatedField as keyof typeof data.bestCategory]++;
        data.totalScore += points;
        const avgScore = (data.totalScore / data.gamesPlayed);
        data.averageScore = Math.round(avgScore * 100) / 100;//zaokruzi na 2 decimale
        await data.save();

        res.sendStatus(200);


    } catch (error) {
        next(error)
    }
}

function formatData(data: any, gData: any) {

    let bCategory: string | null = null;
    let bNumber = -Infinity;

    for (const category in data.bestCategory) {//best category sadrzi zbroj bodova po kategoriji
        const bValue: number = data.bestCategory[category];
        const fValue: number = data.favouriteCategory[category];

        const categoryValue: number = fValue / bValue; //broj odigrane kategorije/broj bodova te kategorije

        if (categoryValue > bNumber && categoryValue != Infinity) {
            bNumber = categoryValue;
            bCategory = category;
        }
    }


    let fCategory: string | null = null;
    let fNumber = -Infinity;

    for (const category in data.favouriteCategory) {
        const categoryValue: number = data.favouriteCategory[category]; // Type assertion

        if (categoryValue > fNumber) {
            fNumber = categoryValue;
            fCategory = category;
        }
    }

    if (bCategory == null) {
        bCategory = "No games played"
    }

    if (fNumber == 0) {
        fCategory = "No games played";
    }
    data.bestCategory = bCategory;
    data.favouriteCategory = fCategory;

    data.userId = data.userId.username;

    const globalData = gData.map((el: any) => {
        const obj = {
            username: el.userId.username,
            score: el.totalScore
        }
        return obj
    }).sort((a: any, b: any) => b.score - a.score)

    console.log(globalData)
    return [data, globalData]
}