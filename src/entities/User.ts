import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id;

    @Column()
    username;

    @Column()
    password;

    @Column()
    role;

    @Column()
    token;
}