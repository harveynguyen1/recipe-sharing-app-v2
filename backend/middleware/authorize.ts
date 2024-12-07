import { Request, Response, NextFunction } from 'express';

// Middleware to authorize specific roles
export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
        }

        next(); // Call the next middleware or route handler
    };
};