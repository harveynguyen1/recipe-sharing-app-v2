import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from './data-source';
import recipesRouter from './routes/recipes';
import usersRouter from './routes/users';
const app = express();
const PORT = 5000; // Backend runs on a different port than the frontend

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'An internal server error occurred',
        error: err.message,
    });
});

// Routes
app.use('/api/recipes', recipesRouter);
app.use('/api/users', usersRouter);

// Initialize the database and start the server
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully!');
        app.listen(PORT, () => console.log(`Backend API running at http://localhost:${PORT}`));
    })
    .catch((error) => console.error('Error during Data Source initialization:', error));