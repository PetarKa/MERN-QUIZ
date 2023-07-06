import express from "express";
import * as DataController from "../controllers/data"
import * as UserController from "../controllers/users";

const router = express.Router();

router.get("/", UserController.getAuthenticatedUser)

router.post("/signup", UserController.signUp, DataController.createUserData);

router.post("/login", UserController.login)

router.post("/logout", UserController.logout)
export default router;