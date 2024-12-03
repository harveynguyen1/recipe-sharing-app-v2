import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id;

    @Column()
    title;

    @Column()
    category;

    @Column()
    thumbnailURL;

    @Column()
    instructions;
}