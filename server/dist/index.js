"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const routes_1 = __importDefault(require("./src/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const server = http_1.default.createServer(app);
// Connect to your MongoDB database
mongoose_1.default.connect(`${process.env.MONGO_DB_URI}`);
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello, TypeScript Express Server!");
});
// Websocket connection
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
exports.io = io;
const connectedUsers = {};
io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("userLoggedIn", (username) => {
        connectedUsers[username] = socket;
    });
    function findUserSocketByUsername(username) {
        return connectedUsers[username];
    }
    socket.on("typing", (data) => {
        const targetUserSocket = findUserSocketByUsername(data.receiver);
        if (targetUserSocket) {
            targetUserSocket.emit("typing", data);
        }
    });
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
routes_1.default.map((route) => app.use(`/api/v1/${route.path}`, route.route));
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
