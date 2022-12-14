import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Customer } from './Customer';

@Entity()
export class CostCenter {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  monthlyBudget: number

  @ManyToOne(() => User, user => user.costCenter)
  user: User;

  @ManyToOne(() => Customer, customer => customer.costCenter)
  customer: Customer;
};
