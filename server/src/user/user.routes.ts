import { Router } from "express";
const userRouter = Router();
userRouter.get("/all");
userRouter.post("/register");
userRouter.post("/login");
export default userRouter;
