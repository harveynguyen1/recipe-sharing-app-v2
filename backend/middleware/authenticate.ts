import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

// Middleware to authenticate users
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ token });

    if (!user) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    req.user = user; // Attach the user to the request object
    next(); // Call the next middleware or route handler
};