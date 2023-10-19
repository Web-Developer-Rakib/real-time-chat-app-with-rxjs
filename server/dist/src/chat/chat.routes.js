"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("./chat.controller");
const chatRouter = (0, express_1.Router)();
chatRouter.post("/send", chat_controller_1.sendMessage);
chatRouter.get("/messages/:sender/:receiver", chat_controller_1.getMessages);
exports.default = chatRouter;
