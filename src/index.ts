// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import artistRoutes from "./routes/artistRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Canvas Collective");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
 
app.use("/artists", artistRoutes);
