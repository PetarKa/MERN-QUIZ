import "dotenv/config";
import express, { Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import userRoute from "./routes/usersRoute";
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
        maxAge: 5 * 60 * 1000,//5 minuti
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    })
}))

app.use("/api/users", userRoute)


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