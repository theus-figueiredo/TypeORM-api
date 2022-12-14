import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ContractType } from './ContractType';
import { Customer } from './Customer';

@Entity()
export class Contract {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  startDate: Date;

  @Column({ type: 'decimal'})
  budget: number

  @Column({ type: 'date', nullable: true})
  endDate: Date;

  @Column()
  expectedEndDate: Date;
  
  @Column()
  description: string;

  @OneToOne(() => ContractType, contractType => contractType.type)
  @JoinColumn()
  contractType: ContractType

  @OneToOne(() => Customer, customer => customer.contract)
  customer: Customer
};
