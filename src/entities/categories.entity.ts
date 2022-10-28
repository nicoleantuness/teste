import { Entity, Column,PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Properties } from "./proprerties.entity";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({unique: true})
    name: string
    
    @OneToMany(() => Properties, Properties => Properties.category)
    Properties: Properties[]
    
    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}