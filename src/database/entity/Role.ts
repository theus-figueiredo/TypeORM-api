import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;
};
