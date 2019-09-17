import { Entity, PrimaryGeneratedColumn, Column, OneToMany, AfterLoad, BeforeUpdate, BeforeInsert, ManyToMany, JoinTable, Index } from "typeorm";
import { GenericEntity } from "./GenericEntity";
import { User } from "./User";
let encriptutils = require('../components/encryputils')
@Entity()
export class Profile extends GenericEntity {
    public static ID_ADMIN: number = 1
    public static ID_PROVEEDOR: number = 2
    public static ID_USER_APP: number = 3
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => User, user => user.profile)
    public users: User[]

}


