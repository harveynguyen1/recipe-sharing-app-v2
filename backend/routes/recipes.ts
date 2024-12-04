import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Recipe } from '../entities/Recipe';

const router = Router();
const recipeRepository = AppDataSource.getRepository(Recipe);

// GET all recipes
router.get('/', async (req, res) => {
    const recipes = await recipeRepository.find();
    res.json(recipes);
});

// POST a new recipe
router.post('/', async (req, res) => {
    const recipe = recipeRepository.create(req.body);
    await recipeRepository.save(recipe);
    res.status(201).json(recipe);
});

export default router;