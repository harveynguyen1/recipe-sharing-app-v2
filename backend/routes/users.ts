import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

const router = Router();
const userRepository = AppDataSource.getRepository(User);

// GET all users
router.get('/', async (req, res) => {
    const users = await userRepository.find();
    res.json(users);
});

// POST a new user
router.post('/', async (req, res) => {
    const user = userRepository.create(req.body);
    await userRepository.save(user);
    res.status(201).json(user);
});

export default router;