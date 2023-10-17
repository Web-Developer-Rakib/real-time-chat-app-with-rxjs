import bodyParser from "body-parser";
import cors from "cors";
import dotEnv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import routes from "./src/routes";
dotEnv.config();
const app = express();
const port = process.env.PORT || 5000;
// Connect to your MongoDB database
mongoose.connect(`${process.env.MONGO_DB_URI}`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express Server!");
});
routes.map((route) => app.use(`/api/v1/${route.path}`, route.route));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
