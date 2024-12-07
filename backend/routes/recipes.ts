import { Router, Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Recipe } from '../entities/Recipe';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = Router();
const recipeRepository = AppDataSource.getRepository(Recipe);

// GET all recipes (Read, Write, Admin)
router.get('/', authenticate, authorize(['read', 'write', 'admin']), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipes = await recipeRepository.find();
        res.json(recipes); // Respond, but do not return
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});

// POST a new recipe (Write, Admin)
router.post('/', authenticate, authorize(['write', 'admin']), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipe = recipeRepository.create(req.body);
        await recipeRepository.save(recipe);
        res.status(201).json(recipe); // Respond, but do not return
    } catch (error) {
        next(error);
    }
});

// PUT (Update) a recipe (Write, Admin)
router.put('/:id', authenticate, authorize(['write', 'admin']), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipe = await recipeRepository.findOneBy({ id: parseInt(req.params.id, 10) });
        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }
        recipeRepository.merge(recipe, req.body);
        await recipeRepository.save(recipe);
        res.json(recipe); // Respond, but do not return
    } catch (error) {
        next(error);
    }
});

// DELETE a recipe (Admin only)
router.delete('/:id', authenticate, authorize(['admin']), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipe = await recipeRepository.findOneBy({ id: parseInt(req.params.id, 10) });
        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }
        await recipeRepository.remove(recipe);
        res.json({ message: 'Recipe deleted successfully' }); // Respond, but do not return
    } catch (error) {
        next(error);
    }
});

export default router;