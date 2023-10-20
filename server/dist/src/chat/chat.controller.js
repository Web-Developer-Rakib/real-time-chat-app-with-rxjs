"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTypingStatus = exports.getMessages = exports.sendMessage = void 0;
const __1 = require("../..");
const chat_model_1 = __importDefault(require("./chat.model"));
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sender, receiver, message } = req.body;
        const newChat = new chat_model_1.default({ sender, receiver, message });
        const savedChat = yield newChat.save();
        // Emit the message to connected clients using Socket.io
        __1.io.emit("chat message", savedChat);
        res.json(savedChat);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to send the message." });
    }
});
exports.sendMessage = sendMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sender, receiver } = req.params;
        const messages = yield chat_model_1.default.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender },
            ],
        }).sort({ createdAt: 1 });
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve messages." });
    }
});
exports.getMessages = getMessages;
const checkTypingStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sender, receiver } = req.query;
        __1.io.emit("typing", "Typing");
        res.send("Typing");
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve messages." });
    }
});
exports.checkTypingStatus = checkTypingStatus;
