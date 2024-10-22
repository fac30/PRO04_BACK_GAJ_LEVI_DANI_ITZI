import { db } from "../scripts/create-database";
import { User } from "../utils/typeBucket";

export const createUser = async (user: any) => {
  const stmt = db.prepare('INSERT INTO users (username, email, hashed_password, address) VALUES (?, ?, ?, ?)');
  stmt.run(user.username, user.email, user.hashed_password, user.address);
};

export const getUserByEmail = async (email: string) => {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email);
};

export const getUserById = async (id: number) => {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id);
};