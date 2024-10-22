import { db } from "../scripts/create-database";
import { User } from "../utils/typeBucket";

const selectUserByEmail = db.prepare(
  `SELECT id, username, email, hashed_password, salt, address FROM users WHERE email = ?`
);

const getUserByEmail = (email: string): User[] => {
  const user = selectUserByEmail.get(email) as User;
  return user;
};
