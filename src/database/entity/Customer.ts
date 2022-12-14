import { Entity, PrimaryGeneratedColumn, OneToMany, Column, JoinColumn, OneToOne } from 'typeorm';
import { Contract } from './Contract';
import { CostCenter } from './CostCenter';

@Entity()
export class Customer {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CostCenter, costCenter => costCenter.customer, { cascade: true })
  @JoinColumn()
  costCenter: CostCenter[];

  @OneToOne(() => Contract, contract => contract.id, { cascade: true })
  @JoinColumn()
  contract: Contract;
};
