import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ContractType {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
};
