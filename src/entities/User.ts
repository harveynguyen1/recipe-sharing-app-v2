import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number; // Explicitly define type as number

    @Column({ unique: true })
    username: string; // Define as string

    @Column()
    password: string; // Define as string

    @Column()
    accessLevel: string; // Define as string ("admin", "write", "read")

    @Column()
    token: string; // Define as string
}