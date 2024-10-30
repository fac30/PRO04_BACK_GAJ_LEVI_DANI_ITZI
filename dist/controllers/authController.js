"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const hashUtils_1 = require("../utils/hashUtils");
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const existingEmail = yield (0, userModel_1.getUserByEmail)(email);
        if (existingEmail)
            return res.status(400).json({ message: "Email already exists" });
        const existingUsername = yield (0, userModel_1.getUserByUsername)(username);
        if (existingUsername)
            return res.status(400).json({ message: "Usernames already exists" });
        const hashedPassword = yield (0, hashUtils_1.hashPassword)(password);
        yield (0, userModel_1.createUser)({
            username,
            email,
            hashed_password: hashedPassword,
        });
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Error registering user" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = (0, userModel_1.getUserByEmail)(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.hashed_password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email }, JWT_SECRET, {
            expiresIn: "1h",
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE,
        });
        res.status(200).json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.login = login;
