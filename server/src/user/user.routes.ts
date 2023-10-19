import { Router } from "express";
import {
  getAllfriends,
  getSingleUser,
  login,
  logout,
  register,
} from "./user.controller";
const userRouter = Router();
userRouter.get("/get-all-friends", getAllfriends);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/:username", getSingleUser);
userRouter.put("/logout/:username", logout);

export default userRouter;
