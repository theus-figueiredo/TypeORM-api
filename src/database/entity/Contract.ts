import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
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

  @ManyToOne(() => ContractType, contractType => contractType.type, { cascade: true })
  @JoinColumn()
  contractType: ContractType | null

  @OneToOne(() => Customer, customer => customer.contract)
  customer: Customer | null
};
