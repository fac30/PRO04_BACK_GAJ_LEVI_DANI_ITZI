"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const artistRoutes_1 = __importDefault(require("./routes/artistRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const categoriesRoutes_1 = __importDefault(require("./routes/categoriesRoutes"));
const privateRouter_1 = __importDefault(require("./routes/privateRouter"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: "*", // You can replace '*' with your specific S3 bucket URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// app.use(cors({
//   origin: ['*'], // Replace with your S3 bucket URL
//   methods: 'GET,POST,PUT,DELETE,OPTIONS',
//   allowedHeaders: 'Content-Type,Authorization'
// }));
app.get("/", (req, res) => {
    res.send("Canvas Collective");
});
+app.use("/", authRoutes_1.default);
+app.use("/", privateRouter_1.default);
app.use("/", artistRoutes_1.default);
app.use("/", productRoutes_1.default);
app.use("/", categoriesRoutes_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
