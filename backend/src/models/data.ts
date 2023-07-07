import { InferSchemaType, Schema, model } from "mongoose";


const categorySchema = new Schema({
    "Art & literature": { type: Number, required: true },
    "Film & TV": { type: Number, required: true },
    "Food & Drink": { type: Number, required: true },
    "General Knowledge": { type: Number, required: true },
    "Geography": { type: Number, required: true },
    "History": { type: Number, required: true },
    "Music": { type: Number, required: true },
    "Science": { type: Number, required: true },
    "Society & Culture": { type: Number, required: true },
    "Sport & Leisure": { type: Number, required: true },

})

const dataSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, unique: true, ref: "User" },
    gamesPlayed: { type: Number, required: true },
    bestCategory: { type: categorySchema, required: true },
    favouriteCategory: { type: categorySchema, required: true },
    averageScore: { type: Number, required: true },
    totalScore: { type: Number, required: true },
});

type UserData = InferSchemaType<typeof dataSchema>;
type Category = InferSchemaType<typeof categorySchema>;

export const UserDataModel = model<UserData>("user_data", dataSchema);
export const CategoryModel = model<Category>("global_data", categorySchema);

