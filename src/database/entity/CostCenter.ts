import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { ContractType } from "./ContractType";

@Entity()
export class CostCenter {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => ContractType, contractType => contractType.type)
  @JoinColumn()
  contract_type: ContractType;

  @Column()
  contract_status: string;

  @Column()
  contract_start: Date;

  @Column({ type: 'date', nullable: true})
  contract_end: Date;

  @Column({ type: 'decimal' })
  monthly_budget: number

  @ManyToOne(() => User, user => user.costCenter)
  user: User;
};
