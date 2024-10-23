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

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://practice.com.s3-website.eu-west-2.amazonaws.com', // Replace with your S3 bucket URL
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.get('/', (req: Request, res: Response) => {
	res.send('Canvas Collective');
});

+app.use("/", authRouter);
+app.use("/", privateRouter);

app.use("/", artistRoutes);
app.use("/", productRoutes)
app.use('/', categoriesRoutes);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
