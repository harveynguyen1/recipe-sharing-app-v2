import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Favorite } from './Favorite';
import { IsNotEmpty, Length } from 'class-validator';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    title: string;

    @Column()
    @IsNotEmpty()
    description: string;

    @Column()
    @Length(5, 100)
    ingredients: string;

    @Column()
    @Length(5, 300)
    instructions: string;

    @Column()
    submittedBy: number;  // Reference to the user who submitted it

    @Column({ default: () => "datetime('now')" })
    createdAt: Date;

    @OneToMany(() => Favorite, favorite => favorite.recipe)
    favorites: Favorite[]; // List of users who favorited this recipe
}