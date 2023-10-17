import { Router } from "express";
import { getMessages, sendMessage } from "./chat.controller";
const chatRouter = Router();
chatRouter.post("/send", sendMessage);
chatRouter.get("/messages/:sender/:receiver", getMessages);
export default chatRouter;
