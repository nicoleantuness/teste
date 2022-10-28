import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Properties } from "./proprerties.entity";
import { User } from "./user.entity";

@Entity()
export class Schedules_users_properties {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({type: 'date'})
     date: string 

    @Column({type: 'time'})
     hour: string

    

    @ManyToOne(type => User, {
        eager: true
    })
    user: User

    @ManyToOne((type) => Properties)
    properties: Properties
    
    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}