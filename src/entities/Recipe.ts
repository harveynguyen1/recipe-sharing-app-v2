import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Favorite } from './Favorite';
import { User } from './User';
import { IsNotEmpty, Length } from 'class-validator';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsNotEmpty()
    title!: string;

    @Column()
    category!: string;

    @Column()
    @Length(5, 3000)
    instructions: string;

    @Column()
    thumbnailURL!: string;

    @Column({ default: () => "datetime('now')" })
    createdAt: Date;

    // A recipe is submitted by one user
    @ManyToOne(() => User, (user) => user.recipes, { onDelete: 'CASCADE' })
    submittedBy: User;

    // A recipe belongs to one favorite list
    @ManyToOne(() => Favorite, (favorite) => favorite.recipes, { onDelete: 'CASCADE' })
    favorite: Favorite;
}