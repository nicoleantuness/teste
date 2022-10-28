import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Schedules_users_properties } from "./schedules_users_properties.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({nullable: false})
    name: string 

    @Column({nullable: false, unique: true})
    email: string

    @Column({nullable: false})
    @Exclude()
    password: string

    @Column()
    isAdm: boolean

    @Column({default: true})
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(type => Schedules_users_properties, schedules => schedules.user)
    schedules: Schedules_users_properties[]
    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}