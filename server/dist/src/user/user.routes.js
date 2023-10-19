"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
userRouter.get("/get-all-friends", user_controller_1.getAllfriends);
userRouter.post("/register", user_controller_1.register);
userRouter.post("/login", user_controller_1.login);
exports.default = userRouter;
