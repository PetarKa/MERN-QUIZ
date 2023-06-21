import { InferSchemaType, Schema, model } from "mongoose";

const dataSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, require: true, unique: true },
    gamesPlayed: { type: Number },
    bestCategory: {
        arts_and_literature: { type: Number },
        film_and_tv: { type: Number },
        food_and_drink: { type: Number },
        general_knowledge: { type: Number },
        geography: { type: Number },
        history: { type: Number },
        music: { type: Number },
        science: { type: Number },
        society_and_culture: { type: Number },
        sport_and_leisure: { type: Number },
    },
    favouriteCategory: {
        arts_and_literature: { type: Number },
        film_and_tv: { type: Number },
        food_and_drink: { type: Number },
        general_knowledge: { type: Number },
        geography: { type: Number },
        history: { type: Number },
        music: { type: Number },
        science: { type: Number },
        society_and_culture: { type: Number },
        sport_and_leisure: { type: Number },
    },
    averageScore: { type: Number },
    totalScore: { type: Number },
});

type Data = InferSchemaType<typeof dataSchema>;

export default model<Data>("user_data", dataSchema);

