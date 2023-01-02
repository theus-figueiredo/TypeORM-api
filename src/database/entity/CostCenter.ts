import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, ManyToMany, OneToMany } from "typeorm";
import { User } from "./User";
import { Customer } from './Customer';
import { ServiceOrder } from "./ServiceOrder";

@Entity()
export class CostCenter {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  monthlyBudget: number

  @ManyToMany(() => User, user => user.costCenter, { nullable: true })
  user: User[]

  @ManyToOne(() => Customer, customer => customer.costCenter, { nullable: true })
  customer: Customer | null;

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.costCenter, { nullable: true })
  serviceOrder: ServiceOrder[];
};
