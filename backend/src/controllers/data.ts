import { RequestHandler } from "express";
import createHttpError from "http-errors";
import DataModel from "../models/data"

interface DataBody {
    userId: string,
}

export const createData: RequestHandler<unknown, unknown, DataBody, unknown> = async (req, res, next) => {

    const authenticatedUserId = req.session.userId;

    try {
        const newUserData = await DataModel.create({
            userId: authenticatedUserId,
            gamesPlayed: 0,
            bestCategory: {
                arts_and_literature: 0,
                film_and_tv: 0,
                food_and_drink: 0,
                general_knowledge: 0,
                geography: 0,
                history: 0,
                music: 0,
                science: 0,
                society_and_culture: 0,
                sport_and_leisure: 0,
            },
            favouriteCategory: {
                arts_and_literature: 0,
                film_and_tv: 0,
                food_and_drink: 0,
                general_knowledge: 0,
                geography: 0,
                history: 0,
                music: 0,
                science: 0,
                society_and_culture: 0,
                sport_and_leisure: 0,
            },
            averageScore: 0,
            totalScore: 0,
        })

        res.status(201).json(newUserData);

    } catch (error) {
        next(error)
    }


}