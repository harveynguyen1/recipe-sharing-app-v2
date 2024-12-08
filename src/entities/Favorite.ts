import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Recipe } from './Recipe';

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.favorites)
    user: User; // Reference to the User entity

    @ManyToOne(() => Recipe, recipe => recipe.favorites)
    recipe: Recipe; // Reference to the Recipe entity

    @Column({ default: () => "datetime('now')" })
    createdAt: Date;
}