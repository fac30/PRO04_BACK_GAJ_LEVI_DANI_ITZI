import { User } from "../utils/typeBucket";
import DatabaseConstructor, { Database } from "better-sqlite3";

export const db: Database = new DatabaseConstructor("db.sqlite3");

export const createUser = async (user: any) => {
  const stmt = db.prepare(
    "INSERT INTO users (username, email, hashed_password, address) VALUES (?, ?, ?, ?)"
  );
  stmt.run(user.username, user.email, user.hashed_password, user.address);
};

export const getUserByEmail = (email: string): User => {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  const userData = stmt.get(email);
  return userData as User;
};

export const getUserById = async (id: number) => {
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  return stmt.get(id);
};
