import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { UserDataModel, CategoryModel } from "../models/data"

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


        const usersData = await UserDataModel.find().populate('userId', 'username');
        const userData = await UserDataModel.findOne({ userId: authenticatedUserId }).lean();
        const globalData = await CategoryModel.find().lean().select('-_id -__v');

        if (!userData) {
            throw createHttpError(404, "User data not found");
        }

        const resData = formatData(userData, usersData, globalData);
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




        await CategoryModel.findOneAndUpdate({}, { $inc: { [updatedField]: 1 } }).exec()//updatea global_Data

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

//definirat inteface/type za podatke
function formatData(userData: any, users_Data: any, global_Data: any) {

    let bCategory: string | null = null;
    let bNumber = -Infinity;

    for (const category in userData.bestCategory) {//best category sadrzi zbroj bodova po kategoriji
        const bValue: number = userData.bestCategory[category];
        const fValue: number = userData.favouriteCategory[category];

        const categoryValue: number = fValue / bValue; //broj odigrane kategorije/broj bodova te kategorije

        if (categoryValue > bNumber && categoryValue != Infinity) {
            bNumber = categoryValue;
            bCategory = category;
        }
    }


    let fCategory: string | null = null;
    let fNumber = -Infinity;

    for (const category in userData.favouriteCategory) {
        const categoryValue: number = userData.favouriteCategory[category]; // Type assertion

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

    const newData = {
        gamesPlayed: userData.gamesPlayed,
        bestCategory: bCategory,
        favouriteCategory: fCategory,
        averageScore: userData.averageScore,
        totalScore: userData.totalScore,
    }

    const usersData = users_Data.map((el: any) => {
        const obj = {
            username: el.userId.username,
            score: el.totalScore
        }
        return obj
    }).sort((a: any, b: any) => b.score - a.score)


    const returnVariable = { userData: newData, topCategories: global_Data, usersScores: usersData }
    return returnVariable
}