import { Entity, PrimaryGeneratedColumn, OneToMany, Column, JoinColumn, OneToOne } from 'typeorm';
import { Contract } from './Contract';
import { CostCenter } from './CostCenter';

@Entity()
export class Customer {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CostCenter, costCenter => costCenter.customer)
  @JoinColumn()
  costCenter: CostCenter[];

  @OneToOne(() => Contract, contract => contract.customer)
  @JoinColumn()
  contract: Contract;
};
