import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number; // Ensure `id` has a type and use the non-null assertion operator

    @Column()
    title: string; // Add non-null assertion operator

    @Column()
    category: string;

    @Column()
    thumbnailURL: string;

    @Column()
    instructions: string;
}