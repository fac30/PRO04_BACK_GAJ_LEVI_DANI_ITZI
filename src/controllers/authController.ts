import { Request, Response } from 'express';
import { hashPassword } from '../utils/hashUtils';
import { createUser, getUserByEmail } from '../models/userModel';
import passport from 'passport';

// Register a new user
export const register = async (req: Request, res: Response) => {
    const { username, email, password, address } = req.body;
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await hashPassword(password);
        await createUser({ username, email, hashed_password: hashedPassword, address });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

// Login a user
export const login = (req: Request, res: Response, next: any) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });

        req.logIn(user, (err) => {
            if (err) return next(err);
            res.json({ message: 'Logged in successfully' });
        });
    })(req, res, next);
};

// Logout a user
export const logout = (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
};
