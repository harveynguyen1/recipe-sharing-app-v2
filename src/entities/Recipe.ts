import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number; // Explicitly define type as number

    @Column()
    title: string; // Define as string

    @Column()
    category: string; // Define as string

    @Column()
    thumbnailURL: string; // Define as string

    @Column()
    instructions: string; // Define as string
}