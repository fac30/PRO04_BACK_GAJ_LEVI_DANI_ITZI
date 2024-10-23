// @ts-nocheck
import { Request, Response } from "express";
import { hashPassword } from "../utils/hashUtils";
import { createUser, getUserByEmail } from "../models/userModel";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../utils/typeBucket";

const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { username, email, password, address } = req.body;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await hashPassword(password);
    await createUser({
      username,
      email,
      hashed_password: hashedPassword,
      address,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: User = getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.hashed_password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout a user
export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.json({ message: "Logged out successfully" });
  });
};
