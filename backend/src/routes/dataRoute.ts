import express from "express";
import * as DataController from "../controllers/data"

const router = express.Router();

router.get("/", DataController.getData)//gets user data for display

//router.post("/", DataController.createUserData)//kreira podatke pri Signupu

router.patch("/", DataController.updateData)//updatea podatke nakon odigranog kviza

export default router;
