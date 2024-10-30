// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

import artistRoutes from "./routes/artistRoutes";
import productRoutes from "./routes/productRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";
import privateRouter from "./routes/privateRouter";
import authRouter from "./routes/authRoutes";
import {
  getProductImage,
  getProductImageId,
} from "./controllers/productImageController";

const app: Express = express();
app.use(express.json());
app.use("/static", express.static("public"));

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*", // You can replace '*' with your specific S3 bucket URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use(cors({
//   origin: ['*'], // Replace with your S3 bucket URL
//   methods: 'GET,POST,PUT,DELETE,OPTIONS',
//   allowedHeaders: 'Content-Type,Authorization'
// }));

app.get("/", (req: Request, res: Response) => {
  res.send("Canvas Collective");
});

app.use("/", authRouter);
app.use("/", privateRouter);

app.use("/", artistRoutes);
app.use("/", productRoutes);
app.use("/", categoriesRoutes);
app.use("/", getProductImage);
// app.use("/", getProductImageId);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
