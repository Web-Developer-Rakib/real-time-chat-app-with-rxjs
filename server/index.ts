import bodyParser from "body-parser";
import cors from "cors";
import dotEnv from "dotenv";
import express, { Request, Response } from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import routes from "./src/routes";
dotEnv.config();
const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

// Connect to your MongoDB database
mongoose.connect(`${process.env.MONGO_DB_URI}`);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express Server!");
});
// Websocket connection

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const connectedUsers: any = {};
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("userLoggedIn", (username) => {
    connectedUsers[username] = socket;
  });
  function findUserSocketByUsername(username: string) {
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

routes.map((route) => app.use(`/api/v1/${route.path}`, route.route));

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
export { io };
