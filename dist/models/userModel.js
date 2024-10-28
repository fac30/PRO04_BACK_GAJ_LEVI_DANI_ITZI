"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserByEmail = exports.getUserByUsername = exports.createUser = exports.db = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
exports.db = new better_sqlite3_1.default("db.sqlite3");
const createUser = (user) => {
    const stmt = exports.db.prepare("INSERT INTO users (username, email, hashed_password) VALUES (?, ?, ?)");
    stmt.run(user.username, user.email, user.hashed_password);
};
exports.createUser = createUser;
const getUserByUsername = (username) => {
    const stmt = exports.db.prepare("SELECT * FROM users WHERE username = ?");
    const usernameData = stmt.get(username);
    return usernameData;
};
exports.getUserByUsername = getUserByUsername;
const getUserByEmail = (email) => {
    const stmt = exports.db.prepare("SELECT * FROM users WHERE email = ?");
    const userData = stmt.get(email);
    return userData;
};
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => {
    const stmt = exports.db.prepare("SELECT * FROM users WHERE id = ?");
    const userIdData = stmt.get(id);
    return userIdData;
};
exports.getUserById = getUserById;
