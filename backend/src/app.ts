import "dotenv/config";
import express, { Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import userRoute from "./routes/usersRoute";
import dataRoute from "./routes/dataRoute"
import { requiresAuth } from "./middleware/auth";
import session from "express-session";
import env from "./util/validateEnv"
import MongoStore from "connect-mongo";

const app = express();

app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 15 * 60 * 1000,//15 minuti
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    })
}))

app.use("/api/users", userRoute)

app.use("/api/userdata", requiresAuth, dataRoute)

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
})

app.use((error: unknown, req: Request, res: Response) => {
    console.log(error);
    let errorMessage = "An unknown error occured";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage })
})


export default app;