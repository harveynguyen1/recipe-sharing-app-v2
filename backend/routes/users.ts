import { Router, Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = Router();
const userRepository = AppDataSource.getRepository(User);

// POST: Add a new user (Admin only)
router.post('/', authenticate, authorize(['admin']), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, role } = req.body;

        const token = `Ihave${role.toUpperCase()}access`;
        const user = userRepository.create({ username, password, role, token });

        await userRepository.save(user);
        res.status(201).json(user); // Respond, but do not return
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});

export default router;