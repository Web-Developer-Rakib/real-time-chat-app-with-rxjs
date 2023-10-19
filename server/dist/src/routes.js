"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_routes_1 = __importDefault(require("./chat/chat.routes"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const routes = [
    {
        route: user_routes_1.default,
        path: "user",
    },
    {
        route: chat_routes_1.default,
        path: "chat",
    },
];
exports.default = routes;
