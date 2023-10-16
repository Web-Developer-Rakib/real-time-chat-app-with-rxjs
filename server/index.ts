import cors from "cors";
import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express Server!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
