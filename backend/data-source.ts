import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Recipe } from './entities/Recipe';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true, // Automatically sync database schema
    logging: true,
    entities: [User, Recipe], // Add your entities here
});