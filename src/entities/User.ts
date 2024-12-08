import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Favorite } from './Favorite';
import { IsNotEmpty, IsIn } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    username: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    token: string;

    @Column()
    @IsIn(["read", "write", "admin"])
    accessLevel: string;

    @OneToMany(() => Favorite, favorite => favorite.user)
    favorites: Favorite[]; // User's favorite recipes
}