import { Router } from "express";
import { getAllfriends, login, register } from "./user.controller";
const userRouter = Router();
userRouter.get("/get-all-friends", getAllfriends);
userRouter.post("/register", register);
userRouter.post("/login", login);
export default userRouter;
