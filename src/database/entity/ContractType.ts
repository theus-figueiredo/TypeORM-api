import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Contract } from "./Contract";

@Entity()
export class ContractType {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToMany(() => Contract, (contract) => contract.contractType, { nullable: true })
  contract: Contract[] | null;
};
