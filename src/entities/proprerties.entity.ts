import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne} from "typeorm";
import { v4 as uuid } from 'uuid';
import { Addresses } from "./addresses.entity";
import { Categories } from "./categories.entity";
import { Schedules_users_properties } from "./schedules_users_properties.entity";

@Entity()
export class Properties {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({default: false})
    sold: boolean 

    @Column('decimal', {precision: 12, scale: 2})
    value: number

    @Column()
    size: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Schedules_users_properties, schedules => schedules.properties)
    schedules: Schedules_users_properties[]

    @ManyToOne((type) => Categories)
    category: Categories

    @OneToOne((type) => Addresses, {
        eager: true
    })@JoinColumn()
    address: Addresses

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}