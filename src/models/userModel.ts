import { User } from "../utils/typeBucket";
import DatabaseConstructor, { Database } from "better-sqlite3";

export const db: Database = new DatabaseConstructor("db.sqlite3");

export const createUser = (user: any) => {
  const stmt = db.prepare(
    "INSERT INTO users (username, email, hashed_password) VALUES (?, ?, ?)"
  );
  stmt.run(user.username, user.email, user.hashed_password);
};

export const getUserByUsername = (username: string): User => {
  const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
  const usernameData = stmt.get(username);
  return usernameData as User;
};

export const getUserByEmail = (email: string): User => {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  const userData = stmt.get(email);
  return userData as User;
};

export const getUserById = (id: number): User => {
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  const userIdData = stmt.get(id);
  return userIdData as User;
};
