"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const artistRoutes_1 = __importDefault(require("./routes/artistRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Canvas Collective");
});
app.listen(port, '0.0.0.0', () => {
    console.log(`[server]: Server is running at http://18.171.123.115:${port}`);
});
app.use("/artists", artistRoutes_1.default);
