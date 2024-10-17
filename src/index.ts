// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";


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



app.use(cors({
  origin: 'http://canvas-collective.s3-website.eu-west-2.amazonaws.com', // Replace with your S3 bucket URL
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
}));
 
app.use("/artists", artistRoutes);
