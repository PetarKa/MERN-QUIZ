import express from "express";
import * as DataController from "../controllers/data"

const router = express.Router();

//router.get("/")//gets user data for display

router.post("/send", DataController.createData)//updatea podatke nakon odigranog kviza

export default router;
