import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Favorite } from './Favorite';
import { Recipe } from './Recipe';
import { IsNotEmpty, IsIn } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsNotEmpty()
    username!: string;

    @Column()
    @IsNotEmpty()
    password!: string;

    @Column()
    @IsNotEmpty()
    token!: string;

    @Column()
    @IsIn(["read", "write", "admin"])
    accessLevel!: string;

    // A user can have one favorite list
    @OneToOne(() => Favorite, (favorite) => favorite.user, { cascade: true, eager: true })
    @JoinColumn()
    favorite: Favorite;

    // A user can create many recipes
    @OneToMany(() => Recipe, (recipe) => recipe.submittedBy)
    recipes: Recipe[];
}